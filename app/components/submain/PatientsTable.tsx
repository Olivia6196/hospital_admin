"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

const statusStyles: Record<string, { bg: string; color: string }> = {
  Admitted: { bg: "rgba(78,157,224,0.15)", color: "#4e9de0" },
  Outpatient: { bg: "rgba(92,201,160,0.15)", color: "#5cc9a0" },
  Discharged: { bg: "rgba(138,155,176,0.15)", color: "#8a9bb0" },
  Critical: { bg: "rgba(224,92,92,0.15)", color: "#e05c5c" },
};

type Patient = {
  _id: string;
  name: string;
  age: number;
  condition: string;
  ward: string;
  doctor: string;
  status: string;
};

export default function PatientsTable() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/patients");
        const data = await res.json();
         console.log("Patients API response:", data);
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="bg-white dark:bg-black text-blue-950 dark:text-white p-5 rounded-xl backdrop-blur-2xl border border-white/20 shadow-2xl">
      
      {/* Header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Recent Patients</h3>

        <div className="text-sm bg-blue-100 dark:bg-blue-500 border border-white/20 rounded-xl px-3 py-1.5">
          <Link href="/dashboard/patients" className="flex items-center gap-1">
            View All
            <IoIosArrowRoundForward />
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="py-3 px-4">
        <table className="border-collapse">
          <thead>
            <tr className="text-left uppercase text-xs tracking-widest border-b border-white/10">
              <th className="py-2 px-2.5">ID</th>
              <th className="py-2 px-2.5">Name</th>
              <th className="py-2 px-2.5">Age</th>
              <th className="py-2 px-2.5">Condition</th>
              <th className="py-2 px-2.5">Ward</th>
              <th className="py-2 px-2.5">Doctor</th>
              <th className="py-2 px-2.5">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-white/60">
                  Loading patients...
                </td>
              </tr>
            ) : (
              patients.slice(0, 6).map((p) => {
                const s = statusStyles[p.status];

                return (
                  <tr
                    key={p._id}
                    className="border-t border-white/10 hover:bg-white/5 transition text-sm cursor-pointer"
                  >
                    <td className="p-2 text-sm font-mono text-blue-950/90 dark:text-white/80">
                      {p._id.slice(-6)}
                    </td>

                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.age}</td>
                    <td className="px-3 py-2">{p.condition}</td>
                    <td className="px-3 py-2">{p.ward}</td>
                    <td className="px-3 py-2">{p.doctor}</td>

                    <td className="px-3 py-2">
                      <span
                        className="inline-block px-4 py-1.5 text-xs rounded-lg border border-white/20"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}