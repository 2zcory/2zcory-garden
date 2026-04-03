import type {Metadata} from "next";

import Link from "next/link";

import {RouteHero} from "@/components/collection/route-hero";
import {getProjects} from "@/lib/content";
import {buildPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Selected projects from 2zcory Garden, with enough context to show what was built and what changed because of it."
});

const COPY = {
  eyebrow: "Projects",
  heroTitle: "Start with the project that explains the rest.",
  heroBody:
    "One project does most of the framing work here. The rest show how that way of working appears in public builds.",
  metricEntries: "projects",
  metricShipped: "shipped",
  metricActive: "active",
  leadKick: "Start here",
  leadTitle: "Context OS gives the page its clearest entry point.",
  leadBody:
    "It is the best place to begin because it makes the rest of the project list easier to read.",
  leadLabel: "Lead",
  supportLabel: "Support",
  leadSignals: "What it does",
  leadImpact: "Impact",
  relatedRoutes: "Related routes",
  leadSignalsList: [
    "Persistent AI collaboration",
    "Workflow recovery across sessions",
    "Private execution context with trust boundaries"
  ],
  supportTitle: "Other projects nearby",
  supportBody:
    "These projects matter on their own, but they read best once the lead project has set the frame.",
  viewLeadProject: "Explore Context OS",
  viewLeadProjectHint: "Start here",
  viewSupportProject: "Open project",
  whyToggle: "Why this structure",
  whyTitle: "One project leads, the others stay lighter.",
  whyBody:
    "The first project gets more room so the page is easier to scan. The others stay visible without all asking for the same amount of attention.",
  routeNoteTitle: "Related reading",
  routeNoteBody:
    "Writing and Garden sit nearby for readers who want more context around the work.",
  emptyTitle: "No projects listed yet.",
  emptyBody: "This section will publish selected execution work once the first project entries are ready."
} as const;

export default function ProjectsPage() {
  const projects = getProjects();
  const [leadProject, ...supportProjects] = projects;
  const shippedCount = projects.filter((project) => project.status === "shipped").length;
  const activeCount = projects.filter((project) => project.status === "active").length;

  return (
    <section className="page-stack projects-page route-page route-page-projects">
      <RouteHero
        eyebrow={COPY.eyebrow}
        title={COPY.heroTitle}
        description={COPY.heroBody}
        accent="projects"
        metrics={[
          {label: COPY.metricEntries, value: String(projects.length)},
          {label: COPY.metricShipped, value: String(shippedCount)},
          {label: COPY.metricActive, value: String(activeCount)}
        ]}
        aside={
          <>
            <p className="eyebrow">{COPY.leadKick}</p>
            <h2 className="section-heading">{COPY.leadTitle}</h2>
            <p className="muted">{COPY.leadBody}</p>
          </>
        }
      />

      <div className="projects-ledger-shell">
        {projects.length > 0 ? (
          <>
            {leadProject ? (
              <article className="projects-entry projects-entry-lead">
                <div className="projects-entry-rank">01</div>
                <div className="projects-entry-body">
                  <div className="projects-entry-head">
                    <div>
                      <div className="meta-row projects-entry-meta">
                        <span className="badge">{COPY.leadLabel}</span>
                        <span>{leadProject.role}</span>
                      </div>
                      <h2>{leadProject.name}</h2>
                    </div>
                    <p className="muted">{leadProject.problem}</p>
                  </div>

                  <div className="projects-entry-grid">
                    <div className="projects-entry-column">
                      <p className="eyebrow projects-entry-label">{COPY.leadSignals}</p>
                      <ul className="projects-entry-points">
                        {COPY.leadSignalsList.map((signal) => (
                          <li key={signal}>{signal}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="projects-entry-column">
                      <p className="eyebrow projects-entry-label">{COPY.leadImpact}</p>
                      <ul className="projects-entry-points">
                        {leadProject.outcomes.map((outcome) => (
                          <li key={outcome}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="projects-entry-column projects-entry-column-route">
                      <p className="eyebrow projects-entry-label">{COPY.relatedRoutes}</p>
                      <div className="projects-route-links">
                        {leadProject.links.map((item) => (
                          <Link key={item.href} href={item.href} className="inline-link">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="projects-entry-actions">
                    <span className="projects-entry-hint">{COPY.viewLeadProjectHint}</span>
                    <Link
                      href={`/projects/${leadProject.slug}`}
                      className="inline-link projects-entry-link projects-entry-link-lead"
                    >
                      {COPY.viewLeadProject}
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}

            {supportProjects.length > 0 ? (
              <section className="projects-support-shell">
                <div className="projects-support-head">
                  <p className="eyebrow">{COPY.supportTitle}</p>
                  <p className="muted">{COPY.supportBody}</p>
                </div>
                <ol className="projects-support-list" start={leadProject ? 2 : 1}>
                  {supportProjects.map((project, index) => (
                    <li key={project.slug} className="projects-entry projects-entry-support">
                      <div className="projects-entry-rank">
                        {String(index + (leadProject ? 2 : 1)).padStart(2, "0")}
                      </div>
                      <div className="projects-entry-body">
                        <div className="projects-entry-head">
                          <div>
                            <div className="meta-row projects-entry-meta">
                              <span className="badge projects-badge-muted">
                                {COPY.supportLabel}
                              </span>
                              <span>{project.role}</span>
                            </div>
                            <h2>{project.name}</h2>
                          </div>
                          <p className="muted">{project.summary}</p>
                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-link projects-entry-link"
                        >
                          {COPY.viewSupportProject}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <details className="projects-why-card">
              <summary>{COPY.whyToggle}</summary>
              <div className="projects-why-body">
                <div>
                  <p className="eyebrow projects-entry-label">{COPY.whyTitle}</p>
                  <p className="muted">{COPY.whyBody}</p>
                </div>
                <div className="projects-route-note">
                  <p className="eyebrow projects-entry-label">{COPY.routeNoteTitle}</p>
                  <p className="muted">{COPY.routeNoteBody}</p>
                </div>
              </div>
            </details>
          </>
        ) : (
          <article className="content-item">
            <h2>{COPY.emptyTitle}</h2>
            <p className="muted">{COPY.emptyBody}</p>
          </article>
        )}
      </div>
    </section>
  );
}
