import { NextResponse } from "next/server";
import { connectDB, Patient } from "@/models";

export async function GET() {
  try {
    await connectDB();

    const patients = await Patient.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(patients);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Basic validation
    const requiredFields = ["name", "age", "condition", "ward", "doctor", "bloodGroup"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Optional: Generate Patient ID on backend (more reliable)
    if (!body.patientId) {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const random = Math.floor(1000 + Math.random() * 9000);
      body.patientId = `PAT-${year}${month}${day}-${random}`;
    }

    // Create patient (only allow specific fields if you want extra safety)
    const patient = await Patient.create({
      patientId: body.patientId,
      name: body.name,
      age: Number(body.age),
      gender: body.gender || "",
      condition: body.condition,
      ward: body.ward,
      doctor: body.doctor,
      admitDate: body.admitDate ? new Date(body.admitDate) : new Date(),
      status: body.status || "Admitted",
      address: body.address || "",
      bloodGroup: body.bloodGroup,
      contact: body.contact || "",
      emergencyContactName: body.emergencyContactName || "",
      emergencyContactPhone: body.emergencyContactPhone || "",
      allergies: body.allergies || "",
      notes: body.notes || "",
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error: any) {
    // Handle duplicate key error (unique patientId)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Patient ID already exists. Please try again." },
        { status: 409 }
      );
    }

    console.error("Create Patient Error:", error);

    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}