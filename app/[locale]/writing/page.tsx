import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

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
      "Những bài viết và mảnh nội dung đã được gọt lại, mang lập luận, kết luận hoặc hình thức biên tập rõ hơn so với garden trail mà chúng có thể bắt đầu từ đó.",
    readArticle: "Đọc bài viết",
    emptyTitle: "Chưa có bài viết nào được publish.",
    emptyBody: "Khu vực này đã sẵn cho essay, nhưng những bài đã được gọt đầu tiên vẫn chưa được thêm vào."
  },
  ja: {
    title: "文章",
    description: "2zcory Garden のエッセイと整えられた文章。",
    eyebrow: "文章",
    heroTitle: "意図を持った出力。",
    heroBody:
      "ガーデンの trail から育ったかもしれない素材を、より強い主張、結論、編集の形へ整えた文章のための面です。",
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

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{copy.heroTitle}</h1>
        <p className="page-copy">{copy.heroBody}</p>
      </div>
      <div className="content-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.slug} className="content-item">
              <div className="meta-row">
                <span>{formatDate(article.publishedAt, locale)}</span>
                <span className="badge">{article.theme}</span>
              </div>
              <h2>{article.title}</h2>
              <p className="muted">{article.excerpt}</p>
              {locale !== "en" && !article.availableLocales.includes(locale) ? (
                <p className="locale-note">{tCommon("englishOnly")}</p>
              ) : null}
              <Link href={`/writing/${article.slug}`} className="inline-link">
                {copy.readArticle}
              </Link>
            </article>
          ))
        ) : (
          <article className="content-item">
            <h2>{copy.emptyTitle}</h2>
            <p className="muted">{copy.emptyBody}</p>
          </article>
        )}
      </div>
    </section>
  );
}
