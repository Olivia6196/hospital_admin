import type { Metadata } from "next";
import BlogPage from "./Blog";

export const metadata: Metadata = {
  title: "Blog — LiviaCore Hospital",
  description: "Stay updated with the latest news, insights, and health tips from our medical experts.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blog — LiviaCore Hospital",
    description: "Stay updated with the latest news, insights, and health tips from our medical experts.",
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

export default function Blog() {
  return <BlogPage />;
}