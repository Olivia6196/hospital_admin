"use client";
import Header from "@/app/components/Header";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "alert" | "message" | "general";
  read: boolean;
  time: string;
  createdAt: string;
}
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: NotificationItem[] = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = notifications
    .filter((notif) => {
      const matchesSearch =
        notif.title.toLowerCase().includes(search.toLowerCase()) ||
        notif.message.toLowerCase().includes(search.toLowerCase());

      if (activeTab === "unread") return !notif.read && matchesSearch;
      if (activeTab === "read") return notif.read && matchesSearch;
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;

    try {
      const res = await fetch(`/api/notifications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } else {
        alert("Failed to delete notification");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete notification");
    }
  };

  const markAllAsRead = async () => {
    await fetch("/api/notifications/read-all", { method: "PATCH" });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col gap-7 py-5 px-3 md:px-6 bg-zinc-50 dark:bg-zinc-950">
      <Header title="Notifications" subtitle="Stay updated with important alerts" />

      <div className="max-w-5xl py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-950 dark:text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                {unreadCount} unread
              </span>
            )}
          </div>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-5 py-2.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-2xl transition disabled:opacity-50"
          >
            Mark all as read
          </button>
        </div>
  
        {/* Search & Tabs */}
        <div className="mb-6">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-3 pl-12 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <Search size={22}  className="w-5 h-5 absolute left-4 top-4 text-zinc-400"/>
          </div>

          <div className="flex border-b border-zinc-200 dark:border-zinc-700">
            {(["all", "unread", "read"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-sm font-medium capitalize transition border-b-2 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 text-zinc-500">Loading notifications...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-16 text-center">
              <div className="text-6xl mb-6 opacity-70">🔔</div>
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-zinc-500">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-700 rounded-3xl p-6 flex gap-5 hover:shadow-md transition-all ${
                  !notif.read ? "bg-blue-50/70 dark:bg-zinc-800 border-blue-100" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  {notif.type === "appointment" && "📅"}
                  {notif.type === "alert" && "⚠️"}
                  {notif.type === "message" && "💬"}
                  {notif.type === "general" && "🔔"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{notif.title}</h3>
                    <span className="text-xs text-zinc-400 whitespace-nowrap ml-4">{notif.time}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">{notif.message}</p>
                </div>

                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-xs text-red-500 hover:text-red-600 px-4 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}