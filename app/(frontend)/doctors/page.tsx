import type { Metadata } from "next";
import DoctorsPage from "./Doctors";

export const metadata: Metadata = {
  title: "Doctors — Comprehensive Healthcare Services",
  description: "Meet our team of expert doctors and find the right specialist for your healthcare needs at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Doctors — Comprehensive Healthcare Services",
    description: "Meet our team of expert doctors and find the right specialist for your healthcare needs at LiviaCore Hospital.",
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

export default function Doctors() {
  return <DoctorsPage />;
}