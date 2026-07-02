import type { Metadata } from "next";
import PricingPage from "./Prices";

export const metadata: Metadata = {
  title: "Pricing — Affordable Healthcare Services",
  description: "Explore our transparent pricing for medical services, ensuring quality care at competitive rates for all patients at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pricing — Affordable Healthcare Services",
    description: "Explore our transparent pricing for medical services, ensuring quality care at competitive rates for all patients at LiviaCore Hospital.",
    images: [
      {
        url: "/images/og-image.jpg", 
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

export default function Pricing() {
  return <PricingPage />;
}