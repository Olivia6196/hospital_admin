// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { dancingScript, inter } from "@/ui/fonts";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "LiviaCore Hospital — General Hospital Administration System",
  description: "LiviaCore Hospital is a leading healthcare institution providing comprehensive medical services and patient care.",
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