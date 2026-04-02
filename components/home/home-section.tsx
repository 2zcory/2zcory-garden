import type {ReactNode} from "react";

type HomeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function HomeSection({eyebrow, title, description, children, className}: HomeSectionProps) {
  return (
    <section className={`home-section-shell${className ? ` ${className}` : ""}`}>
      <header className="home-section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}
