import { NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { Admin, connectDB } from "@/models";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (typeof token !== "string" || typeof password !== "string" || password.length < 7) {
      return NextResponse.json(
        { message: "A valid token and password of at least 7 characters are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const admin = await Admin.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!admin) {
      return NextResponse.json({ message: "This reset link is invalid or expired" }, { status: 400 });
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Unable to reset password" }, { status: 500 });
  }
}