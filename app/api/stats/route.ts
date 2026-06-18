// app/api/stats/route.ts
import { connectDB, Patient, StaffApplicationModel } from "@/models";
import { NextResponse } from "next/server";
const TOTAL_BEDS = 150; // ⚠️ still no Bed/Ward model — swap for a real total once you have one

function percentChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysAgo(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

export async function GET() {
  await connectDB();

  const now = new Date();
  const monthStart = startOfMonth(now);
  const weekAgo = daysAgo(now, 7);

  // ---- Patients: total count + growth vs. last month ----
  const totalPatients = await Patient.countDocuments();
  const patientsBeforeThisMonth = await Patient.countDocuments({
    createdAt: { $lt: monthStart },
  });
  const patientsChangePct = percentChange(totalPatients, patientsBeforeThisMonth);

  // ---- Doctors: approved staff applications with role "doctor" ----
  const totalDoctors = await StaffApplicationModel.countDocuments({
    role: "doctor",
    status: "approved",
  });
  const newDoctorsThisMonth = await StaffApplicationModel.countDocuments({
    role: "doctor",
    status: "approved",
    createdAt: { $gte: monthStart }, // approximation — see note above on approvedAt
  });

  // ---- Beds: occupancy %, derived from patients currently marked "Admitted" ----
  const occupiedBeds = await Patient.countDocuments({ status: "Admitted" });
  const occupiedBedsAWeekAgo = await Patient.countDocuments({
    status: "Admitted",
    createdAt: { $lt: weekAgo },
  });
  const occupancyPct = TOTAL_BEDS > 0 ? (occupiedBeds / TOTAL_BEDS) * 100 : 0;
  const occupancyPctAWeekAgo = TOTAL_BEDS > 0 ? (occupiedBedsAWeekAgo / TOTAL_BEDS) * 100 : 0;
  const bedsChangePts = occupancyPct - occupancyPctAWeekAgo;

  // ---- Revenue: placeholder, no Invoice/Billing model yet ----
  const monthlyRevenue = 0;
  const lastMonthRevenue = 0;
  const revenueChangePct = percentChange(monthlyRevenue, lastMonthRevenue);

  return NextResponse.json({
    patients: {
      value: totalPatients.toLocaleString(),
      change: `${Math.abs(patientsChangePct).toFixed(1)}% from last month`,
      positive: patientsChangePct >= 0,
    },
    doctors: {
      value: totalDoctors.toString(),
      change: `${newDoctorsThisMonth} new this month`,
      positive: true,
    },
    beds: {
      value: `${occupancyPct.toFixed(0)}%`,
      change: `${Math.abs(bedsChangePts).toFixed(1)}% from last week`,
      positive: bedsChangePts >= 0,
    },
    revenue: {
      value: `$${monthlyRevenue.toLocaleString()}`,
      change: `${Math.abs(revenueChangePct).toFixed(1)}% from last month`,
      positive: revenueChangePct >= 0,
    },
  });
}