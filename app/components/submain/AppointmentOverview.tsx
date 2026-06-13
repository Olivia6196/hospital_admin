"use client";

import { useEffect, useState } from "react";
import { IAppointment } from "@/models/appointment";

const statusColor: Record<string, string> = {
  Pending: "#f59e0b",
  Confirmed: "#3b82f6",
  Completed: "#5cc9a0",
  Cancelled: "#e05c5c",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AppointmentOverview() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const res = await fetch("/api/appointments");

        if (!res.ok) {
          throw new Error("Failed to load appointments");
        }

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  return (
    <div className="bg-black/85 text-white py-3 px-4 rounded-xl backdrop-blur-2xl border border-white/20 shadow-2xl">
      <div className="flex items-center gap-3 justify-between">
        <h3 className="text-[0.9rem]">Today's Appointments</h3>
        <span className="bg-blue-500 text-white py-0.5 px-3 rounded-xl">
          {appointments.length}
        </span>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-gray-300">Loading appointments...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-300">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="mt-4 text-sm text-gray-300">No appointments found.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {appointments.slice(0, 5).map((a) => (
            <li
              key={a._id}
              className="flex items-center gap-4 bg-blue-500/10 backdrop-blur-2xl shadow-2xl rounded-xl p-3"
            >
              <div className="text-[0.9rem] min-w-[4.2rem]">
                <div>{a.time}</div>
                <div className="text-[0.72rem] text-gray-300">{formatDate(a.date)}</div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[0.9rem] truncate">{a.name}</p>
                <p className="text-sm text-gray-300 truncate">
                  {a.doctor || "First Available"} · {a.service}
                </p>
              </div>

              <span
                className="ml-auto text-sm font-medium px-3 py-1 rounded-full border whitespace-nowrap"
                style={{ color: statusColor[a.status] || "#cbd5e1", borderColor: statusColor[a.status] || "#cbd5e1" }}
              >
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
