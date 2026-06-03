import { connectDB, Patient } from "@/models";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Patient ID is required" },
        { status: 400 }
      );
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { status: "Discharged" },
      { new: true }
    );

    if (!updatedPatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPatient);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}