import type { Metadata } from "next";
import Link from "next/link";

import { getProfile } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Direct contact details for thoughtful replies, collaboration, and project discussion."
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
              Collaboration, project discussion, and thoughtful replies are welcome. This surface
              is meant to clarify what kind of outreach fits the site before it exposes any channel
              details.
            </p>
          </div>
          <div className="contact-chip-row">
            <span className="badge">Thoughtful replies</span>
            <span className="badge">Project discussion</span>
            <span className="badge">Public-safe channel policy</span>
          </div>
        </div>
        <aside className="surface-card contact-policy-card">
          <p className="eyebrow">Channel Policy</p>
          <h2 className="section-heading">Direct contact stays intentionally narrow.</h2>
          <p className="muted">
            A direct inbox should appear only when there is a reply path that can actually be
            maintained. Until then, the page should stay honest about the constraint instead of
            pretending a durable channel already exists.
          </p>
        </aside>
      </section>

      <section className="surface-card contact-stage-grid">
        <article className="stack">
          <div>
            <p className="eyebrow">Good Fit</p>
            <h2 className="section-heading">Reach out when the context already connects.</h2>
            <p className="section-intro">
              The strongest messages usually follow material that is already published here:
              something in the garden, a writing piece, or a project that gives the conversation a
              real starting point.
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
              <h3>What is not ready yet</h3>
              <p className="muted">
                A permanent direct inbox is not published right now, so this page should not imply
                guaranteed replies through a hidden or temporary channel.
              </p>
            </article>
          </div>
        </article>

        <aside className="contact-cta-stack">
          {hasDirectContact ? (
            <article className="content-item contact-primary-card">
              <p className="eyebrow">Direct Channel</p>
              <h2 className="section-heading">Email is open for thoughtful outreach.</h2>
              <p className="muted">
                For collaboration, project discussion, or careful replies, use the address below.
              </p>
              <Link href={`mailto:${profile.contactEmail}`} className="button-link contact-action-link">
                {profile.contactEmail}
              </Link>
            </article>
          ) : (
            <article className="content-item contact-primary-card">
              <p className="eyebrow">Best Next Move</p>
              <h2 className="section-heading">Return with context first.</h2>
              <p className="muted">
                If a direct message is not possible yet, the most useful next step is to follow the
                material that explains what kind of work, thinking, or collaboration you want to
                discuss.
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
            <h2 className="section-heading">The page should filter intent, not fake availability.</h2>
            <p className="muted">
              This site is publication-first for now. Contact details will expand only when there
              is a reliable response path worth publishing.
            </p>
          </article>
        </aside>
      </section>
    </div>
  );
}
