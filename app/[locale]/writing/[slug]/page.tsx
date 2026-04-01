import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import type {AppLocale} from "@/i18n/routing";
import {getArticle, getArticles} from "@/lib/content";
import {buildPageMetadata, formatDate} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale; slug: string}>;
};

const COPY = {
  en: {
    fallbackTitle: "Writing",
    fallbackDescription: "Deliberate writing from 2zcory Garden.",
    eyebrow: "Writing"
  },
  vi: {
    fallbackTitle: "Bài viết",
    fallbackDescription: "Bài viết có chủ đích từ 2zcory Garden.",
    eyebrow: "Bài viết"
  }
} as const;

export function generateStaticParams() {
  return getArticles().flatMap((article) => [
    {locale: "vi", slug: article.slug},
    {locale: "en", slug: article.slug}
  ]);
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = getArticle(slug);
  const copy = COPY[locale];

  if (!article) {
    return buildPageMetadata({
      title: copy.fallbackTitle,
      description: copy.fallbackDescription
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt
  });
}

export default async function LocalizedArticleDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  const article = getArticle(slug);
  const copy = COPY[locale];
  const tCommon = await getTranslations({locale, namespace: "Common"});

  if (!article) {
    notFound();
  }

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{article.title}</h1>
        <div className="meta-row">
          <span>{formatDate(article.publishedAt, locale)}</span>
          <span className="badge">{article.theme}</span>
        </div>
        {locale === "vi" && !article.availableLocales.includes("vi") ? (
          <p className="locale-note">{tCommon("englishOnly")}</p>
        ) : null}
      </div>
      <div className="detail-body stack">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
