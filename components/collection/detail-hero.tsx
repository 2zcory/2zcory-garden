import type {ReactNode} from "react";

type Accent = "garden" | "writing" | "projects";

type DetailHeroProps = {
  accent: Accent;
  eyebrow: string;
  title: string;
  summary: string;
  meta: ReactNode;
  note?: ReactNode;
  aside: ReactNode;
};

export function DetailHero({
  accent,
  eyebrow,
  title,
  summary,
  meta,
  note,
  aside
}: DetailHeroProps) {
  return (
    <section className={`detail-hero-shell detail-hero-${accent}`}>
      <div className="detail-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title detail-hero-title">{title}</h1>
        <p className="page-copy detail-hero-summary">{summary}</p>
        <div className="meta-row detail-hero-meta">{meta}</div>
        {note ? <div className="detail-hero-note">{note}</div> : null}
      </div>
      <aside className="detail-hero-aside">{aside}</aside>
    </section>
  );
}
