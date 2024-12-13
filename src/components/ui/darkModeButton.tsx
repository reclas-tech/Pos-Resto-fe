"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const DarkModeComponents = () => {
  const { theme, toggleTheme } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  // komponen hanya di-render di sisi client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 z-50"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-500" size={24} />
      ) : (
        <Moon className="text-gray-800" size={24} />
      )}
    </button>
  );
};
