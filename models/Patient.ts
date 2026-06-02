import { model, models, Schema, Document } from "mongoose";

export type PatientStatus =
  | "Admitted"
  | "Outpatient"
  | "Discharged"
  | "Critical";

export interface IPatient extends Document {
  name: string;
  age: number;
  condition: string;
  ward: string;
  doctor: string;
  admitDate: Date;
  status: PatientStatus;
  address?: string;
  bloodGroup?: string;
  contact?: string;
}

const PatientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 130 },
    condition: { type: String, required: true },
    ward: { type: String, required: true },
    doctor: { type: String, required: true },
    admitDate: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      required: true,
      enum: ["Admitted", "Outpatient", "Discharged", "Critical"],
      default: "Admitted",
    },
    address: { type: String, trim: true },
    bloodGroup: { type: String, trim: true },
    contact: { type: String, trim: true },
  },
  { timestamps: true },
);

export const Patient =
  models.Patient || model<IPatient>("Patient", PatientSchema);
