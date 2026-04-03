import type {ComponentProps} from "react";

import {Link} from "@/i18n/routing";

type HeroMetric = {
  value: string;
  label: string;
};

type HeroRoute = {
  index: string;
  name: string;
  cue: string;
};

type HomeHeroProps = {
  eyebrow: string;
  headline: string;
  subtext: string;
  supportingLabel: string;
  supportingText: string;
  primaryHref: ComponentProps<typeof Link>["href"];
  primaryLabel: string;
  secondaryHref: ComponentProps<typeof Link>["href"];
  secondaryLabel: string;
  metrics: HeroMetric[];
  routesLabel: string;
  routes: HeroRoute[];
};

export function HomeHero({
  eyebrow,
  headline,
  subtext,
  supportingLabel,
  supportingText,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  metrics,
  routesLabel,
  routes
}: HomeHeroProps) {
  return (
    <section className="hero-card home-hero-shell">
      <div className="home-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="hero-title home-hero-title">{headline}</h1>
        <p className="hero-copy home-hero-subtext">{subtext}</p>

        <div className="home-hero-actions">
          <Link href={primaryHref} className="button-link home-hero-primary">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="button-link secondary home-hero-secondary">
            {secondaryLabel}
          </Link>
        </div>

        <div className="home-hero-support">
          <strong>{supportingLabel}</strong>
          <p>{supportingText}</p>
        </div>
      </div>

      <div className="home-hero-board" aria-label={routesLabel}>
        <div className="home-hero-paths">
          {routes.map((route) => (
            <article key={route.index} className="home-hero-path">
              <span className="home-hero-path-index">{route.index}</span>
              <strong>{route.name}</strong>
              <span>{route.cue}</span>
            </article>
          ))}
        </div>

        <div className="home-hero-metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="home-hero-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
