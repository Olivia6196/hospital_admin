import { patients } from "@/lib/data";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

const statusStyles: Record<string, { bg: string; color: string }> = {
  Admitted:   { bg: "rgba(78,157,224,0.15)", color: "#4e9de0" },
  Outpatient: { bg: "rgba(92,201,160,0.15)", color: "#5cc9a0" },
  Discharged: { bg: "rgba(138,155,176,0.15)", color: "#8a9bb0" },
  Critical:   { bg: "rgba(224,92,92,0.15)", color: "#e05c5c" },
};

export default function PatientsPage() {
    return (
        <div className="bg-black text-white p-5 rounded-xl backdrop-blur-2xl border border-white/20 shadow-2xl">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Recent Patients</h3>
        <div className="text-sm bg-blue-500 border border-white/20 rounded-xl px-3 py-1.5 backdrop-blur-2xl shadow-2xl">
        <Link href="/dashboard/patients" className="flex items-center gap-1">
          View All
          <span ><IoIosArrowRoundForward /></span>
        </Link>
        </div>
      </div>
      <div className="py-3 px-4 ">
        <table className="border-collapse ">
          <thead>
            <tr className="text-left uppercase text-xs tracking-widest border-b border-white/10">
                <th className="py-2 px-2.5 font-medium">ID</th>
                <th className="py-2 px-2.5 font-medium">Name</th>
                <th className="py-2 px-2.5 font-medium">Age</th>
                <th className="py-2 px-2.5 font-medium">Condition</th>
                <th className="py-2 px-2.5 font-medium">Ward</th>
                <th className="py-2 px-2.5 font-medium">Assigned Doctor</th>
                <th className="py-2 px-2.5 font-medium">Status</th>
              </tr>
          </thead>
          <tbody>
            {patients.slice(0, 6).map((p) => {
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
                    <td className="px-3 py-2">
                      <span 
                        className="inline-block px-4 py-1.5 text-xs font-medium rounded-lg border border-white/20"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {p.status}
                      </span>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
    )
}