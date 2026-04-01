"use client";

import {useLocale, useTranslations} from "next-intl";

import {usePathname, useRouter} from "@/i18n/routing";

const LOCALES = ["vi", "en", "ja"] as const;

export function LocaleSwitcher() {
  const t = useTranslations("Locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="locale-switcher" role="group" aria-label={t("label")}>
      <span className="locale-switcher-label">{t("label")}</span>
      <div className="locale-switcher-options">
        {LOCALES.map((entry) => (
          <button
            key={entry}
            type="button"
            className={`locale-switcher-option${locale === entry ? " active" : ""}`}
            aria-pressed={locale === entry}
            onClick={() => router.replace(pathname, {locale: entry})}
          >
            {t(entry)}
          </button>
        ))}
      </div>
    </div>
  );
}
