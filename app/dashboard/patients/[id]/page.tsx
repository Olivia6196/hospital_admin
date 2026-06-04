import Header from "@/app/components/Header";
import { connectDB, Patient } from "@/models";

// React Icons
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaNotesMedical,
  FaHospital,
  FaUserMd,
  FaHeartbeat,
  FaCalendarAlt,
} from "react-icons/fa";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const patient = await Patient.findById(id);

  if (!patient) {
    return <div className="p-6 text-white">Patient not found</div>;
  }

  // Generate initials for avatar
  const initials = patient.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-7 p-5">
      <Header
        title="Patients Details"
        subtitle="Comprehensive medical record and history"
      />
      <div className="min-h-screen bg-[#0f0f12] text-white py-6 px-4 lg:px-24 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-17 h-17 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold">{patient.name}</h1>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Patient ID: #{id.slice(-8).toUpperCase()} • Since{" "}
              {new Date(patient.admitDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a1f] rounded-2xl p-5 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-500 mb-1">AGE</p>
            <p className="text-3xl font-semibold">{patient.age}</p>
          </div>
          <div className="bg-[#1a1a1f] rounded-2xl p-5 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-500 mb-1">BLOOD GROUP</p>
            <p className="text-3xl font-semibold text-red-500">
              {patient.bloodGroup || "Nil"}
            </p>
          </div>
          <div className="bg-[#1a1a1f] rounded-2xl p-5 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-500 mb-1">GENDER</p>
            <p className="text-3xl font-semibold">{patient.gender || "Nil"}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 mb-4">
            <FaUser /> PERSONAL INFO
          </h2>
          <div className="bg-[#1a1a1f] rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400">
                <FaPhone />
                <span>Contact</span>
              </div>
              <span>{patient.contact || "Nil"}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt />
                <span>Address</span>
              </div>
              <span className="text-right">{patient.address || "Nil"}</span>
            </div>
          </div>
        </div>

        {/* Medical Record */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 mb-4">
            <FaNotesMedical /> MEDICAL RECORD
          </h2>
          <div className="bg-[#1a1a1f] rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400">
                <FaNotesMedical />
                <span>Condition</span>
              </div>
              <span className="font-medium">{patient.condition || "Nil"}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400">
                <FaHospital />
                <span>Ward</span>
              </div>
              <span className="bg-blue-600/80 px-4 py-1 rounded-full text-sm">
                {patient.ward || "Nil"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400">
                <FaUserMd />
                <span>Attending doctor</span>
              </div>
              <span className="font-medium">{patient.doctor || "Nil"}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400">
                <FaHeartbeat />
                <span>Status</span>
              </div>
              <span className="bg-green-600 px-4 py-1 rounded-full text-sm font-medium">
                {patient.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button className=" bg-[#1a1a1f] hover:bg-white hover:text-blue-950 transition-all rounded-lg p-4 flex items-center justify-center gap-3 text-sm font-medium">
            📊 Lab results
          </button>
          <button className=" bg-linear-to-b from-blue-400 to-blue-950 hover:bg-[#25252b] transition-all rounded-lg p-4 flex items-center justify-center gap-3 text-sm font-medium">
            📋 Discharge summary
          </button>
        </div>
      </div>
    </div>
  );
}
