import { model, models, Schema } from "mongoose";

const StaffSchema = new Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['doctor', 'nurse', 'other'], 
    required: true 
  },
  onDuty: { type: Boolean, default: false },
  shiftStart: Date,
  shiftEnd: Date,
  // add any other fields...
}, { timestamps: true });

export const Staff = models.Staff || model('Staff', StaffSchema);