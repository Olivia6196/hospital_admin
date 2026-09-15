import type { Metadata } from "next";
import DoctorsPage from "./Doctors";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Doctors & Specialists — LiviaCore Hospital Management System",
  description:
    "Browse doctors and specialists managed through the LiviaCore Hospital Management System. View profiles, specialties, and book appointments online.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/doctors` },
  openGraph: {
    title: "Doctors & Specialists — LiviaCore Hospital Management System",
    description: "Browse doctors and specialists managed through the LiviaCore Hospital Management System. View profiles and book appointments online.",
    url: `${siteUrl}/doctors`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "LiviaCore Hospital Doctors" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doctors & Specialists — LiviaCore Hospital Management System",
    description: "Browse doctors and specialists managed through the LiviaCore Hospital Management System.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Doctors() {
  return <DoctorsPage />;
}
