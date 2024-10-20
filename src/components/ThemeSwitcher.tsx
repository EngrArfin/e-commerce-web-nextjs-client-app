// components/ThemeSwitcher.tsx
"use client"; // Mark as a client component

import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Load saved theme from localStorage or use default
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme); // Set the saved theme on the HTML element
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Update the class on the root HTML element
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    // Save the new theme in localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded"
      onClick={toggleTheme}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
