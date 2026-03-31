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

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">A clear way to reach out.</h1>
        <p className="page-copy">
          Contact stays intentionally narrow: only channels that can actually be monitored and
          replied to consistently belong here.
        </p>
      </div>
      <div className="content-item">
        <h2>Email</h2>
        {profile.contactEmail ? (
          <>
            <p className="muted">
              For collaboration, project discussion, or thoughtful replies, use the address below.
            </p>
            <Link href={`mailto:${profile.contactEmail}`} className="inline-link">
              {profile.contactEmail}
            </Link>
          </>
        ) : (
          <p className="muted">
            A direct contact channel is not published yet. For now, the site stays publication
            first; contact details will be added once there is a reliable reply path to maintain.
          </p>
        )}
      </div>
    </section>
  );
}
