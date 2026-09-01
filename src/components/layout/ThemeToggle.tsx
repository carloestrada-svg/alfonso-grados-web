"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "alfonso-theme";

function hasStoredPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function savePreference(isDark: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    // El tema sigue funcionando durante la sesión aunque el navegador bloquee el almacenamiento.
  }
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncFromDocument = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (hasStoredPreference()) return;
      applyTheme(event.matches);
      setIsDark(event.matches);
    };

    syncFromDocument();
    setMounted(true);
    media.addEventListener("change", followSystemTheme);

    return () => media.removeEventListener("change", followSystemTheme);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    applyTheme(nextIsDark);
    savePreference(nextIsDark);
    setIsDark(nextIsDark);
  };

  const label = mounted
    ? isDark
      ? "Cambiar a modo claro"
      : "Cambiar a modo oscuro"
    : "Cambiar tema de color";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? isDark : undefined}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 text-brand-black transition-colors hover:border-black/35 hover:bg-black/10 focus-visible:ring-offset-brand-yellow"
    >
      {mounted && isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
