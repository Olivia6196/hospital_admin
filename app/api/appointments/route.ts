import { connectDB } from "@/models";
import { Appointment } from "@/models/appointment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const appointments = await Appointment.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load appointments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const appointment = await Appointment.create(body);

    return NextResponse.json(appointment, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}