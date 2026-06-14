import { NextResponse } from "next/server";
import { connectDB, StaffApplicationModel } from "@/models";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const application = await StaffApplicationModel.findByIdAndUpdate(id, body, { new: true });

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 });
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update application" }, { status: 500 });
  }
}
