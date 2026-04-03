import type {ComponentType, ReactNode} from "react";

import {RouteHero} from "@/components/collection/route-hero";
import type {AppLocale} from "@/i18n/routing";
import {getArticles} from "@/lib/content";
import {formatDate} from "@/lib/metadata";

type WritingCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  asideEyebrow: string;
  asideTitle: string;
  asideBody: string;
  metricEntries: string;
  metricThemes: string;
  metricLocales: string;
  leadLabel: string;
  supportLabel: string;
  leadTheme: string;
  leadWhy: string;
  leadWhyPoints: string[];
  leadRole: string;
  leadRoleBody: string;
  supportTitle: string;
  supportBody: string;
  routeDistinction: string;
  routeDistinctionBody: string;
  readArticle: string;
  emptyTitle: string;
  emptyBody: string;
  supportRoleEditorial: string;
  supportRoleShorter: string;
};

export const WRITING_COPY: Record<AppLocale, WritingCopy> = {
  en: {
    title: "Writing",
    description: "Essays from 2zcory Garden, arranged with a clearer sense of weight and pace.",
    eyebrow: "Writing",
    heroTitle: "Essays that have settled enough to stand on their own.",
    heroBody:
      "This is where a line of thought has slowed down, found its shape, and become something you can read straight through.",
    asideEyebrow: "How to read it",
    asideTitle: "Start with the lead essay, then drift outward.",
    asideBody:
      "The opening piece carries the most weight. The rest stay nearby as shorter or lighter companions.",
    metricEntries: "pieces",
    metricThemes: "themes",
    metricLocales: "active locales",
    leadLabel: "Lead essay",
    supportLabel: "Support",
    leadTheme: "Featured",
    leadWhy: "Why start here",
    leadWhyPoints: [
      "it gives the clearest entry point into the writing on this site",
      "it carries the broadest argument on the page",
      "it gives the rest of the route something to gather around"
    ],
    leadRole: "What the lead is doing",
    leadRoleBody:
      "The lead piece gets more room because it asks for a slower read, not because it needs a louder introduction.",
    supportTitle: "Supporting pieces",
    supportBody:
      "These pieces stay finished and deliberate, but they move faster than the lead essay.",
    routeDistinction: "What makes this route different",
    routeDistinctionBody:
      "Garden stays open and provisional. Writing is quieter, more deliberate, and easier to read in one sitting.",
    readArticle: "Read article",
    emptyTitle: "No writing published yet.",
    emptyBody: "This section is ready for essays, but the first shaped pieces have not been added yet.",
    supportRoleEditorial: "Editorial boundary",
    supportRoleShorter: "Shorter shaped piece"
  },
  vi: {
    title: "Bài viết",
    description: "Các bài viết từ 2zcory Garden, được sắp lại để thấy rõ trọng lượng và nhịp đọc hơn.",
    eyebrow: "Bài viết",
    heroTitle: "Những bài đã lắng đủ để tự đứng thành một bài.",
    heroBody:
      "Đây là nơi một đường suy nghĩ chậm lại, có hình, và thành thứ có thể đọc một mạch từ đầu tới cuối.",
    asideEyebrow: "Cách đọc",
    asideTitle: "Bắt đầu từ bài dẫn, rồi đi dần ra ngoài.",
    asideBody:
      "Bài đầu giữ trọng lượng chính. Những bài còn lại vẫn ở gần, nhưng nhẹ hơn và đi nhanh hơn.",
    metricEntries: "bài",
    metricThemes: "chủ đề",
    metricLocales: "ngôn ngữ hoạt động",
    leadLabel: "Bài dẫn",
    supportLabel: "Hỗ trợ",
    leadTheme: "Bài nổi bật",
    leadWhy: "Vì sao nên bắt đầu ở đây",
    leadWhyPoints: [
      "đây là lối vào rõ nhất cho phần viết trên site",
      "nó giữ lập luận rộng nhất trên trang này",
      "nó cho các bài còn lại một điểm để tụ lại"
    ],
    leadRole: "Bài dẫn đang làm gì",
    leadRoleBody:
      "Bài dẫn có thêm không gian vì nó cần nhịp đọc chậm hơn, không phải vì nó cần phần giới thiệu lớn hơn.",
    supportTitle: "Các bài hỗ trợ",
    supportBody:
      "Các bài này vẫn là bài đã hoàn thành, nhưng đọc nhanh và nhẹ hơn bài dẫn.",
    routeDistinction: "Điểm khác của route này",
    routeDistinctionBody:
      "Garden còn mở và tạm thời hơn. Writing yên hơn, gọn hơn, và dễ đọc thành một mạch hơn.",
    readArticle: "Đọc bài viết",
    emptyTitle: "Chưa có bài viết nào được xuất bản.",
    emptyBody: "Khu vực này đã sẵn cho bài viết dài, nhưng những bài đã được gọt đầu tiên vẫn chưa được thêm vào.",
    supportRoleEditorial: "Ranh giới biên tập",
    supportRoleShorter: "Bài ngắn đã được gọt"
  },
  ja: {
    title: "文章",
    description: "2zcory Garden の文章を、重さと読みの流れが見えやすい形で並べたページ。",
    eyebrow: "文章",
    heroTitle: "ひとつの文章として読めるところまで落ち着いたもの。",
    heroBody:
      "ここでは、考えが少し遅くなり、形を持ち、最初から最後まで通して読めるものになっています。",
    asideEyebrow: "読み方",
    asideTitle: "まず先頭の一本から入り、そのあと外へ広がる。",
    asideBody:
      "先頭の文章がいちばん重く、残りはその近くで少し軽く並びます。",
    metricEntries: "pieces",
    metricThemes: "themes",
    metricLocales: "active locales",
    leadLabel: "Lead essay",
    supportLabel: "Support",
    leadTheme: "Featured",
    leadWhy: "ここから始める理由",
    leadWhyPoints: [
      "このページの文章に入るいちばん自然な入口になる",
      "ページの中でいちばん大きな議論を受け持っている",
      "ほかの文章が集まる中心をつくる"
    ],
    leadRole: "先頭の役割",
    leadRoleBody:
      "先頭の文章に広さがあるのは、ゆっくり読む必要があるからであって、派手な導入が必要だからではありません。",
    supportTitle: "周りの文章",
    supportBody:
      "こちらも完成した文章ですが、先頭の一本よりは軽く、速く読めます。",
    routeDistinction: "この route の違い",
    routeDistinctionBody:
      "Garden がまだ開いたままなのに対して、Writing はもう少し静かで、まとまりのある読み心地になります。",
    readArticle: "記事を読む",
    emptyTitle: "まだ公開された文章はありません。",
    emptyBody: "この場所は文章のために空けてありますが、最初の一本はまだ公開されていません。",
    supportRoleEditorial: "ゆっくり読む一本",
    supportRoleShorter: "短めの文章"
  }
};

