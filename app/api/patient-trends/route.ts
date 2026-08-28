import { NextResponse } from "next/server";
import { connectDB, Patient } from "@/models";

export async function GET() {
  try {
    await connectDB();

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    const trends = await Patient.aggregate([
      {
        $match: {
          admitDate: { $gte: startDate },
          status: { $in: ["Admitted", "Discharged", "Outpatient"] },
        },
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$admitDate" } },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const result = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() - 5 + index, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthData = trends.filter((item) => item._id.month === monthKey);

      return {
        month: date.toLocaleString("en-US", { month: "short" }),
        admitted: monthData.find((item) => item._id.status === "Admitted")?.count || 0,
        discharged: monthData.find((item) => item._id.status === "Discharged")?.count || 0,
        outpatient: monthData.find((item) => item._id.status === "Outpatient")?.count || 0,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Patient trends API error:", error);
    return NextResponse.json({ message: "Failed to fetch patient trends" }, { status: 500 });
  }
}
