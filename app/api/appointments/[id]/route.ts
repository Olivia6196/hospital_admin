import { connectDB, Patient } from "@/models";
import { Appointment } from "@/models/appointment";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const body = await req.json();
    const { status: newStatus } = body;

    if (!newStatus) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const resolvedParams = await params;
    const appointment = await Appointment.findById(resolvedParams.id);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const previousStatus = appointment.status;

    // Update status
    appointment.status = newStatus;
    await appointment.save();

    // === Send Email on Status Change ===
    if (previousStatus !== newStatus) {
      await sendStatusEmail(appointment, newStatus);
    }

    // === Create Patient when Pending → Confirmed ===
    if (previousStatus === "Pending" && newStatus === "Confirmed") {
      const existingPatient = await Patient.findOne({
        $or: [
          { contact: appointment.phone || appointment.email },
          { name: appointment.name, age: appointment.age },
        ],
      });

      if (!existingPatient) {
        const { patientStatus, ward } = getPatientStatusFromCondition(appointment.service);

        await Patient.create({
          name: appointment.name,
          age: appointment.age ?? 0,
          condition: appointment.service || "General Checkup",
          ward: ward,
          doctor: appointment.doctor ?? "Unassigned",
          admitDate: new Date(),
          status: patientStatus,
          contact: appointment.phone || appointment.email || "",
          gender: appointment.gender,
        });
      }
    }

    return NextResponse.json(appointment);

  } catch (error: any) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// ==================== EMAIL SENDING ====================
async function sendStatusEmail(appointment: any, newStatus: string) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    let subject = "";
    let html = "";

    if (newStatus === "Confirmed") {
      subject = `✅ Appointment Confirmed - ${appointment.name}`;
      html = `
        <h2>Your appointment has been confirmed!</h2>
        <p>Dear ${appointment.name},</p>
        <p>Your appointment for <strong>${appointment.service}</strong> has been confirmed.</p>
        <p><strong>Date:</strong> ${appointment.date}<br>
           <strong>Time:</strong> ${appointment.time}<br>
           <strong>Doctor:</strong> ${appointment.doctor || "First Available"}</p>
        <p>Please arrive 15 minutes early.</p>
        <p>Thank you for choosing our hospital.</p>
      `;
    } else if (newStatus === "Cancelled") {
      subject = `❌ Appointment Cancelled - ${appointment.name}`;
      html = `
        <h2>Your appointment has been cancelled</h2>
        <p>Dear ${appointment.name},</p>
        <p>Your appointment for <strong>${appointment.service}</strong> on ${appointment.date} at ${appointment.time} has been cancelled.</p>
        <p>If this was a mistake, please book a new appointment.</p>
      `;
    } else if (newStatus === "Completed") {
      subject = `✅ Appointment Completed - ${appointment.name}`;
      html = `<p>Your appointment on ${appointment.date} has been marked as completed.</p>`;
    }

    if (subject && appointment.email) {
      await resend.emails.send({
        from: "Hospital <onboarding@resend.dev>", // Change to your verified domain
        to: appointment.email,
        subject,
        html,
      });
    }
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
  }
}

function getPatientStatusFromCondition(service?: string) {
  if (!service) return { patientStatus: "Outpatient" as const, ward: "General Ward" };

  const s = service.toLowerCase();

  if (s.includes("emergency") || s.includes("critical") || s.includes("icu")) {
    return { patientStatus: "Critical" as const, ward: "ICU" };
  }
  if (s.includes("surgery") || s.includes("admission") || s.includes("inpatient")) {
    return { patientStatus: "Admitted" as const, ward: "Surgical Ward" };
  }
  if (s.includes("maternity") || s.includes("delivery")) {
    return { patientStatus: "Admitted" as const, ward: "Maternity Ward" };
  }

  return { patientStatus: "Outpatient" as const, ward: "General Ward" };
}