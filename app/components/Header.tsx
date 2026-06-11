"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center gap-5 px-3 py-3 border-b sticky top-0 z-20 rounded-2xl bg-white/70 dark:bg-black md:dark:bg-black/30 md:backdrop-blur-sm">
      <div className="md:flex-1">
        <h1 className="text-2xl font-bold text-blue-950 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-blue-950/70 dark:text-white/70 pt-1">{subtitle}</p>}
      </div>
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 border bg-blue-100 dark:bg-white/10 backdrop-blur-xl border-white/20 shadow-xl focus-within:ring-1 transition-all duration-200">
          <CiSearch size={20} />
          <input
            type="text"
            placeholder="Search patients, doctors…"
            className="bg-transparent focus:outline-none text-sm text-blue-950/70 dark:text-white/70 placeholder:text-blue-950/50 dark:placeholder:text-white/50"
          />
        </div>
        <button
          className="relative flex items-center justify-center w-9 h-9 border rounded-xl bg-blue-100 dark:bg-white/10 backdrop-blur-xl border-white/20 shadow-xl "
          onClick={() => setNotifOpen(!notifOpen)}
        >
          <IoIosNotificationsOutline size={23} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <Link
          href="/dashboard/settings"
          className="flex items-center justify-center w-9 h-9 border rounded-xl bg-blue-100 dark:bg-white/10 backdrop-blur-xl border-white/20 shadow-xl"
        >
          <IoSettingsOutline size={18} />
        </Link>
        <div className="text-[0.8rem] text-blue-950/70 dark:text-white/70">
          <span>
            {currentDate.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </header>
  );
}
