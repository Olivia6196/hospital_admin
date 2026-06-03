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

    const patient = await Patient.create(body);

    return NextResponse.json(patient, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}