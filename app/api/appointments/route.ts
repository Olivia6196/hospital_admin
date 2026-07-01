import { connectDB, Admin } from "@/models";
import { Appointment } from "@/models/appointment";
import Notification from "@/models/Notification";
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
    try {
      const admins = await Admin.find({ role: "admin" }).select("_id").lean();

      if (admins.length > 0) {
        await Promise.all(
          admins.map((admin) =>
            Notification.create({
              userId: admin._id,
              title: "New Appointment Booked",
              message: `New appointment scheduled for ${appointment.name || body.name} on ${appointment.date || body.date}`,
              type: "appointment",
            })
          )
        );
        console.log("✅ Notification created for new appointment");
      } else {
        console.warn("No admin user found for appointment notification");
      }
    } catch (notificationError) {
      console.error("Notification failed but appointment succeeded:", notificationError);
    }

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