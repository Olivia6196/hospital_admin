import type { Metadata } from "next";
import SettingsPage from "./Setting";

export const metadata: Metadata = {
  title: "Dashboard — Settings",
  description: "Manage your account settings at LiviaCore Hospital.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Dashboard — Settings",
    description: "Manage your account settings at LiviaCore Hospital.",
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

export default function Settings() {
  return <SettingsPage />;
}