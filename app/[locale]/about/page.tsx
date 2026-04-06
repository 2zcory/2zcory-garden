import type {Metadata} from "next";

import {ABOUT_COPY, AboutPage} from "@/components/about/about-page";
import {Link} from "@/i18n/routing";
import type {AppLocale} from "@/i18n/routing";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = ABOUT_COPY[locale];

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    locale,
    pathname: "/about"
  });
}

export default async function LocalizedAboutPage({params}: PageProps) {
  const {locale} = await params;

  return <AboutPage locale={locale} LinkComponent={Link} />;
}
