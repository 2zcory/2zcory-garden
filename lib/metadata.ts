import type { Metadata } from "next";

import {routing} from "@/i18n/routing";
import type {AppLocale} from "@/i18n/routing";

const SITE_NAME = "2zcory Garden";
const DEFAULT_DESCRIPTION = "A public home for thought, writing, and proof of work.";
const SITE_URL = "https://2zcory-garden.vercel.app";

const OG_LOCALE_BY_APP_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  ja: "ja_JP",
  vi: "vi_VN"
};

type PageMetadataInput = {
  title: string;
  description: string;
  locale?: AppLocale;
  pathname?: string;
};

function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

function getLocalizedPathname(locale: AppLocale, pathname: string) {
  const normalized = normalizePathname(pathname);
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

function getLanguageAlternates(pathname: string) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, getLocalizedPathname(locale, pathname)])
    ),
    "x-default": getLocalizedPathname(routing.defaultLocale, pathname)
  };
}

export function formatDate(date: string, locale: AppLocale = "en") {
  const formatterLocale =
    locale === "vi" ? "vi-VN" : locale === "ja" ? "ja-JP" : "en-US";

  return new Intl.DateTimeFormat(formatterLocale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function buildPageMetadata({ title, description, locale, pathname }: PageMetadataInput): Metadata {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const localizedPath = locale && pathname ? getLocalizedPathname(locale, pathname) : undefined;
  const alternateLanguages = pathname ? getLanguageAlternates(pathname) : undefined;
  const openGraphLocale = locale ? OG_LOCALE_BY_APP_LOCALE[locale] : undefined;
  const openGraphAlternateLocales = locale
    ? routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => OG_LOCALE_BY_APP_LOCALE[candidate])
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: localizedPath
      ? {
          canonical: localizedPath,
          languages: alternateLanguages
        }
      : undefined,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: localizedPath,
      locale: openGraphLocale,
      alternateLocale: openGraphAlternateLocales
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description
    }
  };
}

export function getSiteMetadata(): Metadata {
  return buildPageMetadata({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    locale: routing.defaultLocale,
    pathname: "/"
  });
}
