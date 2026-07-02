import type { Metadata } from "next";
import AddPatientForm from "./AddPatient";

export const metadata: Metadata = {
  title: "Dashboard — Add Patient",
  description: "Add new patients to the system with expert medical services, patient-centered care, and 24/7 support at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dashboard — Add Patient",
    description: "Add new patients to the system with expert medical services, patient-centered care, and 24/7 support.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LiviaCore Hospital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AddPatient() {
  return <AddPatientForm />;
}