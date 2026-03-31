import type { Metadata } from "next";
import Link from "next/link";

import { getFeaturedContent, getProfile } from "@/lib/content";
import { buildPageMetadata, formatDate } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Home",
  description:
    "A public entry point into 2zcory Garden, connecting notes, writing, and selected projects."
});

export default function HomePage() {
  const profile = getProfile();
  const featured = getFeaturedContent();

  return (
    <div className="page-stack">
      <section className="hero-card hero-grid">
        <div>
          <p className="eyebrow">Public home for thought and execution</p>
          <h1 className="hero-title">A living site for notes, writing, and proof of work.</h1>
          <p className="hero-copy">
            2zcory Garden is not a portfolio shell and not just a blog. It is a public place
            where exploratory notes, shaped writing, and selected projects can point to each
            other, accumulate over time, and make the larger direction of the work easier to read.
          </p>
          <div className="cta-row">
            <Link href="/garden" className="button-link">
              Enter the garden
            </Link>
            <Link href="/writing" className="button-link secondary">
              Read the writing
            </Link>
          </div>
        </div>
        <div className="surface-card stack">
          <p className="eyebrow">Current focus</p>
          <h2 className="section-heading">{profile.descriptor}</h2>
          <ul className="list-reset stack">
            {profile.currentFocus.map((item) => (
              <li key={item} className="muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-grid">
        <article className="surface-card">
          <p className="eyebrow">Garden</p>
          <h2 className="section-heading">Thought in motion</h2>
          <p className="section-intro">
            Notes, fragments, and trails that show how ideas evolve before they harden into essays
            or project decisions.
          </p>
          <Link href="/garden" className="inline-link">
            Browse notes
          </Link>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Writing</p>
          <h2 className="section-heading">Deliberate output</h2>
          <p className="section-intro">
            More self-contained arguments, essays, and positions shaped out of the ongoing note
            stream.
          </p>
          <Link href="/writing" className="inline-link">
            Open essays
          </Link>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Projects</p>
          <h2 className="section-heading">Execution evidence</h2>
          <p className="section-intro">
            Selected builds and systems that show how ideas turn into concrete work.
          </p>
          <Link href="/projects" className="inline-link">
            View projects
          </Link>
        </article>
      </section>

      <section className="surface-card">
        <p className="eyebrow">Featured trails</p>
        <div className="content-list">
          {featured.notes.length > 0 ? (
            featured.notes.map((note) => (
              <article key={note.slug} className="content-item">
                <div className="meta-row">
                  <span>{formatDate(note.publishedAt)}</span>
                  {note.topicLabels.map((label) => (
                    <span key={label} className="badge">
                      {label}
                    </span>
                  ))}
                </div>
                <h3>{note.title}</h3>
                <p className="muted">{note.summary}</p>
                <Link href={`/garden/${note.slug}`} className="inline-link">
                  Read note
                </Link>
              </article>
            ))
          ) : (
            <article className="content-item">
              <h3>No featured notes yet.</h3>
              <p className="muted">
                The garden will appear here once the first notes are selected for the home surface.
              </p>
              <Link href="/garden" className="inline-link">
                Visit the garden
              </Link>
            </article>
          )}
        </div>
      </section>

      <section className="section-grid">
        <article className="surface-card stack">
          <p className="eyebrow">Featured writing</p>
          {featured.articles.length > 0 ? (
            featured.articles.map((article) => (
              <div key={article.slug}>
                <h3>{article.title}</h3>
                <p className="muted">{article.excerpt}</p>
                <Link href={`/writing/${article.slug}`} className="inline-link">
                  Read article
                </Link>
              </div>
            ))
          ) : (
            <div>
              <h3>No featured writing yet.</h3>
              <p className="muted">
                Shaped essays will appear here once the first writing pieces are ready for the home
                surface.
              </p>
              <Link href="/writing" className="inline-link">
                Browse writing
              </Link>
            </div>
          )}
        </article>
        <article className="surface-card stack">
          <p className="eyebrow">Selected projects</p>
          {featured.projects.length > 0 ? (
            featured.projects.map((project) => (
              <div key={project.slug}>
                <h3>{project.name}</h3>
                <p className="muted">{project.summary}</p>
                <Link href={`/projects/${project.slug}`} className="inline-link">
                  Open project
                </Link>
              </div>
            ))
          ) : (
            <div>
              <h3>No selected projects yet.</h3>
              <p className="muted">
                This section will point to public execution evidence once project entries are ready.
              </p>
              <Link href="/projects" className="inline-link">
                View all projects
              </Link>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
