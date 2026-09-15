import type { Metadata } from "next";
import ServicesPage from "./Services";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Hospital Services & Features — LiviaCore Management System",
  description:
    "Explore the features of LiviaCore Hospital Management System including patient management, appointment booking, department coordination, and administrative tools for healthcare facilities.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Hospital Services & Features — LiviaCore Management System",
    description: "Explore the features of LiviaCore Hospital Management System including patient management, appointment booking, department coordination, and administrative tools.",
    url: `${siteUrl}/services`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "LiviaCore Hospital Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Services & Features — LiviaCore Management System",
    description: "Explore the features of LiviaCore Hospital Management System including patient management, appointment booking, and administrative tools.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Services() {
  return <ServicesPage />;
}
