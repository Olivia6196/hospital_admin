import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Notification from "@/models/Notification";
import { connectDB } from "@/models";
import authOptions from "@/lib/authOption";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: params.id, userId: session.user.id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}