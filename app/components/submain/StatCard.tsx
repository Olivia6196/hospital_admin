"use client";

import { useEffect, useState } from "react";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaBed, FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import type { IconType } from "react-icons";

type StatKey = "patients" | "doctors" | "beds" | "revenue";

type StatData = {
  value: string;
  change: string;
  positive: boolean;
};

const statMeta: Record<StatKey, { label: string; icon: IconType }> = {
  patients: { label: "Total Patients", icon: IoIosPeople },
  doctors: { label: "Active Doctors", icon: FaUser },
  beds: { label: "Beds Occupied", icon: FaBed },
  revenue: { label: "Monthly Revenue", icon: LuBadgeDollarSign },
};

export default function StatCard() {
  const [stats, setStats] = useState<Record<StatKey, StatData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {(Object.keys(statMeta) as StatKey[]).map((key) => {
        const meta = statMeta[key];
        const data = stats?.[key];

        return (
          <div
            key={key}
            className="flex gap-4 bg-white/95 dark:bg-black/30 border backdrop-blur-2xl border-white/20 shadow hover:shadow-2xl z-10 rounded-2xl px-5 py-3 hover:translate-y-1"
          >
            <div className="h-9 w-9 flex items-center justify-center text-blue-800 bg-white/70 border backdrop-blur-2xl dark:border-white/10 shadow-2xl rounded-lg">
              <meta.icon size={20} />
            </div>
            <div>
              <p className="uppercase text-blue-950 dark:text-white/80 text-[0.8rem]">
                {meta.label}
              </p>
              {loading || !data ? (
                <p className="text-blue-950 dark:text-white text-[1.3rem] font-semibold">
                  0
                </p>
              ) : (
                <>
                  <p className="text-blue-950 dark:text-white text-[1.3rem] font-semibold">
                    {data.value}
                  </p>
                  <p
                    className={`flex items-center gap-0.5 ${data.positive ? "text-emerald-500" : "text-red-600"} text-[0.8rem]`}
                  >
                    <span className="text-[1.2rem]">{data.positive ? "↑" : "↓"}</span>
                    {data.change}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}