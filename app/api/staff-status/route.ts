import { connectDB, Staff } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const aggregation = await Staff.aggregate([
      {
        $group: {
          _id: { role: "$role", status: "$status" },
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
      const status = item._id.status as string;
      if (!counts[role]) return;
      if (status === "On Duty") counts[role].onDuty = item.count;
      if (status === "Off Duty") counts[role].offDuty = item.count;
      if (status === "On Leave") counts[role].onLeave = item.count;
      counts[role].total += item.count;
    });

    return NextResponse.json(counts);
  } catch (error) {
    console.error("Staff status API error:", error);
    return NextResponse.json({ error: "Failed to load staff status" }, { status: 500 });
  }
}
