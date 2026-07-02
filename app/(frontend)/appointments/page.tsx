import type { Metadata } from "next";
import AppointmentsPage from "./Appointment";

export const metadata: Metadata = {
  title: "Appointments — Comprehensive Healthcare Services",
  description: "Manage your appointments with ease at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Appointments — Comprehensive Healthcare Services",
    description: "Manage your appointments with ease at LiviaCore Hospital.",
    images: [
      {
        url: "/images/og-image.jpg", // recommended: create a good OG image
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

export default function Appointments() {
  return <AppointmentsPage />;
}