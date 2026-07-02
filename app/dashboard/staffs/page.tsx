import type { Metadata } from "next";
import StaffsPage from "./Staffs";

export const metadata: Metadata = {
  title: "Dashboard — Staffs",
  description: "Manage your staff information at LiviaCore Hospital.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dashboard — Staffs",
    description: "Manage your staff information at LiviaCore Hospital.",
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

export default function Staffs() {
  return <StaffsPage />;
}