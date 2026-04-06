import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {DetailHero} from "@/components/collection/detail-hero";
import {routing} from "@/i18n/routing";
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
    eyebrow: "Writing",
    signalEyebrow: "Route signal",
    signalTitle: "An argument that has already tightened.",
    signalBody: "Writing is the refined layer: less trail, more claim, clearer editorial weight."
  },
  vi: {
    fallbackTitle: "Bài viết",
    fallbackDescription: "Bài viết có chủ đích từ 2zcory Garden.",
    eyebrow: "Bài viết",
    signalEyebrow: "Tín hiệu route",
    signalTitle: "Một lập luận đã được siết lại.",
    signalBody: "Writing là lớp đã được gọt: ít trail hơn, nhiều claim hơn và trọng lượng biên tập rõ hơn."
  },
  ja: {
    fallbackTitle: "文章",
    fallbackDescription: "2zcory Garden の整えられた文章。",
    eyebrow: "文章",
    signalEyebrow: "ルートの信号",
    signalTitle: "すでに輪郭が締まった議論。",
    signalBody: "Writing は refined layer です。trail は減り、claim と editorial weight が強くなります。"
  }
} as const;

export function generateStaticParams() {
  return getArticles().flatMap((article) =>
    routing.locales.map((locale) => ({locale, slug: article.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = getArticle(slug, locale);
  const copy = COPY[locale];

  if (!article) {
    return buildPageMetadata({
      title: copy.fallbackTitle,
      description: copy.fallbackDescription,
      locale,
      pathname: `/writing/${slug}`
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    locale,
    pathname: `/writing/${slug}`
  });
}

export default async function LocalizedArticleDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  const article = getArticle(slug, locale);
  const copy = COPY[locale];
  const tCommon = await getTranslations({locale, namespace: "Common"});

  if (!article) {
    notFound();
  }

  return (
    <section className="page-stack detail-page detail-page-writing">
      <DetailHero
        accent="writing"
        eyebrow={copy.eyebrow}
        title={article.title}
        summary={article.excerpt}
        meta={
          <>
            <span>{formatDate(article.publishedAt, locale)}</span>
            <span className="badge">{article.theme}</span>
          </>
        }
        note={
          locale !== "en" && !article.availableLocales.includes(locale) ? (
            <p className="locale-note">{tCommon("englishOnly")}</p>
          ) : undefined
        }
        aside={
          <>
            <p className="eyebrow">{copy.signalEyebrow}</p>
            <h2 className="section-heading">{copy.signalTitle}</h2>
            <p className="muted">{copy.signalBody}</p>
          </>
        }
      />
      <div className="surface-card detail-article-card">
        <div className="detail-body stack">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
