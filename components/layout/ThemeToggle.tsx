"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/** The icon and label are swapped with CSS, so no state is needed and nothing flashes. */
export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Storage can be blocked. The theme still changes for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-fg hover:bg-surface border-line inline-flex size-10 items-center justify-center rounded-lg border"
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
