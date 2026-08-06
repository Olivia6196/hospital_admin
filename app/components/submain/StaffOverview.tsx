"use client";

import { useEffect, useState } from "react";

interface RoleCounts {
  onDuty: number;
  offDuty: number;
  onLeave: number;
  total: number;
}

interface StaffStatusResponse {
  doctor: RoleCounts;
  nurse: RoleCounts;
  staff: RoleCounts;
}

const roleLabels: Record<keyof StaffStatusResponse, string> = {
  doctor: "Doctors",
  nurse: "Nurses",
  staff: "Other Staff",
};

const roleColors: Record<keyof StaffStatusResponse, string> = {
  doctor: "#1e40af",
  nurse: "#db2777",
  staff: "#10b981",
};

export default function StaffOverview() {
  const [staffStatus, setStaffStatus] = useState<StaffStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStaffStatus() {
      try {
        const res = await fetch("/api/staff-status");
        if (!res.ok) throw new Error("Failed to load staff status");
        const data: StaffStatusResponse = await res.json();
        setStaffStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadStaffStatus();
  }, []);

  const segments = staffStatus
    ? (Object.entries(staffStatus) as [keyof StaffStatusResponse, RoleCounts][])
        .map(([role, counts]) => ({
          label: roleLabels[role],
          color: roleColors[role],
          onDuty: counts.onDuty,
          total: counts.total,
        }))
    : [];

  return (
    <div className="dark:bg-black border border-white dark:border-zinc-800 rounded-3xl shadow-xl backdrop-blur-2xl pt-6 pb-4 px-6">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-black dark:text-white">Staff Overview</h3>
        <span className="text-sm text-gray-400">On duty today</span>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-800 w-3/4 animate-pulse" />
          <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-800 w-1/2 animate-pulse" />
          <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-800 w-2/3 animate-pulse" />
        </div>
      ) : error ? (
        <p className="text-sm text-red-300">{error}</p>
      ) : segments.length === 0 ? (
        <p className="text-sm text-gray-300">No staff data available.</p>
      ) : (
        <div className="space-y-3">
          {segments.map((segment) => {
            const pct = segment.total > 0 ? Math.round((segment.onDuty / segment.total) * 100) : 0;
            return (
              <div key={segment.label} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-black/90 dark:text-white">{segment.label}</span>
                  <span className="text-sm">
                    <span style={{ color: segment.color }}>{segment.onDuty}</span>
                    <span className="text-gray-400">/{segment.total}</span>
                  </span>
                </div>
                <div className="bg-zinc-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: segment.color }}
                  />
                </div>
                <span className="text-sm text-gray-400">{pct}% on duty</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
