import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {GARDEN_COPY, GardenPage} from "@/components/garden/garden-page";
import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/routing";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = GARDEN_COPY[locale];

  return buildPageMetadata({
    title: copy.title,
    description: copy.description
  });
}

export default async function LocalizedGardenPage({params}: PageProps) {
  const {locale} = await params;
  const tCommon = await getTranslations({locale, namespace: "Common"});

  return <GardenPage locale={locale} LinkComponent={Link} englishOnlyNote={tCommon("englishOnly")} />;
}
