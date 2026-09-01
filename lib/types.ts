export type StaffRole = "doctor" | "nurse" | "staff";
export type ApplicationStatus = "pending" | "approved" | "cancelled";

export interface StaffApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: string;
  yearsOfExperience: number;
  school: string;
  bio: string;
  photoDataUrl?: string;
  status: ApplicationStatus;
  submittedAt: string;
}

// export const DEPARTMENTS = [
//   "Cardiology",
//   "Neurology",
//   "Pediatrics",
//   "Orthopedics",
//   "Emergency Care",
//   "Oncology",
//   "Surgery",
//   "Dental Care",
//   "Dermatology",
//   "Gynecology",
//   "Ophthalmology",
//   "Radiology",
//   "Psychiatry"
// ];
