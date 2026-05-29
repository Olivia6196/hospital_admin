import { IconType } from "react-icons";

// types/index.ts
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  address?: string;
  bloodGroup?: string;
  status: 'Admitted' | 'Discharged' | 'Outpatient' | 'Critical'
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  department: string;
  availability: 'Available' | 'On Leave' | 'Busy';
  phone: string;
  experience: number;
}

export interface Nurse {
  id: number;
  name: string;
  department: string;
  shift: 'Morning' | 'Evening' | 'Night';
  phone: string;
  experience: number;
  status: 'On Duty' | 'On Leave' | 'Off Duty';
}

export interface Staff {
  id: number;
  name: string;
  role: string;
  department: string;
  phone: string;
  status: 'Active' | 'On Leave';
}

export interface Department {
  id: number;
  name: string;
  headDoctor: string;
  doctorCount: number;
  description?: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}


