import type { Metadata } from "next";
import ApplyPage from "./Apply";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Careers & Staff Applications — LiviaCore Hospital",
  description:
    "Apply to join the LiviaCore Hospital team. Submit staff applications through the hospital management system and contribute to healthcare administration.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/apply` },
  openGraph: {
    title: "Careers & Staff Applications — LiviaCore Hospital",
    description: "Apply to join the LiviaCore Hospital team through the hospital management system.",
    url: `${siteUrl}/apply`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "LiviaCore Hospital Careers" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Staff Applications — LiviaCore Hospital",
    description: "Apply to join the LiviaCore Hospital team through the hospital management system.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Apply() {
  return <ApplyPage />;
}
