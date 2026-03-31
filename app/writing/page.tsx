import type { Metadata } from "next";
import Link from "next/link";

import { getArticles } from "@/lib/content";
import { buildPageMetadata, formatDate } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Writing",
  description: "Essays and shaped writing from 2zcory Garden."
});

export default function WritingPage() {
  const articles = getArticles();

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">Writing</p>
        <h1 className="page-title">Deliberate output.</h1>
        <p className="page-copy">
          Essays and shaped pieces that carry a stronger argument, conclusion, or editorial form
          than the garden trail they may have started from.
        </p>
      </div>
      <div className="content-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.slug} className="content-item">
              <div className="meta-row">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="badge">{article.theme}</span>
              </div>
              <h2>{article.title}</h2>
              <p className="muted">{article.excerpt}</p>
              <Link href={`/writing/${article.slug}`} className="inline-link">
                Read article
              </Link>
            </article>
          ))
        ) : (
          <article className="content-item">
            <h2>No writing published yet.</h2>
            <p className="muted">
              This section is ready for essays, but the first shaped pieces have not been added yet.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
