import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

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
    related: "Related notes",
    noRelated: "No linked notes yet."
  },
  vi: {
    fallbackTitle: "Garden note",
    fallbackDescription: "Exploratory note từ 2zcory Garden.",
    eyebrow: "Garden note",
    related: "Các note liên quan",
    noRelated: "Chưa có linked note nào."
  },
  ja: {
    fallbackTitle: "ガーデンノート",
    fallbackDescription: "2zcory Garden の探索ノート。",
    eyebrow: "ガーデンノート",
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
      description: copy.fallbackDescription
    });
  }

  return buildPageMetadata({
    title: note.title,
    description: note.summary
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
    <section className="page-stack">
      <div className="surface-card detail-grid">
        <article className="stack">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="page-title">{note.title}</h1>
            <div className="meta-row">
              <span>{formatDate(note.publishedAt, locale)}</span>
              {note.topicLabels.map((label) => (
                <span key={label} className="badge">
                  {label}
                </span>
              ))}
            </div>
            {locale !== "en" && !note.availableLocales.includes(locale) ? (
              <p className="locale-note">{tCommon("englishOnly")}</p>
            ) : null}
          </div>
          <div className="detail-body stack">
            {note.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <aside className="surface-card">
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
