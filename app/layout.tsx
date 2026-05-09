// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { dancingScript, inter } from "@/ui/fonts";

export const metadata: Metadata = {
  title: "MediAdmin - Hospital Dashboard",
  description: "General Hospital Administration System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}