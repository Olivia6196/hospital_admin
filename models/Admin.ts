import { model, models, Schema } from "mongoose";
export type Role = "admin" | "customer";
export interface IAdmin {
  email: string;
  password: string;
  role: Role;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 7 },
  role: { type: String, required: true, enum: ["admin", "patient"] },
});

export const Admin = models.Admin || model("Admin", AdminSchema);