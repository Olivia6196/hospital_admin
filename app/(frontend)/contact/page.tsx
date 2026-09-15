import type { Metadata } from "next";
import ContactPage from "./Contact";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Contact LiviaCore Hospital Management System",
  description:
    "Contact LiviaCore Hospital for inquiries about the hospital management system, patient services, appointments, or administrative support.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact LiviaCore Hospital Management System",
    description: "Contact LiviaCore Hospital for inquiries about the hospital management system, patient services, or appointments.",
    url: `${siteUrl}/contact`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "Contact LiviaCore Hospital" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LiviaCore Hospital Management System",
    description: "Contact LiviaCore Hospital for inquiries about the hospital management system, patient services, or appointments.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Contact() {
  return <ContactPage />;
}
