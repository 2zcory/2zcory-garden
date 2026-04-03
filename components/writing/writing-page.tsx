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
    description: "Shaped writing from 2zcory Garden with clearer editorial hierarchy.",
    eyebrow: "Writing",
    heroTitle: "Shaped output, not archive filler.",
    heroBody:
      "Writing is where the garden trail tightens into a clearer claim. The route should feel selected, paced, and visibly more resolved than exploratory notes.",
    asideEyebrow: "Route signal",
    asideTitle: "One anchor essay should carry the route.",
    asideBody:
      "The page should lead with the strongest shaped piece, keep the rest visible but quieter, and separate itself from Garden through hierarchy rather than extra explanation.",
    metricEntries: "pieces",
    metricThemes: "themes",
    metricLocales: "active locales",
    leadLabel: "Lead essay",
    supportLabel: "Support",
    leadTheme: "Product direction",
    leadWhy: "Why it leads",
    leadWhyPoints: [
      "explains the operating model behind the whole site",
      "ties identity, writing, and execution into one public frame",
      "gives the clearest first entry point for a new visitor"
    ],
    leadRole: "Route role",
    leadRoleBody:
      "The lead piece should behave like an editorial anchor, not a hero banner. It earns more space through argument and summary density.",
    supportTitle: "Supporting pieces",
    supportBody:
      "Supporting essays should still read as shaped work, but with lighter density and shorter claims than the anchor piece.",
    routeDistinction: "Route distinction",
    routeDistinctionBody:
      "Garden remains exploratory. Writing should feel tighter, quieter, and more resolved through hierarchy and pacing rather than a long explainer paragraph.",
    readArticle: "Read article",
    emptyTitle: "No writing published yet.",
    emptyBody: "This section is ready for essays, but the first shaped pieces have not been added yet.",
    supportRoleEditorial: "Editorial boundary",
    supportRoleShorter: "Shorter shaped piece"
  },
  vi: {
    title: "Bài viết",
    description: "Các bài viết đã được gọt và có hierarchy rõ hơn từ 2zcory Garden.",
    eyebrow: "Bài viết",
    heroTitle: "Đầu ra đã được gọt, không phải archive cho đủ chỗ.",
    heroBody:
      "Writing là nơi đường mòn Garden siết lại thành một lập luận rõ hơn. Route này nên đọc như phần output được chọn, có nhịp và resolved hơn note khám phá.",
    asideEyebrow: "Tín hiệu lối vào",
    asideTitle: "Một bài dẫn nên giữ trọng lượng của cả route.",
    asideBody:
      "Trang nên mở bằng bài đã được gọt mạnh nhất, giữ phần còn lại vẫn thấy được nhưng nhẹ hơn, và tách mình khỏi Garden bằng hierarchy chứ không bằng phần giải thích dài thêm.",
    metricEntries: "bài",
    metricThemes: "chủ đề",
    metricLocales: "ngôn ngữ hoạt động",
    leadLabel: "Bài dẫn",
    supportLabel: "Hỗ trợ",
    leadTheme: "Định hướng sản phẩm",
    leadWhy: "Vì sao nó dẫn",
    leadWhyPoints: [
      "giải thích operating model đứng sau toàn bộ site",
      "nối identity, writing và execution vào cùng một public frame",
      "cho người mới một lối vào đầu tiên rõ nhất"
    ],
    leadRole: "Vai trò của route",
    leadRoleBody:
      "Bài dẫn nên hoạt động như một editorial anchor, không phải hero banner. Nó nhận thêm không gian nhờ mật độ lập luận và tóm tắt.",
    supportTitle: "Các bài hỗ trợ",
    supportBody:
      "Các bài hỗ trợ vẫn phải đọc như output đã được gọt, nhưng với mật độ nhẹ hơn và claim ngắn hơn bài dẫn.",
    routeDistinction: "Phân biệt route",
    routeDistinctionBody:
      "Garden vẫn là vùng khám phá. Writing nên chặt hơn, yên hơn và resolved hơn thông qua hierarchy và nhịp đọc thay vì thêm một đoạn giải thích dài.",
    readArticle: "Đọc bài viết",
    emptyTitle: "Chưa có bài viết nào được xuất bản.",
    emptyBody: "Khu vực này đã sẵn cho bài viết dài, nhưng những bài đã được gọt đầu tiên vẫn chưa được thêm vào.",
    supportRoleEditorial: "Ranh giới biên tập",
    supportRoleShorter: "Bài ngắn đã được gọt"
  },
  ja: {
    title: "文章",
    description: "2zcory Garden の整えられた文章と明確な editorial hierarchy。",
    eyebrow: "文章",
    heroTitle: "埋め草の archive ではなく、整えられた output。",
    heroBody:
      "Writing は garden trail がより明確な claim に締まる場所です。この route は exploratory note よりも、選ばれ、整い、落ち着いた output として読めるべきです。",
    asideEyebrow: "ルートの信号",
    asideTitle: "一本の anchor essay が route を支えるべきです。",
    asideBody:
      "最も強い文章を先頭に置き、残りは見えるまま静かに保ち、Garden との差を長い説明ではなく hierarchy で示すべきです。",
    metricEntries: "pieces",
    metricThemes: "themes",
    metricLocales: "active locales",
    leadLabel: "Lead essay",
    supportLabel: "Support",
    leadTheme: "Product direction",
    leadWhy: "なぜ先頭か",
    leadWhyPoints: [
      "サイト全体の operating model を説明する",
      "identity と writing と execution を一つの public frame に結びつける",
      "初めて来た訪問者に最も明確な入口を与える"
    ],
    leadRole: "Route role",
    leadRoleBody:
      "先頭の文章は hero banner ではなく editorial anchor として振る舞うべきです。広さは装飾ではなく argument と summary density で earned されます。",
    supportTitle: "Supporting pieces",
    supportBody:
      "補助の文章も shaped work として読めるべきですが、anchor piece より軽い密度と短い claim に留めます。",
    routeDistinction: "Route distinction",
    routeDistinctionBody:
      "Garden は exploratory のままです。Writing は hierarchy と pace によって、より締まり、静かで、resolved に感じられるべきです。",
    readArticle: "記事を読む",
    emptyTitle: "まだ公開された文章はありません。",
    emptyBody: "このセクションはエッセイのために用意されていますが、最初の整えられた文章はまだ追加されていません。",
    supportRoleEditorial: "Editorial boundary",
    supportRoleShorter: "Shorter shaped piece"
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
