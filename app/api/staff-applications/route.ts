import { NextResponse } from "next/server";
import { connectDB, StaffApplicationModel } from "@/models";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const application = await StaffApplicationModel.create({
      ...body,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to save application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const applications = await StaffApplicationModel.find().sort({ createdAt: -1 });
    return NextResponse.json(applications, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch applications" }, { status: 500 });
  }
}
