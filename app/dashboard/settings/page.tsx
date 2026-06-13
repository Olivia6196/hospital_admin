"use client";

import Header from "@/app/components/Header";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [dark, setDark] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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

  const handleEmailUpdate = async () => {
    try {
      setEmailLoading(true);

      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Email updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update email");
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7 p-6">
      <Header
        title="Settings"
        subtitle="Manage your account security and application preferences."
      />

      <div className="grid gap-6">
        {/* Appearance */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-white/10 backdrop-blur-md p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Appearance
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Customize how the dashboard looks on your device.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Theme Mode
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Switch between Light, Dark, or System theme.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleDark}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 dark:hover:text-blue-400"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              {dark ? "Switch to light mode" : "Switch to dark mode"}
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-white/10 backdrop-blur-md p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Account Information
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Update your account email address.
            </p>
          </div>

          <div className="grid gap-4">
            <input
              type="email"
              placeholder="New Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
            />

            <div className="flex justify-end">
              <button
                onClick={handleEmailUpdate}
                disabled={emailLoading}
                className="bg-blue-700 hover:bg-blue-600 transition-colors text-white px-5 py-2.5 rounded-lg disabled:opacity-60"
              >
                {emailLoading ? "Updating..." : "Update Email"}
              </button>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-white/10 backdrop-blur-md p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Security
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Change your password and secure your account.
            </p>
          </div>

          <div className="grid gap-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
            />

            <div className="flex justify-end">
              <button
                onClick={handlePasswordUpdate}
                disabled={passwordLoading}
                className="bg-red-600 hover:bg-red-500 transition-colors text-white px-5 py-2.5 rounded-lg disabled:opacity-60"
              >
                {passwordLoading
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}