type WritingPageProps = {
  locale: AppLocale;
  LinkComponent: ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
  }>;
  englishOnlyNote?: string;
};

export function WritingPage({locale, LinkComponent, englishOnlyNote}: WritingPageProps) {
  const copy = WRITING_COPY[locale];
  const articles = getArticles(locale);
  const uniqueThemes = new Set(articles.map((article) => article.theme)).size;
  const [leadArticle, ...supportArticles] = articles;

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

      {leadArticle ? (
        <div className="writing-page-shell">
          <article className="writing-entry writing-entry-lead">
            <div className="writing-entry-rank">01</div>
            <div className="writing-entry-body">
              <div className="writing-entry-head">
                <div>
                  <div className="meta-row writing-entry-meta">
                    <span className="badge">{copy.leadLabel}</span>
                    <span>{copy.leadTheme}</span>
                    <span>{formatDate(leadArticle.publishedAt, locale)}</span>
                  </div>
                  <h2>{leadArticle.title}</h2>
                </div>
                <p className="muted">{leadArticle.excerpt}</p>
              </div>

              <div className="writing-entry-grid">
                <section className="writing-entry-column">
                  <p className="eyebrow writing-entry-label">{copy.leadWhy}</p>
                  <ul className="writing-entry-points">
                    {copy.leadWhyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
                <section className="writing-entry-column">
                  <p className="eyebrow writing-entry-label">{copy.leadRole}</p>
                  <p className="muted">{copy.leadRoleBody}</p>
                </section>
              </div>

              {locale !== "en" && !leadArticle.availableLocales.includes(locale) && englishOnlyNote ? (
                <p className="locale-note writing-locale-note">{englishOnlyNote}</p>
              ) : null}

              <div className="writing-entry-actions">
                <LinkComponent href={`/writing/${leadArticle.slug}`} className="inline-link">
                  {copy.readArticle}
                </LinkComponent>
              </div>
            </div>
          </article>

          {supportArticles.length > 0 ? (
            <section className="writing-support-shell">
              <div className="writing-support-head">
                <p className="eyebrow">{copy.supportTitle}</p>
                <p className="muted">{copy.supportBody}</p>
              </div>

              <ol className="writing-support-list" start={2}>
                {supportArticles.map((article, index) => (
                  <li key={article.slug} className="writing-entry writing-entry-support">
                    <div className="writing-entry-rank">
                      {String(index + 2).padStart(2, "0")}
                    </div>
                    <div className="writing-entry-body">
                      <div className="writing-entry-head">
                        <div>
                          <div className="meta-row writing-entry-meta">
                            <span className="badge writing-badge-muted">{copy.supportLabel}</span>
                            <span>
                              {index === 0 ? copy.supportRoleEditorial : copy.supportRoleShorter}
                            </span>
                            <span>{formatDate(article.publishedAt, locale)}</span>
                          </div>
                          <h2>{article.title}</h2>
                        </div>
                        <p className="muted">{article.excerpt}</p>
                      </div>

                      {locale !== "en" && !article.availableLocales.includes(locale) && englishOnlyNote ? (
                        <p className="locale-note writing-locale-note">{englishOnlyNote}</p>
                      ) : null}

                      <LinkComponent href={`/writing/${article.slug}`} className="inline-link">
                        {copy.readArticle}
                      </LinkComponent>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <article className="writing-route-note">
            <p className="eyebrow writing-entry-label">{copy.routeDistinction}</p>
            <p className="muted">{copy.routeDistinctionBody}</p>
          </article>
        </div>
      ) : (
        <article className="content-item route-empty-card">
          <h2>{copy.emptyTitle}</h2>
          <p className="muted">{copy.emptyBody}</p>
        </article>
      )}
    </section>
  );
}
