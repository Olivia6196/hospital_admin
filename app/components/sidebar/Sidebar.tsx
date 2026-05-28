"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosPeople } from "react-icons/io";
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
  { name: "Patients", href: "/dashboard/patients", icon: IoIosPeople },
  { name: "Doctors", href: "/dashboard/doctors", icon: MdPerson },
  { name: "Nurses", href: "/dashboard/nurses", icon: MdLocalHospital },
  { name: "Staffs", href: "/dashboard/staffs", icon: MdWork },
  { name: "Departments", href: "/dashboard/departments", icon: MdBusiness },
  { name: "Appointments", href: "/dashboard/appointments", icon: MdCalendarToday },
];

export default function Sidebar() {
  const pathname = usePathname();
   return (
    <div className="h-full p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shrink-0">
          <Image
            src="/images/hospital-logo.png"
            alt="Hospital Logo"
            width={44}
            height={44}
          />
        </div>
        <div>
          <h1
            className="text-[1.8rem] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            PrimeCare
          </h1>
          <p className="text-blue-200 text-xs -mt-1">ADMIN PORTAL</p>
        </div>
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
                  ? "bg-white text-blue-900 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white hover:border hover:border-blue-200"
              }`}
            >
              <Icon size={23} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/20 mt-auto space-y-2">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-5 py-2 rounded-2xl text-[17px] text-red-600 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
        >
          <MdLogout size={26} />
          Logout
        </button>
      </div>
    </div>
  );
}
