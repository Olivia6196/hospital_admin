import type { Metadata } from "next";
import ServicesPage from "./Services";

export const metadata: Metadata = {
  title: "Home — Comprehensive Healthcare Services",
  description: "Discover expert medical services, patient-centered care, and 24/7 support at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "LiviaCore Hospital — Expert Medical Care",
    description: "Discover expert medical services, patient-centered care, and 24/7 support.",
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

export default function Services() {
  return <ServicesPage />;
}