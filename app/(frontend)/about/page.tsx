import type { Metadata } from "next";
import AboutPage from "./About";

export const metadata: Metadata = {
  title: "About Us — LiviaCore Hospital",
  description: "Learn about LiviaCore Hospital's mission, values, and commitment to providing exceptional healthcare services.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "LiviaCore Hospital — About Us",
    description: "Learn about LiviaCore Hospital's mission, values, and commitment to providing exceptional healthcare services.",
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

export default function About() {
  return <AboutPage />;
}