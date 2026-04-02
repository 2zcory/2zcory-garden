import type {ReactNode} from "react";

type Accent = "garden" | "writing" | "projects";

type Metric = {
  label: string;
  value: string;
};

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent: Accent;
  metrics: Metric[];
  aside: ReactNode;
};

export function RouteHero({eyebrow, title, description, accent, metrics, aside}: RouteHeroProps) {
  return (
    <section className={`route-hero-shell route-hero-${accent}`}>
      <div className="route-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title route-hero-title">{title}</h1>
        <p className="page-copy route-hero-body">{description}</p>
      </div>

      <div className="route-hero-side">
        <div className="route-hero-aside">{aside}</div>
        <div className="route-hero-metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="route-hero-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
