"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !isDark;

    if (next) {
      root.classList.add("dark");
      localStorage.setItem("stockfashion-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("stockfashion-theme", "light");
    }

    setIsDark(next);
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="flex items-center justify-center w-9 h-9 rounded-md border border-[#212124] bg-[#0f0f12] text-[#00cf85] hover:bg-[#111114] transition-colors"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
