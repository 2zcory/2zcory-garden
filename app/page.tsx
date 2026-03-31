import type { Metadata } from "next";
import Link from "next/link";

import { getFeaturedContent } from "@/lib/content";
import { buildPageMetadata, formatDate } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Home",
  description:
    "A public entry point into 2zcory Garden, connecting notes, writing, and selected projects."
});

export default function HomePage() {
  const featured = getFeaturedContent();

  return (
    <div className="page-stack">
      <section className="hero-card home-atlas-shell">
        <div className="home-atlas-grid">
          <section className="home-atlas-copy">
            <div>
              <p className="eyebrow">Public home for thought and execution</p>
              <h1 className="hero-title home-atlas-title">A map for thought that turns into public work.</h1>
              <p className="hero-copy home-atlas-lead">
                2zcory Garden should open like a territory, not like a summary page. The first
                screen should explain the place quickly, then make three routes legible: thinking
                still in motion, writing already shaped, and work already made concrete.
              </p>
            </div>

            <div className="cta-row">
              <Link href="/garden" className="button-link">
                Read the routes
              </Link>
              <Link href="/about" className="button-link secondary">
                Review intent
              </Link>
            </div>

            <section className="home-rule-card">
              <p className="eyebrow">Orientation rule</p>
              <h2 className="section-heading">One site, three ways in.</h2>
              <p className="muted">
                The homepage should orient first. It does not need to explain every content type
                equally, only give visitors a strong first read and an obvious way inward.
              </p>
            </section>
          </section>

          <section className="home-atlas-board">
            <article className="home-route-card home-route-garden">
              <div className="route-label">Route 01 / Garden</div>
              <h2>Notes, fragments, and trails still moving.</h2>
              <p>
                Start at the live edge of ideas. This route holds the unfinished, the connective
                tissue, and the threads that may later harden into essays or project decisions.
              </p>
              <div className="home-route-actions">
                <Link href="/garden" className="route-pill">
                  Open route
                </Link>
                <span className="route-pill route-pill-muted">thought in motion</span>
              </div>
            </article>

            <article className="home-route-card home-route-writing">
              <div className="route-label">Route 02 / Writing</div>
              <h2>Essays and clearer positions after the trail.</h2>
              <p>
                This layer is for visitors who want shaped arguments, clearer conclusions, and the
                more deliberate editorial surface of the site.
              </p>
              <div className="home-route-actions">
                <Link href="/writing" className="route-pill">
                  Open route
                </Link>
                <span className="route-pill route-pill-muted">deliberate pieces</span>
              </div>
            </article>

            <article className="home-route-card home-route-projects">
              <div className="route-label">Route 03 / Projects</div>
              <h2>Builds that prove the thinking can land.</h2>
              <p>
                This route carries execution evidence without flattening the whole site into a
                portfolio wall.
              </p>
              <div className="home-route-actions">
                <Link href="/projects" className="route-pill">
                  Open route
                </Link>
                <span className="route-pill route-pill-muted">proof of work</span>
              </div>
            </article>

            <div className="home-board-caption">
              <strong>Atlas reading rule</strong>
              <span>Read the surface as connected terrain, not as a stack of unrelated modules.</span>
            </div>
          </section>
        </div>
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
