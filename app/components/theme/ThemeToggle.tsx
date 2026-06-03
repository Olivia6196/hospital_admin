"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("light")}
        className="p-2 rounded-lg border"
      >
        <FaSun />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className="p-2 rounded-lg border"
      >
        <FaMoon />
      </button>

      <button
        onClick={() => setTheme("system")}
        className="p-2 rounded-lg border"
      >
        <FaDesktop />
      </button>
    </div>
  );
}