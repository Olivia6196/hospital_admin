import { getServerSession } from "next-auth/next";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import authOptions from "@/lib/authOption";
import { connectDB } from "@/models";
import Notification from "@/models/Notification";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 });
    }

    await connectDB();
    const notification = await Notification.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete notification error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
