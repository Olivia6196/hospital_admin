import { connectDB, StaffApplicationModel } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const aggregation = await StaffApplicationModel.aggregate([
      {
        $match: { status: "approved" },
      },
      {
        $group: {
          _id: { role: "$role", dutyStatus: "$dutyStatus" },
          count: { $sum: 1 },
        },
      },
    ]);

    const counts: Record<string, { onDuty: number; offDuty: number; onLeave: number; total: number }> = {
      doctor: { onDuty: 0, offDuty: 0, onLeave: 0, total: 0 },
      nurse: { onDuty: 0, offDuty: 0, onLeave: 0, total: 0 },
      staff: { onDuty: 0, offDuty: 0, onLeave: 0, total: 0 },
    };

    aggregation.forEach((item: any) => {
      const role = item._id.role as string;
      const status = item._id.dutyStatus as string;
      if (!counts[role]) return;
      if (status === "on_duty" || status === "On Duty") counts[role].onDuty = item.count;
      if (status === "off_duty" || status === "Off Duty" || !status) counts[role].offDuty = item.count;
      if (status === "on_leave" || status === "On Leave") counts[role].onLeave = item.count;
      counts[role].total += item.count;
    });

    return NextResponse.json(counts);
  } catch (error) {
    console.error("Staff status API error:", error);
    return NextResponse.json({ error: "Failed to load staff status" }, { status: 500 });
  }
}
