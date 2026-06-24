import { connectDB } from "@/models";
import { Appointment } from "@/models/appointment";
import Notification from "@/models/Notification";   // ← Add this
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

    // ================== SEND NOTIFICATION ==================
    try {
      // You can customize this logic based on your needs
      await Notification.create({
        userId: appointment.doctorId || appointment.doctor || body.doctorId, // Adjust field name as per your schema
        title: "New Appointment Booked",
        message: `New appointment scheduled for ${appointment.patientName || body.patientName} on ${appointment.date || body.date}`,
        type: "appointment", // or "new_appointment"
      });

      console.log("✅ Notification created for new appointment");
    } catch (notificationError) {
      console.error("Notification failed but appointment succeeded:", notificationError);
      // We don't want notification failure to block appointment creation
    }
    // ======================================================

    return NextResponse.json(appointment, {
      status: 201,
    });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}