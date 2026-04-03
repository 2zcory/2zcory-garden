import type {ComponentType, ReactNode} from "react";

import {RouteHero} from "@/components/collection/route-hero";
import type {AppLocale} from "@/i18n/routing";
import {getNotes} from "@/lib/content";
import {formatDate} from "@/lib/metadata";

type GardenCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  asideEyebrow: string;
  asideTitle: string;
  asideBody: string;
  metricEntries: string;
  metricTopics: string;
  metricLinks: string;
  leadLabel: string;
  leadRole: string;
  leadBody: string;
  leadWhy: string;
  leadWhyPoints: string[];
  branchTitle: string;
  branchBody: string;
  branchLabel: string;
  openEdgeLabel: string;
  routeDistinction: string;
  routeDistinctionBody: string;
  relatedLabel: string;
  linkedFromLabel: string;
  readNote: string;
  emptyTitle: string;
  emptyBody: string;
};

export const GARDEN_COPY: Record<AppLocale, GardenCopy> = {
  en: {
    title: "Garden",
    description: "Exploratory notes from 2zcory Garden arranged as visible trails of thinking.",
    eyebrow: "Garden",
    heroTitle: "Visible trails, still open.",
    heroBody:
      "Garden should not flatten exploratory notes into a neutral archive. It should show one live thread, nearby branches, and unfinished movement that is still earning its final form.",
    asideEyebrow: "Route signal",
    asideTitle: "One live trail should lead the route.",
    asideBody:
      "The page should reveal how notes connect, where the strongest thread currently sits, and why this surface stays more provisional than Writing.",
    metricEntries: "entries",
    metricTopics: "topic tags",
    metricLinks: "visible links",
    leadLabel: "Live trail",
    leadRole: "Route role",
    leadBody:
      "The lead note should feel active and provisional. It earns extra space through connection cues and trail language, not through essay-like prestige.",
    leadWhy: "Why it leads",
    leadWhyPoints: [
      "gives the route a visible starting path instead of equal-entry drift",
      "shows that Garden is organized by active thought, not publish-date alone",
      "lets the rest of the list behave like connected branches rather than leftovers"
    ],
    branchTitle: "Branching notes",
    branchBody:
      "Secondary notes should stay visible as nearby turns in the same terrain: linked enough to suggest adjacency, light enough to preserve the feeling of an open trail.",
    branchLabel: "Branch",
    openEdgeLabel: "Open edge",
    routeDistinction: "Route distinction",
    routeDistinctionBody:
      "Writing remains the shaped editorial surface. Garden should feel more connected, more provisional, and more map-like through trail cues, linked fragments, and visible openness.",
    relatedLabel: "Related fragments",
    linkedFromLabel: "Linked from lead trail",
    readNote: "Read note",
    emptyTitle: "No notes published yet.",
    emptyBody:
      "The garden surface is ready, but the first exploratory notes have not been published yet."
  },
  vi: {
    title: "Garden",
    description: "Các note khám phá của 2zcory Garden được sắp như những đường mòn suy nghĩ còn đang mở.",
    eyebrow: "Garden",
    heroTitle: "Đường mòn hiện ra, vẫn còn mở.",
    heroBody:
      "Garden không nên làm phẳng note khám phá thành một archive trung tính. Nó nên cho thấy một live thread, các nhánh ở gần, và phần chuyển động còn dang dở vẫn đang đi tới hình thức cuối cùng.",
    asideEyebrow: "Tín hiệu lối vào",
    asideTitle: "Một live trail nên giữ hướng đi của route.",
    asideBody:
      "Trang nên cho thấy note nối với nhau ra sao, thread nào đang mạnh nhất lúc này, và vì sao bề mặt này còn provisional hơn Writing.",
    metricEntries: "mục",
    metricTopics: "nhãn chủ đề",
    metricLinks: "liên kết thấy được",
    leadLabel: "Đường mòn chính",
    leadRole: "Vai trò của route",
    leadBody:
      "Note dẫn nên tạo cảm giác đang hoạt động và còn mở. Nó nhận thêm không gian nhờ tín hiệu kết nối và ngôn ngữ trail, không phải vì vẻ uy nghi của một bài essay.",
    leadWhy: "Vì sao nó dẫn",
    leadWhyPoints: [
      "cho route một điểm bắt đầu nhìn thấy được thay vì để mọi entry ngang hàng",
      "cho thấy Garden được tổ chức theo suy nghĩ đang chạy, không chỉ theo ngày publish",
      "để phần còn lại của list đọc như các nhánh liên quan thay vì phần thừa"
    ],
    branchTitle: "Các note rẽ nhánh",
    branchBody:
      "Các note phụ nên vẫn hiện ra như những lối rẽ gần trong cùng một địa hình: đủ liên quan để gợi adjacency, đủ nhẹ để giữ cảm giác đây là một trail còn mở.",
    branchLabel: "Nhánh",
    openEdgeLabel: "Mé mở",
    routeDistinction: "Phân biệt route",
    routeDistinctionBody:
      "Writing vẫn là bề mặt biên tập đã được gọt. Garden nên connected hơn, provisional hơn và giống bản đồ hơn nhờ trail cues, fragment có liên kết và độ mở còn nhìn thấy được.",
    relatedLabel: "Các mảnh liên quan",
    linkedFromLabel: "Được nối từ đường mòn chính",
    readNote: "Đọc ghi chú",
    emptyTitle: "Chưa có ghi chú nào được xuất bản.",
    emptyBody:
      "Bề mặt Garden đã sẵn sàng, nhưng những ghi chú khám phá đầu tiên vẫn chưa được xuất bản."
  },
  ja: {
    title: "ガーデン",
    description: "2zcory Garden の探索ノートを、まだ開いたままの思考 trail として並べた面。",
    eyebrow: "ガーデン",
    heroTitle: "見える trail、まだ開いたまま。",
    heroBody:
      "Garden は exploratory note を中立な archive に平らにしてはいけません。一本の live thread、その近くの branch、そしてまだ最終形を獲得していない movement を見せるべきです。",
    asideEyebrow: "ルートの信号",
    asideTitle: "一本の live trail が route を導くべきです。",
    asideBody:
      "ノート同士のつながり、今いちばん強い thread、そしてこの surface が Writing より provisional である理由を見せるべきです。",
    metricEntries: "entries",
    metricTopics: "topic tags",
    metricLinks: "visible links",
    leadLabel: "Live trail",
    leadRole: "Route role",
    leadBody:
      "先頭のノートは active で provisional に感じられるべきです。広さは essay 的な prestige ではなく、connection cue と trail language によって earned されます。",
    leadWhy: "なぜ先頭か",
    leadWhyPoints: [
      "すべての entry を横並びにせず、route に見える開始点を与える",
      "Garden が publish date だけでなく active thought で組まれていると示す",
      "残りの list を leftovers ではなく connected branches として読ませる"
    ],
    branchTitle: "Branching notes",
    branchBody:
      "二次のノートは同じ terrain の近い分岐として見えるべきです。近接を示すだけの link がありつつ、open trail の感触は壊さない軽さに留めます。",
    branchLabel: "Branch",
    openEdgeLabel: "Open edge",
    routeDistinction: "Route distinction",
    routeDistinctionBody:
      "Writing は shaped editorial surface のままです。Garden は trail cue、linked fragment、visible openness によって、より connected で provisional で map-like に感じられるべきです。",
    relatedLabel: "Related fragments",
    linkedFromLabel: "Lead trail から接続",
    readNote: "ノートを読む",
    emptyTitle: "まだ公開されたノートはありません。",
    emptyBody:
      "ガーデン面は用意されていますが、最初の探索ノートはまだ公開されていません。"
  }
};

