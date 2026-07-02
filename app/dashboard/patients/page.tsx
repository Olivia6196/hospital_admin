import type { Metadata } from "next";
import PatientsPage from "./Patients";

export const metadata: Metadata = {
  title: "Dashboard — Patients",
  description: "View and manage patient records at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dashboard — Patients",
    description: "View and manage patient records at LiviaCore Hospital.",
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

export default function Patients() {
  return <PatientsPage />;
}