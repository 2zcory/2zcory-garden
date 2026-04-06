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
  supportEyebrow: string;
  supportRoleEditorial: string;
  supportRoleShorter: string;
};

export const WRITING_COPY: Record<AppLocale, WritingCopy> = {
  en: {
    title: "Writing",
    description: "Essays from 2zcory Garden where a line of thought has tightened into a clearer position.",
    eyebrow: "Writing",
    heroTitle: "Where a line of thought becomes a clearer position.",
    heroBody:
      "Writing is where the work stops branching for a while, finds its shape, and becomes something you can read straight through.",
    asideEyebrow: "How to read it",
    asideTitle: "Start with the clearest position, then drift outward.",
    asideBody:
      "The opening piece carries the strongest claim. The rest stay nearby as shorter or lighter companions around that clearer center.",
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
      "The lead piece gets more room because it carries the clearest position on the page, not because it needs a louder introduction.",
    supportTitle: "Supporting pieces",
    supportBody:
      "These pieces stay finished and deliberate, but they move faster than the lead essay and keep the route from collapsing into one single voice.",
    routeDistinction: "What makes this route different",
    routeDistinctionBody:
      "Garden keeps more of the unfinished movement visible. Projects show what survived execution. Writing is the middle state: the thinking has become clearer, but it is still being read primarily as thought.",
    readArticle: "Read article",
    emptyTitle: "No writing published yet.",
    emptyBody: "This section is ready for essays, but the first shaped pieces have not been added yet.",
    supportEyebrow: "Continue with",
    supportRoleEditorial: "Editorial boundary",
    supportRoleShorter: "Shorter shaped piece"
  },
  vi: {
    title: "Bài viết",
    description: "Những bài viết từ 2zcory Garden nơi một đường suy nghĩ đã gọn lại thành một ý rõ hơn.",
    eyebrow: "Bài viết",
    heroTitle: "Nơi một đường suy nghĩ thành một ý rõ hơn.",
    heroBody:
      "Writing là lúc phần việc ngừng rẽ nhánh thêm một chút, có hình hơn, và thành thứ có thể đọc một mạch từ đầu tới cuối.",
    asideEyebrow: "Cách đọc",
    asideTitle: "Bắt đầu từ ý rõ nhất, rồi đi dần ra ngoài.",
    asideBody:
      "Bài đầu giữ ý rõ nhất. Những bài còn lại vẫn ở gần, nhưng nhẹ hơn và đi nhanh hơn quanh điểm trung tâm đó.",
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
      "Bài dẫn có thêm không gian vì nó giữ ý rõ nhất của trang này, không phải vì nó cần phần giới thiệu lớn hơn.",
    supportTitle: "Các bài hỗ trợ",
    supportBody:
      "Các bài này vẫn là bài đã hoàn thành, nhưng đọc nhanh và nhẹ hơn bài dẫn, để route này không co lại thành một giọng duy nhất.",
    routeDistinction: "Điểm khác của route này",
    routeDistinctionBody:
      "Garden giữ lại phần chuyển động còn dang dở. Projects cho thấy thứ gì đã qua được phần thực thi. Writing là phần ở giữa: ý đã rõ hơn, nhưng vẫn chủ yếu được đọc như thought.",
    readArticle: "Đọc bài viết",
    emptyTitle: "Chưa có bài viết nào được xuất bản.",
    emptyBody: "Khu vực này đã sẵn cho bài viết dài, nhưng những bài đã được gọt đầu tiên vẫn chưa được thêm vào.",
    supportEyebrow: "Đọc tiếp",
    supportRoleEditorial: "Ranh giới biên tập",
    supportRoleShorter: "Bài ngắn đã được gọt"
  },
  ja: {
    title: "文章",
    description: "2zcory Garden の中で、ひとつの考えがより明確な立場へまとまった文章の面。",
    eyebrow: "文章",
    heroTitle: "ひとつの考えが、より明確な立場になる場所。",
    heroBody:
      "ここでは、考えが少し枝分かれをやめ、形を持ち、最初から最後まで通して読めるものになっています。",
    asideEyebrow: "読み方",
    asideTitle: "まずいちばん明確な一本から入り、そのあと外へ広がる。",
    asideBody:
      "先頭の文章がいちばん明確な立場を持ち、残りはその近くで少し軽く並びます。",
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
      "先頭の文章に広さがあるのは、このページでいちばん明確な立場を担っているからであって、派手な導入が必要だからではありません。",
    supportTitle: "周りの文章",
    supportBody:
      "こちらも完成した文章ですが、先頭の一本よりは軽く、速く読めます。この route が一つの声だけにならないようにする役割もあります。",
    routeDistinction: "この route の違い",
    routeDistinctionBody:
      "Garden がまだ動きを見せる場所で、Projects が実行に着地した場所だとすれば、Writing はその中間です。考えはより明確になっていますが、まだ主に思考として読まれます。",
    readArticle: "記事を読む",
    emptyTitle: "まだ公開された文章はありません。",
    emptyBody: "この場所は文章のために空けてありますが、最初の一本はまだ公開されていません。",
    supportEyebrow: "続けて読む",
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
                <div className="writing-entry-main">
                  <div className="meta-row writing-entry-meta">
                    <span className="badge">{copy.leadLabel}</span>
                    <span>{copy.leadTheme}</span>
                    <span>{formatDate(leadArticle.publishedAt, locale)}</span>
                  </div>
                  <h2>{leadArticle.title}</h2>
                  <p className="muted writing-entry-excerpt">{leadArticle.excerpt}</p>
                </div>
              </div>

              <div className="writing-lead-notes">
                <section className="writing-lead-note">
                  <p className="eyebrow writing-entry-label">{copy.leadWhy}</p>
                  <ul className="writing-entry-points">
                    {copy.leadWhyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
                <section className="writing-lead-note writing-lead-note-editorial">
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
                <p className="eyebrow">{copy.supportEyebrow}</p>
                <h2 className="section-heading">{copy.supportTitle}</h2>
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
                        <div className="writing-entry-main">
                          <div className="meta-row writing-entry-meta">
                            <span className="badge writing-badge-muted">{copy.supportLabel}</span>
                            <span>
                              {index === 0 ? copy.supportRoleEditorial : copy.supportRoleShorter}
                            </span>
                            <span>{formatDate(article.publishedAt, locale)}</span>
                          </div>
                          <h3>{article.title}</h3>
                        </div>
                      </div>

                      <p className="muted writing-entry-excerpt">{article.excerpt}</p>

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
