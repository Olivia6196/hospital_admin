import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Notification from "@/models/Notification";
import { connectDB } from "@/models";
import authOptions from "@/lib/authOption";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Notification.updateMany(
      { userId: session.user.id, read: false },
      { $set: { read: true } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}