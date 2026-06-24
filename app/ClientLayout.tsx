"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { LoadingProvider, useLoading } from "@/hooks/useLoading";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LoadingProvider>
        <ToastContainer theme="dark" position="top-left" />
        
        <LoadingWrapper />
        
        {children}
      </LoadingProvider>
    </SessionProvider>
  );
}

// This avoids hook rules violation
function LoadingWrapper() {
  const { isLoading } = useLoading();
  return isLoading ? <Loading size="lg" /> : null;
}