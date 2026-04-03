import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {WRITING_COPY, WritingPage} from "@/components/writing/writing-page";
import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/routing";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = WRITING_COPY[locale];

  return buildPageMetadata({
    title: copy.title,
    description: copy.description
  });
}

export default async function LocalizedWritingPage({params}: PageProps) {
  const {locale} = await params;
  const tCommon = await getTranslations({locale, namespace: "Common"});

  return <WritingPage locale={locale} LinkComponent={Link} englishOnlyNote={tCommon("englishOnly")} />;
}
