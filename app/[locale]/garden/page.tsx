import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {RouteHero} from "@/components/collection/route-hero";
import {RouteListCard} from "@/components/collection/route-list-card";
import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/routing";
import {getNotes} from "@/lib/content";
import {buildPageMetadata, formatDate} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
  en: {
    title: "Garden",
    description: "Exploratory notes, linked fragments, and thinking in motion from 2zcory Garden.",
    eyebrow: "Garden",
    heroTitle: "Thought in motion.",
    heroBody:
      "This surface holds exploratory notes, linked fragments, and partially resolved ideas that are still earning their final form.",
    asideEyebrow: "Route signal",
    asideTitle: "Raw thinking, still open.",
    asideBody: "Garden is the live edge of the system: fragments first, closure later.",
    metricEntries: "entries",
    metricTopics: "topic tags",
    metricLocales: "active locales",
    openNote: "Open note",
    emptyTitle: "No notes published yet.",
    emptyBody: "The garden surface is ready, but the first exploratory notes have not been published yet."
  },
  vi: {
    title: "Garden",
    description: "Các ghi chú khám phá, mảnh rời có liên kết và suy nghĩ đang chuyển động từ 2zcory Garden.",
    eyebrow: "Garden",
    heroTitle: "Suy nghĩ đang chuyển động.",
    heroBody:
      "Bề mặt này giữ các note khám phá, fragment có liên kết và những ý tưởng mới được giải một phần, vẫn đang đi tới hình thức cuối cùng của chúng.",
    asideEyebrow: "Tín hiệu lối vào",
    asideTitle: "Suy nghĩ thô, vẫn còn mở.",
    asideBody: "Garden là mép sống của hệ thống này: fragment trước, kết luận sau.",
    metricEntries: "mục",
    metricTopics: "nhãn chủ đề",
    metricLocales: "ngôn ngữ hoạt động",
    openNote: "Mở ghi chú",
    emptyTitle: "Chưa có ghi chú nào được xuất bản.",
    emptyBody: "Bề mặt Garden đã sẵn sàng, nhưng những ghi chú khám phá đầu tiên vẫn chưa được xuất bản."
  },
  ja: {
    title: "ガーデン",
    description: "2zcory Garden の探索ノート、つながった断片、動いている思考。",
    eyebrow: "ガーデン",
    heroTitle: "動いている思考。",
    heroBody:
      "この面には、探索ノート、つながった断片、そしてまだ最終形を獲得しつつある途中のアイデアが置かれます。",
    asideEyebrow: "ルートの信号",
    asideTitle: "生の思考、まだ開いている。",
    asideBody: "Garden はこの仕組みの live edge です。fragment が先で、結論は後から来ます。",
    metricEntries: "entries",
    metricTopics: "topic tags",
    metricLocales: "active locales",
    openNote: "ノートを開く",
    emptyTitle: "まだ公開されたノートはありません。",
    emptyBody: "ガーデン面は用意されていますが、最初の探索ノートはまだ公開されていません。"
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

export default async function LocalizedGardenPage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale];
  const notes = getNotes(locale);
  const tCommon = await getTranslations({locale, namespace: "Common"});
  const uniqueTopics = new Set(notes.flatMap((note) => note.topicLabels)).size;

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
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <RouteListCard
              key={note.slug}
              accent="garden"
              index={String(index + 1).padStart(2, "0")}
              title={note.title}
              description={note.summary}
              meta={
                <>
                  <span>{formatDate(note.publishedAt, locale)}</span>
                  {note.topicLabels.map((label) => (
                    <span key={label} className="badge">
                      {label}
                    </span>
                  ))}
                </>
              }
              note={
                locale !== "en" && !note.availableLocales.includes(locale) ? (
                  <p className="locale-note">{tCommon("englishOnly")}</p>
                ) : undefined
              }
              footer={
                <Link href={`/garden/${note.slug}`} className="inline-link">
                  {copy.openNote}
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
