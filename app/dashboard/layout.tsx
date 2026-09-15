import type { Metadata } from "next";
import Sidebar from '../components/sidebar/Sidebar';

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | LiviaCore Admin",
  },
  description: "Secure hospital administration dashboard for managing patients, appointments, staff, and operations.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen gap-1.5 text-blue-950 bg-white dark:bg-black dark:text-white">
      <div className="bg-blue-800 dark:bg-linear-to-b from-black/80 to-blue-950 text-white shadow-2xl z-50 overflow-hidden border-r border-white/40 rounded-lg">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
