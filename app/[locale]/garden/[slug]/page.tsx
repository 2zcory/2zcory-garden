import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {DetailHero} from "@/components/collection/detail-hero";
import {Link} from "@/i18n/routing";
import {routing} from "@/i18n/routing";
import type {AppLocale} from "@/i18n/routing";
import {getNote, getNotes} from "@/lib/content";
import {buildPageMetadata, formatDate} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale; slug: string}>;
};

const COPY = {
  en: {
    fallbackTitle: "Garden Note",
    fallbackDescription: "Exploratory note from 2zcory Garden.",
    eyebrow: "Garden note",
    signalEyebrow: "Route signal",
    signalTitle: "A note before it hardens into an essay.",
    signalBody:
      "Garden entries keep the connective tissue visible instead of pretending the conclusion arrived fully formed.",
    related: "Related notes",
    noRelated: "No linked notes yet."
  },
  vi: {
    fallbackTitle: "Ghi chú Garden",
    fallbackDescription: "Ghi chú khám phá từ 2zcory Garden.",
    eyebrow: "Ghi chú Garden",
    signalEyebrow: "Tín hiệu lối vào",
    signalTitle: "Một ghi chú trước khi nó cứng lại thành bài viết.",
    signalBody:
      "Mỗi mục trong Garden giữ phần liên kết còn nhìn thấy được, thay vì giả vờ kết luận đã đến hoàn chỉnh.",
    related: "Các ghi chú liên quan",
    noRelated: "Chưa có ghi chú liên kết nào."
  },
  ja: {
    fallbackTitle: "ガーデンノート",
    fallbackDescription: "2zcory Garden の探索ノート。",
    eyebrow: "ガーデンノート",
    signalEyebrow: "ルートの信号",
    signalTitle: "essay に固まる前のノート。",
    signalBody:
      "Garden entry は、結論が完成していたかのように見せず、connective tissue を残します。",
    related: "関連ノート",
    noRelated: "まだ関連ノートはありません。"
  }
} as const;

export function generateStaticParams() {
  return getNotes().flatMap((note) =>
    routing.locales.map((locale) => ({locale, slug: note.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const note = getNote(slug, locale);
  const copy = COPY[locale];

  if (!note) {
    return buildPageMetadata({
      title: copy.fallbackTitle,
      description: copy.fallbackDescription,
      locale,
      pathname: `/garden/${slug}`
    });
  }

  return buildPageMetadata({
    title: note.title,
    description: note.summary,
    locale,
    pathname: `/garden/${slug}`
  });
}

export default async function LocalizedGardenDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  const note = getNote(slug, locale);
  const copy = COPY[locale];
  const tCommon = await getTranslations({locale, namespace: "Common"});

  if (!note) {
    notFound();
  }

  const related = note.relatedNoteSlugs
    .map((relatedSlug) => getNote(relatedSlug, locale))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <section className="page-stack detail-page detail-page-garden">
      <DetailHero
        accent="garden"
        eyebrow={copy.eyebrow}
        title={note.title}
        summary={note.summary}
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
        aside={
          <>
            <p className="eyebrow">{copy.signalEyebrow}</p>
            <h2 className="section-heading">{copy.signalTitle}</h2>
            <p className="muted">{copy.signalBody}</p>
          </>
        }
      />
      <div className="detail-grid detail-grid-page">
        <article className="surface-card detail-article-card">
          <div className="detail-body stack">
            {note.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <aside className="surface-card detail-side-card">
          <h2 className="section-heading">{copy.related}</h2>
          <div className="aside-list">
            {related.length > 0 ? (
              related.map((entry) => (
                <Link key={entry.slug} href={`/garden/${entry.slug}`}>
                  {entry.title}
                </Link>
              ))
            ) : (
              <p className="muted">{copy.noRelated}</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
