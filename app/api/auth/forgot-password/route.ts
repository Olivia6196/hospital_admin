import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { Resend } from "resend";
import { Admin, connectDB } from "@/models";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectDB();
    const admin = await Admin.findOne({ email: normalizedEmail }).select(
      "+resetPasswordToken +resetPasswordExpires",
    );

    if (admin) {
      const token = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");

      admin.resetPasswordToken = tokenHash;
      admin.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
      await admin.save();

      const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;
      const resetUrl = `${baseUrl}/reset-password?token=${token}`;
      const resendApiKey = process.env.RESEND_API_KEY;
      const emailFrom = process.env.EMAIL_FROM;

      if (!resendApiKey || !emailFrom) {
        return NextResponse.json(
          { message: "Password reset email is not configured" },
          { status: 500 },
        );
      }

      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: emailFrom,
        to: admin.email,
        subject: "Reset your hospital admin password",
        html: `<p>We received a request to reset your password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in one hour.</p>`,
      });
    }

    return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Unable to process request" }, { status: 500 });
  }
}