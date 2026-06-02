import { staffStats } from "@/lib/data";

const segments = [
  { label: "Doctors", ...staffStats.doctors, color: "#1e40af" },
  { label: "Nurses", ...staffStats.nurses, color: "#db2777" },
  { label: "Other Staff", ...staffStats.other, color: "#10b981" },
];

export default function StaffOverview() {
  return (
    <div className="bg-black border border-zinc-800 rounded-3xl shadow-xl backdrop-blur-2xl pt-6 pb-4 px-6">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-white">Staff Overview</h3>
        <span className="text-sm text-gray-400">On duty today</span>
      </div>
      <div className="space-y-3">
        {segments.map((segment) => {
          const pct = Math.round((segment.onDuty / segment.total) * 100);
          return (
            <div key={segment.label} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white">{segment.label}</span>
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
    </div>
  );
}
