import type { Metadata } from "next";
import AppointmentPage from "./Appointment";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Hospital Appointment Management System — Book Online",
  description:
    "Schedule medical appointments online with the LiviaCore Hospital Appointment Management System. Easy booking, patient scheduling, and healthcare coordination.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/appointments` },
  openGraph: {
    title: "Hospital Appointment Management System — Book Online",
    description: "Schedule medical appointments online with the LiviaCore Hospital Appointment Management System.",
    url: `${siteUrl}/appointments`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "LiviaCore Hospital Appointments" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Appointment Management System — Book Online",
    description: "Schedule medical appointments online with the LiviaCore Hospital Appointment Management System.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Appointments() {
  return <AppointmentPage />;
}
