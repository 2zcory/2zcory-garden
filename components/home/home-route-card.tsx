import type {ComponentProps} from "react";

import {Link} from "@/i18n/routing";

type RouteAccent = "garden" | "writing" | "projects";

type HomeRouteCardProps = {
  index: string;
  routeName: string;
  title: string;
  description: string;
  cue: string;
  countLabel: string;
  countValue: string;
  href: ComponentProps<typeof Link>["href"];
  cta: string;
  accent: RouteAccent;
};

export function HomeRouteCard({
  index,
  routeName,
  title,
  description,
  cue,
  countLabel,
  countValue,
  href,
  cta,
  accent
}: HomeRouteCardProps) {
  return (
    <article className={`home-route-panel home-route-panel-${accent}`}>
      <div className="home-route-topline">
        <span className="home-route-index">{index}</span>
        <span className="home-route-name">{routeName}</span>
      </div>

      <div className="home-route-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="home-route-meta">
        <span className="home-route-cue">{cue}</span>
        <div className="home-route-count">
          <strong>{countValue}</strong>
          <span>{countLabel}</span>
        </div>
      </div>

      <Link href={href} className="home-route-cta">
        {cta}
      </Link>
    </article>
  );
}
