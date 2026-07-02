import type { Metadata } from "next";
import ContactPage from "./Contact";

export const metadata: Metadata = {
  title: "Contact — LiviaCore Hospital",
  description: "Get in touch with LiviaCore Hospital for any inquiries or to schedule an appointment.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact — LiviaCore Hospital",
    description: "Get in touch with LiviaCore Hospital for any inquiries or to schedule an appointment.",
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

export default function Contact() {
  return <ContactPage />;
}