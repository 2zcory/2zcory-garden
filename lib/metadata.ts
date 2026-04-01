import type { Metadata } from "next";

import type {AppLocale} from "@/i18n/routing";

const SITE_NAME = "2zcory Garden";
const DEFAULT_DESCRIPTION = "A public home for thought, writing, and proof of work.";

type PageMetadataInput = {
  title: string;
  description: string;
};

export function formatDate(date: string, locale: AppLocale = "en") {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function buildPageMetadata({ title, description }: PageMetadataInput): Metadata {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website"
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
    description: DEFAULT_DESCRIPTION
  });
}
