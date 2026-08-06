"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "appointment" | "alert" | "message";
  createdAt?: string;
}

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch notifications from database
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notifications", {
        method: "GET",
        credentials: "include", 
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data: Notification[] = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifOpen && !(e.target as Element).closest(".notification-panel")) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications/read-all", {
        method: "PATCH",
      });

      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  return (
    <header className="flex items-center gap-5 px-3 py-3 border-b sticky top-0 z-20 rounded-2xl bg-white/70 dark:bg-black md:dark:bg-black/30 md:backdrop-blur-sm">
      <div className="md:flex-1">
        <h1 className="text-2xl font-bold text-blue-950 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-blue-950/70 dark:text-white/70 pt-1">{subtitle}</p>}
      </div>

      <div className="hidden md:flex items-center gap-4">

        {/* Notifications */}
        <div className="relative notification-panel">
          <button
            className="relative flex items-center justify-center w-9 h-9 border rounded-xl bg-white/95 dark:bg-white/10 backdrop-blur-xl border-white/20 shadow-lg hover:bg-white dark:hover:bg-white/20 transition-colors"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <IoIosNotificationsOutline size={23} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4.5 h-4.5 bg-red-500 text-[10px] text-white rounded-full font-medium px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
                <h3 className="font-semibold text-lg">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-105 overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-zinc-500">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500">No notifications yet</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors ${
                        !notif.read ? "bg-blue-50 dark:bg-zinc-800" : ""
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <span className="text-xs text-zinc-400 whitespace-nowrap ml-2">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t dark:border-zinc-700 text-center">
                <Link
                  href="/dashboard/notifications"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  onClick={() => setNotifOpen(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          className="flex items-center justify-center w-9 h-9 border rounded-xl bg-white/95 dark:bg-white/10 backdrop-blur-xl border-white/20 shadow-lg hover:bg-white dark:hover:bg-white/20 transition-colors"
        >
          <IoSettingsOutline size={18} />
        </Link>

        {/* Date */}
        <div className="text-[0.8rem] text-blue-950/70 dark:text-white/70 whitespace-nowrap">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </header>
  );
}