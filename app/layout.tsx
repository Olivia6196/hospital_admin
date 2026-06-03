// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { dancingScript, inter } from "@/ui/fonts";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "PrimeCare Admin - Hospital Dashboard",
  description: "General Hospital Administration System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} overflow-x-hidden`}>
         <ClientLayout>
            {children}
          </ClientLayout>
      </body>
    </html>
  );
}