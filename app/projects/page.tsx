import type { Metadata } from "next";
import Link from "next/link";

import { getProjects } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description: "Selected projects from 2zcory Garden, focused on build decisions, tradeoffs, and outcomes."
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">Projects</p>
        <h1 className="page-title">Execution evidence.</h1>
        <p className="page-copy">
          Selected projects that show build decisions, tradeoffs, and outcomes rather than just a
          stack of portfolio thumbnails. The point is evidence, not performance.
        </p>
      </div>
      <div className="content-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article key={project.slug} className="content-item">
              <div className="meta-row">
                <span className="badge">{project.status}</span>
                <span>{project.role}</span>
              </div>
              <h2>{project.name}</h2>
              <p className="muted">{project.summary}</p>
              <Link href={`/projects/${project.slug}`} className="inline-link">
                View project
              </Link>
            </article>
          ))
        ) : (
          <article className="content-item">
            <h2>No projects listed yet.</h2>
            <p className="muted">
              This section will publish selected execution work once the first project entries are
              ready.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
