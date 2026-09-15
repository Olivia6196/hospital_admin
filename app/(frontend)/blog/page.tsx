import type { Metadata } from "next";
import BlogPage from "./Blog";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export const metadata: Metadata = {
  title: "Health Blog & Insights — LiviaCore Hospital",
  description:
    "Read health tips, medical insights, and updates from LiviaCore Hospital. Stay informed with articles on patient care, wellness, and hospital management topics.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Health Blog & Insights — LiviaCore Hospital",
    description: "Read health tips, medical insights, and updates from LiviaCore Hospital.",
    url: `${siteUrl}/blog`,
    siteName: "LiviaCore Hospital",
    images: [{ url: "/images/hospital-logo.png", width: 512, height: 512, alt: "LiviaCore Hospital Blog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Blog & Insights — LiviaCore Hospital",
    description: "Read health tips, medical insights, and updates from LiviaCore Hospital.",
    images: ["/images/hospital-logo.png"],
  },
};

export default function Blog() {
  return <BlogPage />;
}
