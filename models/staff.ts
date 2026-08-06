import { model, models, Schema } from "mongoose";

const StaffSchema = new Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['doctor', 'nurse', 'staff'],
    required: true,
  },
  department: { type: String, trim: true },
  status: {
    type: String,
    enum: ['On Duty', 'Off Duty', 'On Leave'],
    default: 'Off Duty',
  },
  shiftStart: Date,
  shiftEnd: Date,
  photoDataUrl: String,
  email: String,
  phone: String,
  yearsOfExperience: Number,
}, { timestamps: true });

export const Staff = models.Staff || model('Staff', StaffSchema);