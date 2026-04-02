import {Link} from "@/i18n/routing";

type HomeFeaturedItem = {
  slug: string;
  title: string;
  summary: string;
  meta?: string;
  badges?: string[];
  href: string;
  localeNote?: string;
};

type HomeFeaturedSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: HomeFeaturedItem[];
  emptyTitle: string;
  emptyBody: string;
  emptyHref: string;
  emptyCta: string;
  itemCta: string;
};

export function HomeFeaturedSection({
  eyebrow,
  title,
  description,
  items,
  emptyTitle,
  emptyBody,
  emptyHref,
  emptyCta,
  itemCta
}: HomeFeaturedSectionProps) {
  return (
    <section className="home-featured-column">
      <header className="home-featured-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>

      <div className="home-featured-list">
        {items.length > 0 ? (
          items.map((item) => (
            <article key={item.slug} className="home-featured-item">
              {item.localeNote ? <p className="locale-note">{item.localeNote}</p> : null}
              {item.meta || item.badges?.length ? (
                <div className="home-featured-meta">
                  {item.meta ? <span>{item.meta}</span> : null}
                  {item.badges?.map((badge) => (
                    <span key={badge} className="badge">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
              <h4>{item.title}</h4>
              <p>{item.summary}</p>
              <Link href={item.href} className="inline-link">
                {itemCta}
              </Link>
            </article>
          ))
        ) : (
          <article className="home-featured-item">
            <h4>{emptyTitle}</h4>
            <p>{emptyBody}</p>
            <Link href={emptyHref} className="inline-link">
              {emptyCta}
            </Link>
          </article>
        )}
      </div>
    </section>
  );
}
