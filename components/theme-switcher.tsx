"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const OPTIONS = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "forest", label: "Forest" }
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const activeTheme = mounted ? theme ?? "system" : "system";

  return (
    <div className="theme-switcher" role="group" aria-label="Theme">
      <span className="theme-switcher-label">Theme</span>
      <div className="theme-switcher-options">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`theme-switcher-option${activeTheme === option.value ? " active" : ""}`}
            aria-pressed={activeTheme === option.value}
            onClick={() => setTheme(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
