import { model, models, Schema } from "mongoose";;

export interface IAppointment {
   _id: string;
  service: string;
  doctor?: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  dob?: string;
  gender?: string;
  notes?: string;
  status: string;
}

const AppointmentSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      default: "First Available",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: String,
    gender: String,
    notes: String,
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = models.Appointment || model("Appointment", AppointmentSchema);