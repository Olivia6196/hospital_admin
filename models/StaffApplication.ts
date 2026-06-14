import { Document, Schema, model, models } from "mongoose";

export type StaffRole = "doctor" | "nurse" | "staff";
export type ApplicationStatus = "pending" | "approved" | "cancelled";

export interface IStaffApplication extends Document {
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

const StaffApplicationSchema = new Schema<IStaffApplication>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["doctor", "nurse", "staff"] },
    department: { type: String, required: true, trim: true },
    yearsOfExperience: { type: Number, required: true, min: 0 },
    school: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    photoDataUrl: { type: String },
    status: { type: String, required: true, enum: ["pending", "approved", "cancelled"], default: "pending" },
    submittedAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true },
);

export const StaffApplicationModel = models.StaffApplication || model<IStaffApplication>("StaffApplication", StaffApplicationSchema);
