'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function NotFound() {
  const pathname = usePathname();

  const isDashboardPath = pathname.startsWith('/dashboard');

  const homeLink = isDashboardPath ? '/dashboard' : '/';
  const homeLabel = isDashboardPath ? 'Back to Dashboard' : 'Go back Home';

  return (
    <section className="flex items-center justify-center min-h-screen bg-blue-200/60 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-9xl italic font-extrabold text-blue-900">
          404
        </h1>
        
        <p className="mt-4 text-2xl font-semibold text-secondary">
          Page Not Found
        </p>
        
        <p className="mt-2 text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href={homeLink}
            className="px-6 py-3 rounded-lg bg-green-600 font-semibold text-amber-50 hover:bg-green-700 transition duration-300 ease-in-out"
          >
            {homeLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}