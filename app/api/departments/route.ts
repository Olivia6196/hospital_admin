
import { NextResponse } from "next/server";
import { connectDB, Patient, StaffApplicationModel } from "@/models"; 
import { DEPARTMENTS } from "@/lib/types";

export async function GET() {
  try {
    await connectDB();

    const departmentsData = await StaffApplicationModel.aggregate([
      {
        $match: { 
          role: "doctor", 
          status: "approved" 
        }
      },
      {
        $group: {
          _id: "$department",
          doctorCount: { $sum: 1 }
        }
      }
    ]);

    const patientData = await Patient.aggregate([
      {
        $match: {
          status: { $in: ["Admitted", "Critical", "Outpatient"] }
        }
      },
      {
        $group: {
          _id: "$ward",
          patientCount: { $sum: 1 }
        }
      }
    ]);


    const result = DEPARTMENTS.map((deptName) => {
      const found = departmentsData.find(d => d._id === deptName);
      const patientStat = patientData.find(p => p._id === deptName);
      return {
        _id: deptName.toLowerCase().replace(/\s+/g, ''),
        name: deptName,
        doctorCount: found ? found.doctorCount : 0,
        patientCount: patientStat ? patientStat.patientCount : 0,
        description: `Specialized care in ${deptName.toLowerCase()}`,
        color: "bg-blue-100 dark:bg-blue-900/50"
      };
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch departments" }, { status: 500 });
  }
}