import { model, models, Schema } from "mongoose";
export type Role = "admin" | "patient";
export interface IAdmin {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const AdminSchema = new Schema<IAdmin>({
   name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 7 },
  role: { type: String, required: true, enum: ["admin", "patient"] },
});

export const Admin = models.Admin || model("Admin", AdminSchema);