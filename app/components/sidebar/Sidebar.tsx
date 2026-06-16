"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import {
  MdDashboard,
  MdPerson,
  MdLocalHospital,
  MdWork,
  MdBusiness,
  MdCalendarToday,
  MdLogout,
  MdSettings,
  MdNotifications,
} from "react-icons/md";
import type { IconType } from "react-icons";

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

// Shown on both desktop sidebar and mobile drawer
const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
  { name: "Patients", href: "/dashboard/patients", icon: IoIosPeople },
  { name: "Doctors", href: "/dashboard/doctors", icon: MdPerson },
  { name: "Nurses", href: "/dashboard/nurses", icon: MdLocalHospital },
  { name: "Staffs", href: "/dashboard/staffs", icon: MdWork },
  { name: "Departments", href: "/dashboard/departments", icon: MdBusiness },
  { name: "Appointments", href: "/dashboard/appointments", icon: MdCalendarToday },
];

// Only shown inside the mobile hamburger drawer, hidden on md+ desktop sidebar
const mobileOnlyItems: NavItem[] = [
  { name: "Notifications", href: "/dashboard/notifications", icon: MdNotifications },
  { name: "Settings", href: "/dashboard/settings", icon: MdSettings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldDark = stored === "dark" || (!stored && prefersDark);

    setDark(shouldDark);
    document.documentElement.classList.toggle("dark", shouldDark);
    document.documentElement.style.colorScheme = shouldDark ? "dark" : "light";
  }, []);

  // Auto-close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;

      document.documentElement.classList.toggle("dark", next);
      document.documentElement.style.colorScheme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");

      return next;
    });
  };

  const renderLink = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[1rem] transition-all duration-200 ${
          isActive
            ? "bg-white/85 text-blue-900 font-semibold shadow-md"
            : "hover:bg-white/10 text-white hover:border hover:border-blue-200"
        } ${isCollapsed ? "justify-center" : ""}`}
        title={isCollapsed ? item.name : ""}
      >
        <Icon size={23} />
        {!isCollapsed && <>{item.name}</>}
      </Link>
    );
  };

  return (
    <>
      {/* Single toggle button, fixed top-right — icon morphs between menu/close so it never jumps position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-60 p-2 rounded-xl bg-blue-600 dark:bg-blue-900 text-white shadow-lg"
      >
        <span className="relative w-5.5 h-5.5 block">
          <HiMenu
            size={22}
            className={`absolute inset-0 transition-all duration-200 ${
              isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <HiX
            size={22}
            className={`absolute inset-0 transition-all duration-200 ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            }`}
          />
        </span>
      </button>

      {/* Backdrop - always mounted, fades via opacity so it animates instead of popping in/out */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 bg-blue-600 dark:bg-blue-950 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`h-full ${isCollapsed ? "w-24 px-2" : "w-58 px-6"} py-4 flex flex-col
          fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:z-auto`}
      >
        <div className="flex items-center gap-3 mb-9">
          <div
            className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}
          >
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <Image
                src="/images/hospital-logo.png"
                alt="Hospital Logo"
                width={30}
                height={30}
              />
            </div>
            {!isCollapsed && (
              <div>
                <h1
                  className="text-[1.3rem] font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-dancing)" }}
                >
                  LiviaCore
                </h1>
                <p className="text-blue-200 text-[0.67rem] -mt-1">ADMIN PORTAL</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {/* Desktop collapse toggle stays as-is, hidden on mobile since the fixed button above handles toggling there */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:inline-flex p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
            >
              {isCollapsed ? (
                <IoChevronBackOutline size={18} />
              ) : (
                <IoChevronForward size={18} />
              )}
            </button>
          </div>
        </div>

        <nav className="space-y-2 mb-10 pb-16 rounded-lg border-b flex-1">
          {navItems.map(renderLink)}

          {/* Notifications & Settings: only rendered for the mobile drawer, never on desktop */}
          <div className="md:hidden space-y-2">
            {mobileOnlyItems.map(renderLink)}
          </div>
        </nav>

        <div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={`w-full flex items-center gap-3 px-5 py-2 rounded-2xl text-[17px] text-red-600 hover:text-red-400 hover:bg-white/10 transition-all duration-200 ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <MdLogout size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}