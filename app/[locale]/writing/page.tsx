import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {RouteHero} from "@/components/collection/route-hero";
import {RouteListCard} from "@/components/collection/route-list-card";
import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/routing";
import {getArticles} from "@/lib/content";
import {buildPageMetadata, formatDate} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
  en: {
    title: "Writing",
    description: "Essays and shaped writing from 2zcory Garden.",
    eyebrow: "Writing",
    heroTitle: "Deliberate output.",
    heroBody:
      "Essays and shaped pieces that carry a stronger argument, conclusion, or editorial form than the garden trail they may have started from.",
    asideEyebrow: "Route signal",
    asideTitle: "Refined thinking, tighter edges.",
    asideBody: "Writing is where the garden trail hardens into a clearer claim people can return to.",
    metricEntries: "pieces",
    metricThemes: "themes",
    metricLocales: "active locales",
    readArticle: "Read article",
    emptyTitle: "No writing published yet.",
    emptyBody: "This section is ready for essays, but the first shaped pieces have not been added yet."
  },
  vi: {
    title: "Bài viết",
    description: "Các bài viết và bài đã được gọt từ 2zcory Garden.",
    eyebrow: "Bài viết",
    heroTitle: "Đầu ra có chủ đích.",
    heroBody:
      "Những bài viết và mảnh nội dung đã được gọt lại, mang lập luận, kết luận hoặc hình thức biên tập rõ hơn so với đường mòn Garden mà chúng có thể bắt đầu từ đó.",
    asideEyebrow: "Tín hiệu lối vào",
    asideTitle: "Suy nghĩ đã gọt, cạnh rõ hơn.",
    asideBody: "Writing là nơi đường mòn Garden cứng lại thành một lập trường rõ để người đọc quay lại.",
    metricEntries: "bài",
    metricThemes: "chủ đề",
    metricLocales: "ngôn ngữ hoạt động",
    readArticle: "Đọc bài viết",
    emptyTitle: "Chưa có bài viết nào được xuất bản.",
    emptyBody: "Khu vực này đã sẵn cho bài viết dài, nhưng những bài đã được gọt đầu tiên vẫn chưa được thêm vào."
  },
  ja: {
    title: "文章",
    description: "2zcory Garden のエッセイと整えられた文章。",
    eyebrow: "文章",
    heroTitle: "意図を持った出力。",
    heroBody:
      "ガーデンの trail から育ったかもしれない素材を、より強い主張、結論、編集の形へ整えた文章のための面です。",
    asideEyebrow: "ルートの信号",
    asideTitle: "整えた思考、より締まった輪郭。",
    asideBody: "Writing は garden trail がより明確な claim に固まる場所です。",
    metricEntries: "pieces",
    metricThemes: "themes",
    metricLocales: "active locales",
    readArticle: "記事を読む",
    emptyTitle: "まだ公開された文章はありません。",
    emptyBody: "このセクションはエッセイのために用意されていますが、最初の整えられた文章はまだ追加されていません。"
  }
} as const;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = COPY[locale];

  return buildPageMetadata({
    title: copy.title,
    description: copy.description
  });
}

export default async function LocalizedWritingPage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale];
  const articles = getArticles(locale);
  const tCommon = await getTranslations({locale, namespace: "Common"});
  const uniqueThemes = new Set(articles.map((article) => article.theme)).size;

  return (
    <section className="page-stack route-page route-page-writing">
      <RouteHero
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroBody}
        accent="writing"
        metrics={[
          {label: copy.metricEntries, value: String(articles.length)},
          {label: copy.metricThemes, value: String(uniqueThemes)},
          {label: copy.metricLocales, value: "3"}
        ]}
        aside={
          <>
            <p className="eyebrow">{copy.asideEyebrow}</p>
            <h2 className="section-heading">{copy.asideTitle}</h2>
            <p className="muted">{copy.asideBody}</p>
          </>
        }
      />
      <div className="route-list-grid">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <RouteListCard
              key={article.slug}
              accent="writing"
              index={String(index + 1).padStart(2, "0")}
              title={article.title}
              description={article.excerpt}
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
              footer={
                <Link href={`/writing/${article.slug}`} className="inline-link">
                  {copy.readArticle}
                </Link>
              }
            />
          ))
        ) : (
          <article className="content-item route-empty-card">
            <h2>{copy.emptyTitle}</h2>
            <p className="muted">{copy.emptyBody}</p>
          </article>
        )}
      </div>
    </section>
  );
}
