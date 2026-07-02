import type { Metadata } from "next";
import DoctorsPage from "./Doctors";

export const metadata: Metadata = {
  title: "Dashboard — Doctors ",
  description: "Manage your doctors with expert medical services, patient-centered care, and 24/7 support at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dashboard — Doctors",
    description: "Manage your doctors with expert medical services, patient-centered care, and 24/7 support.",
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

export default function Doctors() {
  return <DoctorsPage />;
}