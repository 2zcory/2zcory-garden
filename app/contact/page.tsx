import type { Metadata } from "next";
import Link from "next/link";

import { getProfile } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "A clear contact page for collaboration, project discussion, and replies that already have context."
});

export default function ContactPage() {
  const profile = getProfile();
  const hasDirectContact = Boolean(profile.contactEmail);

  return (
    <div className="page-stack">
      <section className="surface-card contact-hero-grid">
        <div className="stack">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="page-title">A clear way to reach out.</h1>
            <p className="page-copy">
              Collaboration, project discussion, and thoughtful replies are welcome. The best
              messages usually start from something already published here.
            </p>
          </div>
          <div className="contact-chip-row">
            <span className="badge">Thoughtful replies</span>
            <span className="badge">Project discussion</span>
            <span className="badge">Public-safe channel policy</span>
          </div>
        </div>
        <aside className="surface-card contact-policy-card">
          <p className="eyebrow">How to use this page</p>
          <h2 className="section-heading">Reach out when there is already a real starting point.</h2>
          <p className="muted">
            A note, an essay, or a project usually makes the conversation sharper from the first
            message.
          </p>
        </aside>
      </section>

      <section className="surface-card contact-stage-grid">
        <article className="stack">
          <div>
            <p className="eyebrow">Good Fit</p>
            <h2 className="section-heading">Reach out when the context is already there.</h2>
            <p className="section-intro">
              The strongest messages usually follow material that is already published here:
              something in the garden, a writing piece, or a project that gives the conversation a
              real place to begin.
            </p>
          </div>
          <div className="section-grid contact-intent-grid">
            <article className="content-item">
              <h3>Good reasons to contact</h3>
              <p className="muted">
                Collaboration, project discussion, responses to a specific piece of writing, or a
                concrete follow-up to published work.
              </p>
            </article>
            <article className="content-item">
              <h3>What is not offered here</h3>
              <p className="muted">
                This page does not promise guaranteed replies through hidden, temporary, or
                informal channels.
              </p>
            </article>
          </div>
        </article>

        <aside className="contact-cta-stack">
          {hasDirectContact ? (
            <article className="content-item contact-primary-card">
              <p className="eyebrow">Direct Channel</p>
              <h2 className="section-heading">Email is open for careful outreach.</h2>
              <p className="muted">
                For collaboration, project discussion, or a thoughtful reply, use the address
                below.
              </p>
              <Link href={`mailto:${profile.contactEmail}`} className="button-link contact-action-link">
                {profile.contactEmail}
              </Link>
            </article>
          ) : (
            <article className="content-item contact-primary-card">
              <p className="eyebrow">Best Next Move</p>
              <h2 className="section-heading">Start with the work, then come back.</h2>
              <p className="muted">
                If a direct message is not possible yet, the best next step is to read the
                material closest to what you want to talk about.
              </p>
              <div className="contact-link-list">
                <Link href="/writing" className="button-link secondary contact-action-link">
                  Read writing
                </Link>
                <Link href="/projects" className="button-link secondary contact-action-link">
                  View projects
                </Link>
                <Link href="/garden" className="button-link secondary contact-action-link">
                  Browse garden notes
                </Link>
              </div>
            </article>
          )}

          <article className="content-item">
            <p className="eyebrow">Expectation</p>
            <h2 className="section-heading">Clarity matters more than appearing always available.</h2>
            <p className="muted">
              This site is still publication-first. Contact details should only expand when there
              is a reliable reply path worth publishing.
            </p>
          </article>
        </aside>
      </section>
    </div>
  );
}
