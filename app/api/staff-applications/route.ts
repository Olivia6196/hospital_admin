import { NextRequest, NextResponse } from "next/server";
import { connectDB, Admin, StaffApplicationModel } from "@/models";
import Notification from "@/models/Notification";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const application = await StaffApplicationModel.create({
      ...body,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    try {
      const admins = await Admin.find({ role: "admin" }).select("_id").lean();

      if (admins.length > 0) {
        await Promise.all(
          admins.map((admin) =>
            Notification.create({
              userId: admin._id,
              title: "New Team Application Submitted",
              message: `New ${application.role} application from ${application.fullName}`,
              type: "alert",
            })
          )
        );
        console.log("✅ Notification created for new staff application");
      } else {
        console.warn("No admin user found for staff application notification");
      }
    } catch (notificationError) {
      console.error("Staff application notification failed:", notificationError);
    }

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to save application" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "9");
    const skip = parseInt(searchParams.get("skip") || "0");

    const query: any = {};

    if (role) query.role = role;
    if (status) query.status = status;

    const applications = await StaffApplicationModel.find(query)
      .sort({ submittedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(applications, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ message: error.message || "Failed to fetch applications" }, { status: 500 });
  }
}

// Optional: Keep PATCH for updating status
export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { id, status } = await request.json();

    const updated = await StaffApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update" }, { status: 500 });
  }
}