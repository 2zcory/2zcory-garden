import type {ReactNode} from "react";

type Accent = "garden" | "writing" | "projects";

type RouteListCardProps = {
  accent: Accent;
  index: string;
  title: string;
  description: string;
  meta: ReactNode;
  footer?: ReactNode;
  note?: ReactNode;
};

export function RouteListCard({
  accent,
  index,
  title,
  description,
  meta,
  footer,
  note
}: RouteListCardProps) {
  return (
    <article className={`route-list-card route-list-card-${accent}`}>
      <div className="route-list-head">
        <span className="route-list-index">{index}</span>
        <div className="route-list-meta">{meta}</div>
      </div>
      <div className="route-list-body">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {note ? <div className="route-list-note">{note}</div> : null}
      {footer ? <div className="route-list-footer">{footer}</div> : null}
    </article>
  );
}
