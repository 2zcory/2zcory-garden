import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, getProjects } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Projects",
      description: "Selected projects from 2zcory Garden."
    });
  }

  return buildPageMetadata({
    title: project.name,
    description: project.summary
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="surface-card detail-grid">
      <article className="stack">
        <div>
          <p className="eyebrow">Project</p>
          <h1 className="page-title">{project.name}</h1>
          <div className="meta-row">
            <span className="badge">{project.status}</span>
            <span>{project.role}</span>
          </div>
        </div>
        <div className="detail-body stack">
          <p>{project.summary}</p>
          <div>
            <h2 className="section-heading">Problem</h2>
            <p className="muted">{project.problem}</p>
          </div>
          <div>
            <h2 className="section-heading">Approach</h2>
            <p className="muted">{project.approach}</p>
          </div>
        </div>
      </article>
      <aside className="surface-card stack">
        <div>
          <h2 className="section-heading">Outcomes</h2>
          <ul className="list-reset stack">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="muted">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-heading">Related links</h2>
          <div className="aside-list">
            {project.links.length > 0 ? (
              project.links.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))
            ) : (
              <p className="muted">No related links published yet.</p>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
}
