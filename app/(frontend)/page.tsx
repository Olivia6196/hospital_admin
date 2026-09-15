import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Hospital Management System for Efficient Healthcare Administration",
  description:
    "LiviaCore Hospital Management System helps hospitals manage patients, appointments, staff, and operations from a single admin dashboard. Designed for efficient healthcare administration.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "LiviaCore Hospital — Hospital Management System",
    description:
      "Complete hospital management software for patient management, appointment scheduling, and healthcare administration.",
    url: siteUrl,
    siteName: "LiviaCore Hospital",
    images: [
      {
        url: "/images/hospital-logo.png",
        width: 512,
        height: 512,
        alt: "LiviaCore Hospital Management System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LiviaCore Hospital — Hospital Management System",
    description:
      "Complete hospital management software for patient management, appointment scheduling, and healthcare administration.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
