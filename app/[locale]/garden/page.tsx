import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

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
    openNote: "Open note",
    emptyTitle: "No notes published yet.",
    emptyBody: "The garden surface is ready, but the first exploratory notes have not been published yet."
  },
  vi: {
    title: "Garden",
    description: "Các exploratory note, linked fragment và suy nghĩ đang chuyển động từ 2zcory Garden.",
    eyebrow: "Garden",
    heroTitle: "Suy nghĩ đang chuyển động.",
    heroBody:
      "Bề mặt này giữ các note khám phá, fragment có liên kết và những ý tưởng mới được giải một phần, vẫn đang đi tới hình thức cuối cùng của chúng.",
    openNote: "Mở note",
    emptyTitle: "Chưa có note nào được publish.",
    emptyBody: "Bề mặt garden đã sẵn sàng, nhưng những note khám phá đầu tiên vẫn chưa được publish."
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

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{copy.heroTitle}</h1>
        <p className="page-copy">{copy.heroBody}</p>
      </div>
      <div className="content-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <article key={note.slug} className="content-item">
              <div className="meta-row">
                <span>{formatDate(note.publishedAt, locale)}</span>
                {note.topicLabels.map((label) => (
                  <span key={label} className="badge">
                    {label}
                  </span>
                ))}
              </div>
              <h2>{note.title}</h2>
              <p className="muted">{note.summary}</p>
              {locale === "vi" && !note.availableLocales.includes("vi") ? (
                <p className="locale-note">{tCommon("englishOnly")}</p>
              ) : null}
              <Link href={`/garden/${note.slug}`} className="inline-link">
                {copy.openNote}
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
