import type { Metadata } from "next";
import AdminLoginPage from "./Login";

export const metadata: Metadata = {
  title: "Admin Login — LiviaCore Hospital",
  description: "Secure admin login for authorized hospital administrators.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Admin Login — LiviaCore Hospital",
    description: "Secure admin login for authorized hospital administrators.",
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

export default function Home() {
  return <AdminLoginPage />;
}