import type { Metadata } from "next";
import ApplyPage from "./Apply";

export const metadata: Metadata = {
  title: "Apply to LiviaCore Hospital — Join Our Expert Medical Team",
  description: "Join LiviaCore Hospital's medical team. Explore career opportunities, submit your application, and contribute to exceptional patient care.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Apply to LiviaCore Hospital — Join Our Expert Medical Team",
    description: "Join LiviaCore Hospital's medical team. Explore career opportunities, submit your application, and contribute to exceptional patient care.",
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

export default function Apply() {
  return <ApplyPage />;
}