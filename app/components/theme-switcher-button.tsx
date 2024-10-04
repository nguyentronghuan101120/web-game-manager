"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcherButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br transition-all duration-500`}
    >
      <button
        onClick={() => {
          setTheme(currentTheme === "dark" ? "light" : "dark");
        }}
        className={`relative w-20 h-[36px] rounded-full p-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          currentTheme === "dark"
            ? "bg-gray-700 focus:ring-gray-600"
            : "bg-blue-500 focus:ring-blue-500"
        }`}
        aria-label={`Switch to ${
          currentTheme === "dark" ? "light" : "dark"
        } mode`}
      >
        <span
          className={`absolute top-1 w-8 h-[28px] rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 ${
            currentTheme === "dark" ? "translate-x-10" : "translate-x-0"
          }`}
        >
          {currentTheme === "dark" ? (
            <FaMoon className="text-gray-700 transition-colors duration-300" />
          ) : (
            <FaSun className="text-yellow-500 transition-colors duration-300" />
          )}
        </span>
      </button>
    </div>
  );
}
