import type { Metadata } from "next";
import ServicesPage from "./Services";

export const metadata: Metadata = {
  title: "What we offer — LiviaCore Hospital",
  description: "our hospital offers a wide range of medical services to ensure the health and well-being of our patients.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "What we offer — LiviaCore Hospital",
    description: "our hospital offers a wide range of medical services to ensure the health and well-being of our patients.",
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