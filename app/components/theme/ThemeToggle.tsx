"use client";

import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
  dark: boolean;
  toggleDark: () => void;
}

export default function ThemeToggle({
  dark,
  toggleDark,
}: ThemeToggleProps) {
  return (
    <button
      onClick={toggleDark}
      className="p-3 rounded-xl border"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}