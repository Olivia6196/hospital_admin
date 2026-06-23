import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Notification from "@/models/Notification";
import { connectDB } from "@/models";
import authOptions from "@/lib/authOption";

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hr ago`;
  return `${Math.floor(diffMins / 1440)} days ago`;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await Notification.find({
      userId: session.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    const formatted = notifications.map((notif) => ({
      id: notif._id.toString(),
      title: notif.title,
      message: notif.message,
      type: notif.type,
      read: notif.read,
      time: getRelativeTime(notif.createdAt),
      createdAt: notif.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fetch notifications error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Optional: Create new notification
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, message, type = "general" } = await req.json();

    const notification = await Notification.create({
      userId: session.user.id,
      title,
      message,
      type,
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}