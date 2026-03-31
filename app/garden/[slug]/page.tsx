import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNote, getNotes } from "@/lib/content";
import { buildPageMetadata, formatDate } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return buildPageMetadata({
      title: "Garden Note",
      description: "Exploratory note from 2zcory Garden."
    });
  }

  return buildPageMetadata({
    title: note.title,
    description: note.summary
  });
}

export default async function GardenDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  const related = note.relatedNoteSlugs
    .map((relatedSlug) => getNote(relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <section className="page-stack">
      <div className="surface-card detail-grid">
        <article className="stack">
          <div>
            <p className="eyebrow">Garden note</p>
            <h1 className="page-title">{note.title}</h1>
            <div className="meta-row">
              <span>{formatDate(note.publishedAt)}</span>
              {note.topicLabels.map((label) => (
                <span key={label} className="badge">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-body stack">
            {note.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <aside className="surface-card">
          <h2 className="section-heading">Related notes</h2>
          <div className="aside-list">
            {related.length > 0 ? (
              related.map((entry) => (
                <Link key={entry.slug} href={`/garden/${entry.slug}`}>
                  {entry.title}
                </Link>
              ))
            ) : (
              <p className="muted">No linked notes yet.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
