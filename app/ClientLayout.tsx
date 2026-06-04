"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <ToastContainer theme="dark" position="top-left" />
        {children}
      {/* </ThemeProvider> */}
    </SessionProvider>
  );
}