import Header from "@/app/components/Header";
import { connectDB, Patient } from "@/models";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const patient = await Patient.findById(id);

  if (!patient) {
    return (
      <div className="p-6 text-white">
        Patient not found
      </div>
    );
  }

  return (
    <div className="p-6 text-white flex flex-col gap-6">
<Header
        title="Patient Details"
        subtitle={`Details for ${patient.name}`}
      />

      <h1 className="text-xl font-bold">Medical Record</h1>

      <div className=" border-t border-white/20 rounded-xl p-5 grid gap-3">
        <p><b>Name:</b> {patient.name}</p>
        <p><b>Age:</b> {patient.age}</p>
        <p><b>Gender:</b> {patient.gender || "N/A"}</p>
        <p><b>Blood Group:</b> {patient.bloodGroup || "N/A"}</p>
        <p><b>Contact:</b> {patient.contact || "N/A"}</p>
        <p><b>Address:</b> {patient.address || "N/A"}</p>
      </div>

      <div className=" border-t border-white/20 rounded-xl p-5 grid gap-3">
        <p><b>Condition:</b> {patient.condition}</p>
        <p><b>Ward:</b> {patient.ward}</p>
        <p><b>Doctor:</b> {patient.doctor}</p>
        <p><b>Status:</b> {patient.status}</p>
        <p>
          <b>Admit Date:</b>{" "}
          {new Date(patient.admitDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}