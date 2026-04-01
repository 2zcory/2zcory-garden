"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {useTranslations} from "next-intl";

const OPTIONS = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "forest", label: "Forest" }
] as const;

export function ThemeSwitcher() {
  const t = useTranslations("Theme");
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const activeTheme = mounted ? theme ?? "system" : "system";

  return (
    <div className="theme-switcher" role="group" aria-label={t("label")}>
      <span className="theme-switcher-label">{t("label")}</span>
      <div className="theme-switcher-options">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`theme-switcher-option${activeTheme === option.value ? " active" : ""}`}
            aria-pressed={activeTheme === option.value}
            onClick={() => setTheme(option.value)}
          >
            {t(option.value)}
          </button>
        ))}
      </div>
    </div>
  );
}
