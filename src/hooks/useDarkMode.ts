import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {

    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark";
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
    }
  }, []);

  useEffect(() => {

    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      root.classList.remove("light", "dark");

      root.classList.add(theme);

      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme, setTheme };
};
