import { NextRequest, NextResponse } from 'next/server';
import { StaffApplicationModel } from '@/models/StaffApplication'; 
import { connectDB } from '@/models';

export async function GET(request: NextRequest) {
  try {
    const service = request.nextUrl.searchParams.get('service');

    if (!service) {
      return NextResponse.json({ error: 'Service is required' }, { status: 400 });
    }

    await connectDB();
    const doctors = await StaffApplicationModel.find({
      role: "doctor",
      status: "approved",
      department: service,                    // Match department with selected service
    })
      .select('fullName department yearsOfExperience bio photoDataUrl') // Add more fields if needed
      .lean();

    // Transform data to match frontend expectation
    const formattedDoctors = doctors.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.fullName,
      specialty: doc.department,
      experience: doc.yearsOfExperience,
      bio: doc.bio,
      image: doc.photoDataUrl,
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