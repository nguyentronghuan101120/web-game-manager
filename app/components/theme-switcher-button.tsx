"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-center from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      The current theme is: {theme}
      {/* <button
        onClick={() => {
          console.log(`Switching to ${isDark ? "light" : "dark"} mode`);
          setTheme(isDark ? "light" : "dark");
        }}
        className={`relative w-20 h-10 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark
            ? "bg-gray-700 focus:ring-gray-600"
            : "bg-blue-500 focus:ring-blue-500"
        }`}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <span className="absolute left-1 top-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
          {isDark ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-700" />
          )}
        </span>
      </button> */}
    </div>
  );
}