type GardenPageProps = {
  locale: AppLocale;
  LinkComponent: ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
  }>;
  englishOnlyNote?: string;
};

export function GardenPage({locale, LinkComponent, englishOnlyNote}: GardenPageProps) {
  const copy = GARDEN_COPY[locale];
  const notes = getNotes(locale);
  const uniqueTopics = new Set(notes.flatMap((note) => note.topicLabels)).size;
  const totalLinks = notes.reduce((count, note) => count + note.relatedNoteSlugs.length, 0);
  const leadNote = notes.find((note) => note.featured) ?? notes[0];
  const branchNotes = leadNote ? notes.filter((note) => note.slug !== leadNote.slug) : [];
  const noteBySlug = new Map(notes.map((note) => [note.slug, note]));
  const relatedNotes = leadNote
    ? leadNote.relatedNoteSlugs.map((slug) => noteBySlug.get(slug)).filter((note) => note !== undefined)
    : [];

  return (
    <section className="page-stack route-page route-page-garden">
      <RouteHero
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroBody}
        accent="garden"
        metrics={[
          {label: copy.metricEntries, value: String(notes.length)},
          {label: copy.metricTopics, value: String(uniqueTopics)},
          {label: copy.metricLinks, value: String(totalLinks)}
        ]}
        aside={
          <>
            <p className="eyebrow">{copy.asideEyebrow}</p>
            <h2 className="section-heading">{copy.asideTitle}</h2>
            <p className="muted">{copy.asideBody}</p>
          </>
        }
      />

      {leadNote ? (
        <div className="garden-page-shell">
          <article className="garden-entry garden-entry-lead">
            <div className="garden-entry-rank">01</div>
            <div className="garden-entry-body">
              <div className="garden-entry-head">
                <div>
                  <div className="meta-row garden-entry-meta">
                    <span className="badge">{copy.leadLabel}</span>
                    <span>{formatDate(leadNote.publishedAt, locale)}</span>
                    <span>{leadNote.topicLabels[0]}</span>
                  </div>
                  <h2>{leadNote.title}</h2>
                </div>
                <p className="muted">{leadNote.summary}</p>
              </div>

              <div className="garden-entry-grid">
                <section className="garden-entry-column">
                  <p className="eyebrow garden-entry-label">{copy.leadWhy}</p>
                  <ul className="garden-entry-points">
                    {copy.leadWhyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
                <section className="garden-entry-column">
                  <p className="eyebrow garden-entry-label">{copy.leadRole}</p>
                  <p className="muted">{copy.leadBody}</p>
                </section>
              </div>

              {relatedNotes.length > 0 ? (
                <section className="garden-related-shell" aria-label={copy.relatedLabel}>
                  <p className="eyebrow garden-entry-label">{copy.relatedLabel}</p>
                  <div className="garden-related-links">
                    {relatedNotes.map((note) => (
                      <LinkComponent
                        key={note.slug}
                        href={`/garden/${note.slug}`}
                        className="garden-related-link"
                      >
                        {note.title}
                      </LinkComponent>
                    ))}
                  </div>
                </section>
              ) : null}

              {locale !== "en" && !leadNote.availableLocales.includes(locale) && englishOnlyNote ? (
                <p className="locale-note garden-locale-note">{englishOnlyNote}</p>
              ) : null}

              <div className="garden-entry-actions">
                <LinkComponent href={`/garden/${leadNote.slug}`} className="inline-link">
                  {copy.readNote}
                </LinkComponent>
              </div>
            </div>
          </article>

          {branchNotes.length > 0 ? (
            <section className="garden-support-shell">
              <div className="garden-support-head">
                <p className="eyebrow">{copy.branchTitle}</p>
                <p className="muted">{copy.branchBody}</p>
              </div>

              <ol className="garden-support-list" start={2}>
                {branchNotes.map((note, index) => {
                  const branchLabel =
                    note.relatedNoteSlugs.length > 0 ? copy.branchLabel : copy.openEdgeLabel;

                  return (
                    <li key={note.slug} className="garden-entry garden-entry-support">
                      <div className="garden-entry-rank">{String(index + 2).padStart(2, "0")}</div>
                      <div className="garden-entry-body">
                        <div className="garden-entry-head">
                          <div>
                            <div className="meta-row garden-entry-meta">
                              <span className="badge garden-badge-muted">{branchLabel}</span>
                              <span>{formatDate(note.publishedAt, locale)}</span>
                              <span>{note.topicLabels[0]}</span>
                            </div>
                            <h2>{note.title}</h2>
                          </div>
                          <p className="muted">{note.summary}</p>
                        </div>

                        <div className="garden-branch-notes">
                          {note.relatedNoteSlugs.includes(leadNote.slug) ? (
                            <p className="garden-branch-link-note">{copy.linkedFromLabel}</p>
                          ) : null}
                          <div className="meta-row garden-topic-row">
                            {note.topicLabels.map((label) => (
                              <span key={label} className="badge garden-badge-muted">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>

                        {locale !== "en" && !note.availableLocales.includes(locale) && englishOnlyNote ? (
                          <p className="locale-note garden-locale-note">{englishOnlyNote}</p>
                        ) : null}

                        <LinkComponent href={`/garden/${note.slug}`} className="inline-link">
                          {copy.readNote}
                        </LinkComponent>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ) : null}

          <article className="garden-route-note">
            <p className="eyebrow garden-entry-label">{copy.routeDistinction}</p>
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
