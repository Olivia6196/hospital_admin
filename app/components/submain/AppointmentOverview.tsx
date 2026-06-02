import { appointments } from "@/lib/data";

const statusColor: Record<string, string> = {
  Completed: "#5cc9a0",
  Scheduled: "#1e40af",
  Cancelled: "#e05c5c",
};

export default function AppointmentOverview() {
  return (
    <div className="bg-black/85 text-white py-3 px-4 rounded-xl backdrop-blur-2xl border border-white/20 shadow-2xl">
      <div className="flex items-center gap-3 justify-between">
        <h3 className="text-[0.9rem]">Today's Appointments</h3>
        <span className="bg-blue-500 text-white py-0.5 px-3 rounded-xl">
          {appointments.length}
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {appointments.map((a) => (
          <li key={a.id} className="flex items-center gap-4 bg-blue-500/10  backdrop-blur-2xl shadow-2xl rounded-xl p-3">
            <div className="text-[0.9rem]">{a.time}</div>
            <div className="">
              <p className="text-[0.9rem]">{a.patientName}</p>
              <p className="text-sm text-gray-300">
                {a.doctorName} · {a.type}
              </p>
            </div>
            <span
              className="ml-auto text-sm font-medium px-3 py-1 rounded-full border"
              style={{ color: statusColor[a.status], borderColor: statusColor[a.status] }}
            >
              {a.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
