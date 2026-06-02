"use client";

import { useState } from "react";
import { patients } from "@/lib/data";
import Header from "@/app/components/Header";

const statusStyles: Record<string, { bg: string; color: string }> = {
  Admitted:   { bg: "rgba(78,157,224,0.15)", color: "#4e9de0" },
  Outpatient: { bg: "rgba(92,201,160,0.15)", color: "#5cc9a0" },
  Discharged: { bg: "rgba(138,155,176,0.15)", color: "#8a9bb0" },
  Critical:   { bg: "rgba(224,92,92,0.15)", color: "#e05c5c" },
};

export default function PatientsPage() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Admitted", "Outpatient", "Discharged", "Critical"];
  const filtered = filter === "All" ? patients : patients.filter((p) => p.status === filter);

  return (
    <div className="flex flex-col gap-7 p-5">
      <Header title="Patients" subtitle={`${patients.length} total patients registered`} />

      {/* Filter Buttons */}
      <div className="flex items-center flex-wrap z-10">
        {statuses.map((s, i) => (
          <button
            key={i}
            className={`bg-blue-950/65 text-white py-2 text-sm mr-2 px-4 rounded-xl backdrop-blur-2xl border border-white/20 shadow-2xl ${filter === s ? "active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
        <button className="ml-auto bg-blue-700 hover:bg-blue-500 transition-colors px-5 py-2.5 rounded-xl text-sm font-medium">
          + Add Patient
        </button>
      </div>

      {/* Enhanced Table */}
      <div className="bg-blue-950/85 text-white py-3 px-4 rounded-xl backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="border-collapse w-full min-w-250">
            <thead>
              <tr className="text-left uppercase text-xs tracking-widest border-b border-white/10">
                <th className="py-2 px-2.5 font-medium">ID</th>
                <th className="py-2 px-2.5 font-medium">Name</th>
                <th className="py-2 px-2.5 font-medium">Age</th>
                <th className="py-2 px-2.5 font-medium">Condition</th>
                <th className="py-2 px-2.5 font-medium">Ward</th>
                <th className="py-2 px-2.5 font-medium">Assigned Doctor</th>
                <th className="py-2 px-2.5 font-medium">Admit Date</th>
                <th className="py-2 px-2.5 font-medium">Status</th>
                <th className="py-2 px-2.5 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const s = statusStyles[p.status];
                return (
                  <tr 
                    key={p.id} 
                    className="border-t border-white/10 hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="p-2 text-sm font-mono text-white/80">{p.id}</td>
                    <td className="px-3 py-2 text-white text-sm">
                      {p.name}
                    </td>
                    <td className="px-2 py-2 text-sm">{p.age}</td>
                    <td className="px-3 py-2 text-sm">{p.condition}</td>
                    <td className="px-3 py-2 text-sm font-medium">{p.ward}</td>
                    <td className="px-3 py-2 text-sm">{p.doctor}</td>
                    <td className="px-3 py-2 text-sm text-white/80">{p.admitDate}</td>
                    
                    <td className="px-3 py-2">
                      <span 
                        className="inline-block px-4 py-1.5 text-xs font-medium rounded-lg border border-white/20"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2 justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <button className="border border-white/20 hover:border-white/40 bg-white/5 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-all active:scale-95">
                          View
                        </button>
                        <button className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-red-600 px-4 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95">
                          Discharge
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}