import { NextRequest, NextResponse } from 'next/server';
import { StaffApplicationModel } from '@/models/StaffApplication'; 
import { connectDB } from '@/models';

export async function GET(request: NextRequest) {
  try {
    const service = request.nextUrl.searchParams.get('service');
    const limitParam = request.nextUrl.searchParams.get('limit');
    const roleParam = request.nextUrl.searchParams.get('role') || 'doctor';

    await connectDB();

    const query: any = { role: roleParam, status: "approved" };
    if (service) query.department = service;

    const doctorsQuery = StaffApplicationModel.find(query)
      .select('fullName department yearsOfExperience bio photoDataUrl status role submittedAt')
      .sort({ yearsOfExperience: -1 });

    const parsedLimit = Number(limitParam);
    if (Number.isInteger(parsedLimit) && parsedLimit > 0) {
      doctorsQuery.limit(parsedLimit);
    }

    const doctors = await doctorsQuery.lean();

    const filteredDoctors =
      Number.isInteger(parsedLimit) && parsedLimit > 0
        ? (() => {
            const uniqueByDepartment: any[] = [];
            const seenDepartments = new Set<string>();

            for (const doc of doctors) {
              const department = doc.department?.trim();
              if (!department) continue;
              if (seenDepartments.has(department)) continue;

              seenDepartments.add(department);
              uniqueByDepartment.push(doc);

              if (uniqueByDepartment.length === parsedLimit) {
                break;
              }
            }

            return uniqueByDepartment;
          })()
        : doctors;

    const formattedDoctors = filteredDoctors.map((doc: any) => ({
      _id: doc._id?.toString() || doc.id || null,
      fullName: doc.fullName,
      department: doc.department,
      yearsOfExperience: doc.yearsOfExperience,
      bio: doc.bio,
      photoDataUrl: doc.photoDataUrl,
      status: doc.status,
      role: doc.role,
      submittedAt: doc.submittedAt,
    }));

    return NextResponse.json(formattedDoctors);

  } catch (error) {
    console.error('Doctors API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' }, 
      { status: 500 }
    );
  }
}