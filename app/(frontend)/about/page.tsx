import type { Metadata } from "next";
import AboutPage from "./About";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "About LiviaCore Hospital Management System",
  description:
    "Learn about LiviaCore Hospital Management System — a platform designed for efficient patient management, appointment scheduling, and healthcare administration.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About LiviaCore Hospital Management System",
    description: "Learn about LiviaCore Hospital Management System — a platform designed for efficient patient management, appointment scheduling, and healthcare administration.",
    url: `${siteUrl}/about`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "LiviaCore Hospital" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About LiviaCore Hospital Management System",
    description: "Learn about LiviaCore Hospital Management System — a platform designed for efficient patient management, appointment scheduling, and healthcare administration.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function About() {
  return <AboutPage />;
}
