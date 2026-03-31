import type { Metadata } from "next";
import Link from "next/link";

import { getNotes } from "@/lib/content";
import { buildPageMetadata, formatDate } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Garden",
  description:
    "Exploratory notes, linked fragments, and thinking in motion from 2zcory Garden."
});

export default function GardenPage() {
  const notes = getNotes();

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">Garden</p>
        <h1 className="page-title">Thought in motion.</h1>
        <p className="page-copy">
          This surface holds exploratory notes, linked fragments, and partially resolved ideas that
          are still earning their final form.
        </p>
      </div>
      <div className="content-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <article key={note.slug} className="content-item">
              <div className="meta-row">
                <span>{formatDate(note.publishedAt)}</span>
                {note.topicLabels.map((label) => (
                  <span key={label} className="badge">
                    {label}
                  </span>
                ))}
              </div>
              <h2>{note.title}</h2>
              <p className="muted">{note.summary}</p>
              <Link href={`/garden/${note.slug}`} className="inline-link">
                Open note
              </Link>
            </article>
          ))
        ) : (
          <article className="content-item">
            <h2>No notes published yet.</h2>
            <p className="muted">
              The garden surface is ready, but the first exploratory notes have not been published
              yet.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
