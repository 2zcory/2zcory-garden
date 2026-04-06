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
  branchEyebrow: string;
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
    description: "Notes from 2zcory Garden that keep the thinking visible before it settles into writing or shipped work.",
    eyebrow: "Garden",
    heroTitle: "Where the thinking stays open enough to change.",
    heroBody:
      "Garden keeps the live edge of the work visible: fragments, turns, and partial answers that have not settled into essays or execution yet.",
    asideEyebrow: "How to read it",
    asideTitle: "Start where the thinking is alive, then follow the nearby branches.",
    asideBody:
      "One note gives the route a real starting point. The others stay nearby as connected turns, side notes, or open edges that may later become writing or projects.",
    metricEntries: "entries",
    metricTopics: "topic tags",
    metricLinks: "visible links",
    leadLabel: "Lead note",
    branchEyebrow: "Follow the thread",
    leadRole: "What the lead is doing",
    leadBody:
      "The lead note gets more room because it helps you enter the live problem, not because it needs to pretend it is finished.",
    leadWhy: "Why start here",
    leadWhyPoints: [
      "it gives the page a clear place to begin",
      "it shows one thought in motion instead of a flat list of entries",
      "it lets the rest read like nearby branches instead of leftovers"
    ],
    branchTitle: "Nearby notes",
    branchBody:
      "These notes stay close to the lead without needing to resolve into a single argument yet.",
    branchLabel: "Connected note",
    openEdgeLabel: "Loose edge",
    routeDistinction: "What makes this route different",
    routeDistinctionBody:
      "Writing is where the thinking becomes clearer. Projects are where it meets execution. Garden keeps the unfinished movement visible before either of those happens.",
    relatedLabel: "Related notes",
    linkedFromLabel: "Points back to the lead note",
    readNote: "Read note",
    emptyTitle: "No notes published yet.",
    emptyBody:
      "The garden surface is ready, but the first exploratory notes have not been published yet."
  },
  vi: {
    title: "Garden",
    description: "Những note của 2zcory Garden giữ phần suy nghĩ còn đang sống trước khi nó lắng xuống thành bài viết hay phần việc đã ship.",
    eyebrow: "Garden",
    heroTitle: "Nơi ý còn mở đủ để thay đổi tiếp.",
    heroBody:
      "Garden giữ phần sống của công việc ở gần bề mặt: mảnh rời, khúc rẽ, và câu trả lời còn dở, trước khi nó lắng xuống thành bài viết hay đi vào phần thực thi.",
    asideEyebrow: "Cách đọc",
    asideTitle: "Bắt đầu từ chỗ ý còn đang sống, rồi đi tiếp sang các nhánh gần đó.",
    asideBody:
      "Một note cho trang điểm bắt đầu. Các note còn lại nằm quanh đó như chỗ rẽ, ghi chú bên lề, hay phần còn bỏ ngỏ có thể đi tiếp thành bài viết hoặc dự án.",
    metricEntries: "mục",
    metricTopics: "nhãn chủ đề",
    metricLinks: "liên kết thấy được",
    leadLabel: "Note dẫn",
    branchEyebrow: "Đi tiếp theo mạch này",
    leadRole: "Note dẫn đang làm gì",
    leadBody:
      "Note dẫn có thêm không gian vì nó giúp đi vào phần việc đang sống, không phải vì nó cần giả vờ mình đã hoàn chỉnh.",
    leadWhy: "Vì sao bắt đầu từ đây",
    leadWhyPoints: [
      "nó cho trang một điểm bắt đầu rõ ràng",
      "nó cho thấy một ý đang chạy thay vì một list phẳng",
      "nó khiến các mục còn lại đọc như nhánh gần đó thay vì phần dư"
    ],
    branchTitle: "Những note ở gần",
    branchBody:
      "Các note này đứng gần note dẫn nhưng chưa cần gom lại thành một lập luận duy nhất.",
    branchLabel: "Note nối tiếp",
    openEdgeLabel: "Phần còn mở",
    routeDistinction: "Điểm khác của route này",
    routeDistinctionBody:
      "Writing là lúc ý đã rõ hơn. Projects là lúc ý đó đã chạm phần thực thi. Garden giữ lại phần chuyển động còn dang dở trước hai trạng thái đó.",
    relatedLabel: "Các note liên quan",
    linkedFromLabel: "Có nối lại với note dẫn",
    readNote: "Đọc ghi chú",
    emptyTitle: "Chưa có ghi chú nào được xuất bản.",
    emptyBody:
      "Bề mặt Garden đã sẵn sàng, nhưng những ghi chú khám phá đầu tiên vẫn chưa được xuất bản."
  },
  ja: {
    title: "ガーデン",
    description: "文章や実際の仕事に固まる前の思考を、そのまま見えるように残すノートの面。",
    eyebrow: "ガーデン",
    heroTitle: "考えがまだ変わり続けている場所。",
    heroBody:
      "ここでは、思考の生きた端を表面近くに残します。断片や曲がり角、まだ文章や実行に固まっていない答えが見える場所です。",
    asideEyebrow: "読み方",
    asideTitle: "まず生きている考えから入り、その近くの枝をたどる。",
    asideBody:
      "一本のノートが入口になり、ほかのノートはその近くで枝や脇道として残ります。あとで文章や project へ伸びる可能性も含んだままです。",
    metricEntries: "entries",
    metricTopics: "topic tags",
    metricLinks: "visible links",
    leadLabel: "Lead note",
    branchEyebrow: "この流れをたどる",
    leadRole: "先頭の役割",
    leadBody:
      "先頭のノートに少し余白があるのは、この route の生きた問題に入るための取っかかりになるからです。完成した文章のふりをする必要はありません。",
    leadWhy: "ここから始める理由",
    leadWhyPoints: [
      "ページに入り口をつくれる",
      "平らな一覧ではなく、動いているひとつの考えを見せられる",
      "残りのノートが余りものではなく近くの枝に見えてくる"
    ],
    branchTitle: "近くのノート",
    branchBody:
      "これらのノートは先頭の近くに置かれますが、まだひとつの結論にまとめる必要はありません。",
    branchLabel: "つながるノート",
    openEdgeLabel: "まだ開いた端",
    routeDistinction: "この route の違い",
    routeDistinctionBody:
      "Writing がより明確になった考えの場所で、Projects が実行に着地した場所だとすれば、Garden はその手前の動きそのものを見せる場所です。",
    relatedLabel: "関連するノート",
    linkedFromLabel: "先頭のノートにつながる",
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
                <div className="garden-entry-main">
                  <div className="meta-row garden-entry-meta">
                    <span className="badge">{copy.leadLabel}</span>
                    <span>{formatDate(leadNote.publishedAt, locale)}</span>
                    <span>{leadNote.topicLabels[0]}</span>
                  </div>
                  <h2>{leadNote.title}</h2>
                  <p className="muted garden-entry-summary">{leadNote.summary}</p>
                </div>
              </div>

              <div className="garden-lead-notes">
                <section className="garden-lead-note">
                  <p className="eyebrow garden-entry-label">{copy.leadWhy}</p>
                  <ul className="garden-entry-points">
                    {copy.leadWhyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
                <section className="garden-lead-note garden-lead-note-motion">
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
                <p className="eyebrow">{copy.branchEyebrow}</p>
                <h2 className="section-heading">{copy.branchTitle}</h2>
                <p className="muted">{copy.branchBody}</p>
              </div>

              <ol className="garden-support-list" start={2}>
                {branchNotes.map((note, index) => {
                  const branchLabel = index === 0 ? copy.branchLabel : copy.openEdgeLabel;
                  const isPrimaryBranch = index === 0;
                  const linksBackToLead = note.relatedNoteSlugs.includes(leadNote.slug);

                  return (
                    <li
                      key={note.slug}
                      className={`garden-entry garden-entry-support${
                        isPrimaryBranch ? " garden-entry-support-branch" : " garden-entry-support-loose"
                      }`}
                    >
                      <div className="garden-entry-rank">{String(index + 2).padStart(2, "0")}</div>
                      <div className="garden-entry-body">
                        <div className="garden-entry-head">
                          <div className="garden-entry-main">
                            <div className="meta-row garden-entry-meta">
                              <span className="badge garden-badge-muted">{branchLabel}</span>
                              <span>{formatDate(note.publishedAt, locale)}</span>
                              <span>{note.topicLabels[0]}</span>
                            </div>
                            <h3>{note.title}</h3>
                          </div>
                        </div>

                        <p className="muted garden-entry-summary">{note.summary}</p>

                        <div className="garden-branch-notes">
                          {linksBackToLead ? (
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
