import type { Metadata } from "next";

import { getProfile } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Background, intent, and product framing for 2zcory Garden as a public home for thought and execution."
});

export default function AboutPage() {
  const profile = getProfile();

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">About</p>
        <h1 className="page-title">{profile.name}</h1>
        <p className="page-copy">{profile.descriptor}</p>
      </div>
      <div className="stack">
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className="detail-body">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="divider" />
      <div className="stack">
        <h2 className="section-heading">What this site is for</h2>
        <p className="muted">
          It is a durable public home where exploratory thought, deliberate writing, and selected
          project work can remain connected instead of being split into disconnected identity
          surfaces. The point is not constant self-presentation. The point is to leave behind a
          legible body of work.
        </p>
      </div>
    </section>
  );
}
