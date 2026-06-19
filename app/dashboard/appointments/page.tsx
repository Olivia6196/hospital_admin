"use client";

import Header from "@/app/components/Header";
import { IAppointment } from "@/models/appointment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PAGE_SIZE = 8;

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-800 border border-amber-200",
  Confirmed: "bg-blue-50 text-blue-800 border border-blue-200",
  Completed: "bg-green-50 text-green-800 border border-green-200",
  Cancelled: "bg-red-50 text-red-800 border border-red-200",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
];

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function exportToCSV(data: IAppointment[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Service",
    "Doctor",
    "Date",
    "Time",
    "Status",
    "Notes",
  ];
  const rows = data.map((r) =>
    [
      r.name,
      r.email,
      r.phone,
      r.service,
      r.doctor ?? "First Available",
      r.date,
      r.time,
      r.status,
      r.notes ?? "",
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "appointments.csv";
  a.click();
  URL.revokeObjectURL(url);
}

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
}

function Pagination({ page, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pages: (number | "…")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);
    pages.push(1);
    if (left > 2) pages.push("…");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("…");
    pages.push(totalPages);
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <p className="text-xs text-gray-400">
        {total === 0 ? "No results" : `Showing ${start}–${end} of ${total}`}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          ‹
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="flex items-center justify-center w-8 h-8 text-xs text-gray-400 select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                page === p
                  ? "bg-gray-900 text-white border border-gray-900"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          ›
        </button>
      </div>
    </div>
  );
}

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/appointments");
        if (!res.ok) throw new Error("Failed to load appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, serviceFilter]);

  const filtered = appointments.filter((r) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(q);
    const matchStatus = !statusFilter || r.status === statusFilter;
    const matchService = !serviceFilter || r.service === serviceFilter;
    return matchQ && matchStatus && matchService;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = {
    total: appointments.length,
    pending: appointments.filter((r) => r.status === "Pending").length,
    confirmed: appointments.filter((r) => r.status === "Confirmed").length,
    completed: appointments.filter((r) => r.status === "Completed").length,
  };

  const uniqueServices = [...new Set(appointments.map((r) => r.service))].sort();

 const handleStatusChange = useCallback(async (id: string, newStatus: IAppointment["status"]) => {
  const previousAppointments = [...appointments]; // snapshot for revert

  // Optimistic update
  setAppointments(prev =>
    prev.map(a => a._id === id ? { ...a, status: newStatus } : a)
  );

  try {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${res.status}`);
    }

    toast.success("Status updated successfully");
  } catch (err: any) {
    console.error(err);
    
    // Revert optimistic update
    setAppointments(previousAppointments);
    
    toast.error(err.message || "Failed to update status. Please try again.");
  }
}, [appointments]);

  return (
    <div className="flex flex-col gap-7 py-5 px-3 md:px-6">
      <Header title="Appointments" subtitle="Manage your appointments here." />

      <div className="flex gap-2">
        <button
          onClick={() => exportToCSV(filtered)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white/15 shadow-2xl backdrop-blur-2xl text-sm dark:text-white hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export CSV
        </button>
        <Link
          href="/appointments/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/80 border border-white text-white text-sm font-medium hover:bg-gray-700 shadow-2xl backdrop-blur-2xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New appointment
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-gray-900" },
          { label: "Pending", value: stats.pending, color: "text-amber-700" },
          { label: "Confirmed", value: stats.confirmed, color: "text-blue-700" },
          { label: "Completed", value: stats.completed, color: "text-green-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white/90 rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-3xl font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-50">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/90 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white/90 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="">All services</option>
          {uniqueServices.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {(search || statusFilter || serviceFilter) && (
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setServiceFilter("");
            }}
            className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="dark:bg-blue-950/85 rounded-2xl border border-gray-100 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-gray-400">
            <svg className="animate-spin w-5 h-5 mr-2 text-gray-300" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading appointments…
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-sm text-red-500 gap-2">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="text-gray-500 underline text-xs">
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-black dark:text-white/95 uppercase tracking-wide">Patient</th>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-black dark:text-white/95 uppercase tracking-wide hidden md:table-cell">Service</th>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-black dark:text-white/95 uppercase tracking-wide">Date & time</th>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-black dark:text-white/95 uppercase tracking-wide">Doctor</th>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-black dark:text-white/95 uppercase tracking-wide">Status</th>
                    <th className="text-right px-5 py-3.5 text-xs font-medium text-black dark:text-white/95 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-sm text-gray-400">
                        No appointments match your filters.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((apt, i) => {
                      const av = AVATAR_COLORS[(i + (page - 1) * PAGE_SIZE) % AVATAR_COLORS.length];
                      return (
                        <tr key={apt._id} className="hover:bg-blue-600 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${av.bg} ${av.text}`}>
                                {initials(apt.name)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white leading-tight">{apt.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{apt.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-gray-500 dark:text-white/80 hidden md:table-cell">{apt.service}</td>

                          <td className="px-5 py-4">
                            <p className="text-gray-900 dark:text-white">{formatDate(apt.date)}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{apt.time}</p>
                          </td>

                          <td className="px-5 py-4 text-gray-500 text-xs hidden lg:table-cell">
                            {apt.doctor ?? "First Available"}
                          </td>

                          <td className="px-5 py-4">
                            <select
                              value={apt.status}
                              onChange={(e) =>
                                handleStatusChange(apt._id, e.target.value as IAppointment["status"])
                              }
                              className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 ${STATUS_STYLES[apt.status]}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={`/appointments/${apt._id}`} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" title="View details">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </Link>
                              <Link href={`/appointments/${apt._id}/edit`} className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" title="Edit">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;