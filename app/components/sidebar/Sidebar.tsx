"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMoreVertical, FiUser } from "react-icons/fi";
import { Moon, Sun } from "lucide-react";
import { IoIosPeople } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import {
  MdDashboard,
  MdPerson,
  MdLocalHospital,
  MdWork,
  MdBusiness,
  MdCalendarToday,
  MdLogout,
} from "react-icons/md";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: IoIosPeople,
  },
  { name: "Doctors", href: "/dashboard/doctors", icon: MdPerson },
  {
    name: "Nurses",
    href: "/dashboard/nurses",
    icon: MdLocalHospital,
  },
  { name: "Staffs", href: "/dashboard/staffs", icon: MdWork },
  { name: "Departments", href: "/dashboard/departments", icon: MdBusiness },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: MdCalendarToday,
  },
];

const navIcons = [
  MdDashboard,
  IoIosPeople,
  MdPerson,
  MdLocalHospital,
  MdWork,
  MdBusiness,
  MdCalendarToday,
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

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;

      document.documentElement.classList.toggle("dark", next);
      document.documentElement.style.colorScheme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");

      return next;
    });
  };

  return (
    <div
      className={`h-full ${isCollapsed ? "w-25 px-3" : "w-60 px-6"} py-4 flex flex-col`}
    >
      <div className="flex items-center gap-3 mb-9">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}
        >
          <div className="w-10.5 h-10.5 bg-white rounded-full flex items-center justify-center shadow-lg shrink-0">
            <Image
              src="/images/hospital-logo.png"
              alt="Hospital Logo"
              width={40}
              height={40}
            />
          </div>
          {!isCollapsed && (
            <div>
              <h1
                className="text-[1.7rem] font-bold tracking-tight"
                style={{ fontFamily: "var(--font-dancing)" }}
              >
                LiviaCore
              </h1>
              <p className="text-blue-200 text-xs -mt-1">ADMIN PORTAL</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
          >
            {isCollapsed ? (
              <IoChevronBackOutline size={18} />
            ) : (
              <IoChevronForward size={18} />
            )}
          </button>
        </div>
      </div>

      <nav className="space-y-2 mb-10 pb-16 rounded-lg border-b">
        {navItems.map((item) => {
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
        })}
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
  );
}
