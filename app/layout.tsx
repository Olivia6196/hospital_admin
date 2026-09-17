// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { dancingScript, inter, syne } from "@/ui/fonts";
import ClientLayout from "./ClientLayout";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-dun.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LiviaCore Hospital — Hospital Management System & Healthcare Administration",
    template: "%s | LiviaCore Hospital",
  },
  description:
    "LiviaCore Hospital Management System for efficient healthcare administration. Patient management, appointment scheduling, staff coordination, and hospital admin dashboard in one platform.",
  keywords: [
    "hospital",
    "hospital system",
    "hospital management system",
    "hospital management software",
    "hospital admin dashboard",
    "patient management system",
    "hospital appointment management system",
    "medical administration software",
    "LiviaCore Hospital",
    "hospital management system in Nigeria",
  ],
  authors: [{ name: "LiviaCore Hospital" }],
  creator: "LiviaCore Hospital",
  publisher: "LiviaCore Hospital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "LiviaCore Hospital",
    title: "LiviaCore Hospital — Hospital Management System",
    description:
      "Efficient hospital management system for patient records, appointments, staff, and healthcare administration.",
    images: [
      {
        url: "/images/hospital-logo.png",
        width: 512,
        height: 512,
        alt: "LiviaCore Hospital logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LiviaCore Hospital — Hospital Management System",
    description:
      "Efficient hospital management system for patient records, appointments, staff, and healthcare administration.",
    images: ["/images/hospital-logo.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/hospital-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/images/hospital-logo.png" }],
    shortcut: ["/favicon.ico"],
  },
  category: "healthcare",
  verification: {
    google: "aO0GVh4DzEzhLk1svPHej7iixCwy0zH6Ya5ghxFWhis"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "LiviaCore Hospital",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hospital-logo.png`,
        },
        description:
          "LiviaCore Hospital provides a comprehensive hospital management system for healthcare administration, patient management, and appointment scheduling.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "LiviaCore Hospital",
        description:
          "Hospital management system for efficient healthcare administration, patient records, and appointment management.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "LiviaCore Hospital Management System",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "A complete hospital management system featuring patient management, appointment scheduling, staff coordination, department management, and an admin dashboard for healthcare facilities.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        provider: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${syne.variable} overflow-x-hidden`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
