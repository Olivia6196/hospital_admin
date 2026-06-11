"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMoreVertical, FiUser } from "react-icons/fi";
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
                PrimeCare
              </h1>
              <p className="text-blue-200 text-xs -mt-1">ADMIN PORTAL</p>
            </div>
          )}
        </div>
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

      <nav className="space-y-2 flex-1">
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
              {!isCollapsed && (
                <>
              {item.name}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Section */}
<div className="pt-6 border-t border-white/20 mt-auto">
  <div className="relative p-3">
    {isCollapsed ? (
      // Collapsed State - Only show three dots button
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
        >
          <FiMoreVertical className="w-5 h-5 text-white/70 hover:text-white" />
        </button>
      </div>
    ) : (
      // Expanded State - Full user info
      <div className="flex items-center gap-4">
        <div className="flex gap-4 flex-1">
          <div className="w-9 h-9 flex items-center justify-center bg-linear-to-br from-blue-500 to-pink-500 text-white font-semibold rounded-xl text-[0.9rem] shrink-0">
            OO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Olivia Omeje
            </p>
            <p className="text-xs text-white/60">Super Admin</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors shrink-0"
        >
          <FiMoreVertical className="w-5 h-5 text-white/70 hover:text-white" />
        </button>
      </div>
    )}

    {/* Dropdown Menu - Works in both states */}
    {isOpen && (
      <div className="absolute right-0 bottom-20 w-56 bg-white backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl py-2 z-50">
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-sm font-medium text-blue-950">Olivia Omeje</p>
          <p className="text-xs text-black/60">admin@hospital.com</p>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-950/80 hover:bg-white/10 transition-colors">
          <FiUser className="w-4 h-4" />
          View Profile
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-5 py-2 rounded-2xl text-[17px] text-red-600 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
        >
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    )}
  </div>
      </div>
    </div>
  );
}
