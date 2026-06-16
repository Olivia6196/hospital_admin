"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Link from "next/link";

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
  admitDate: string;
  status: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Admitted", "Outpatient", "Discharged", "Critical"];

  const handleDischarge = async (id: string) => {
    try {
      const res = await fetch("/api/patients/discharge", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to discharge patient");

      const updated = await res.json();

      // update UI instantly
      setPatients((prev) =>
        prev.map((patient) =>
          patient._id === updated._id
            ? { ...patient, status: "Discharged" }
            : patient
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/patients");

        if (!res.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await res.json();

        setPatients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filtered =
    filter === "All" ? patients : patients.filter((p) => p.status === filter);

  return (
    <div className="flex flex-col gap-7 p-5">
      <Header
        title="Patients"
        subtitle={`${patients.length} total patients registered`}
      />

      <div className="flex items-center flex-wrap z-10">
        {statuses.map((s) => (
          <button
            key={s}
            className={`dark:bg-blue-950/65 dark:text-white mb-4 py-2 text-sm mr-2 px-4 rounded-xl backdrop-blur-2xl border border-white/20 shadow-[0_0_4px]`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}

        <Link
          href="/dashboard/patients/Add"
          className="ml-auto bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-800 transition-colors px-5 py-2.5 rounded-xl text-sm font-medium"
        >
          + Add Patient
        </Link>
      </div>

      <div className="bg-white/90 dark:bg-blue-950/85 dark:text-white py-3 px-4 rounded-xl backdrop-blur-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="border-collapse w-full min-w-250">
            <thead>
              <tr className="text-left uppercase text-xs tracking-widest border-b border-white/10">
                <th className="py-2 px-2.5">ID</th>
                <th className="py-2 px-2.5">Name</th>
                <th className="py-2 px-2.5">Age</th>
                <th className="py-2 px-2.5">Condition</th>
                <th className="py-2 px-2.5">Ward</th>
                <th className="py-2 px-2.5">Assigned Doctor</th>
                <th className="py-2 px-2.5">Admit Date</th>
                <th className="py-2 px-2.5">Status</th>
                <th className="py-2 px-2.5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-white/70">
                    Loading patients...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-white/70">
                    No patients found
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const s = statusStyles[p.status];

                  return (
                    <tr
                      key={p._id}
                      className="border-t border-white/10 hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <td className="p-2 text-sm font-mono text-white/80">
                        {p._id.slice(-6)}
                      </td>

                      <td className="px-3 py-2 text-sm">{p.name}</td>

                      <td className="px-3 py-2 text-sm">{p.age}</td>

                      <td className="px-3 py-2 text-sm">{p.condition}</td>

                      <td className="px-3 py-2 text-sm">{p.ward}</td>

                      <td className="px-3 py-2 text-sm">{p.doctor}</td>

                      <td className="px-3 py-2 text-sm text-white/80">
                        {new Date(p.admitDate).toLocaleDateString()}
                      </td>

                      <td className="px-3 py-2">
                        <span
                          className="inline-block px-4 py-1.5 text-xs font-medium rounded-lg border border-white/20"
                          style={{
                            background: s?.bg,
                            color: s?.color,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2 justify-center">
                          <Link
                            href={`/dashboard/patients/${p._id}`}
                            className="border border-white/20 bg-white/5 px-4 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition"
                          >
                            View
                          </Link>

                          <button 
                            onClick={() => handleDischarge(p._id)}
                          className="border border-white/20 hover:bg-red-600 px-4 py-1.5 rounded-lg text-xs">
                            Discharge
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
