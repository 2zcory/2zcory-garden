import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticle, getArticles } from "@/lib/content";
import { buildPageMetadata, formatDate } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return buildPageMetadata({
      title: "Writing",
      description: "Deliberate writing from 2zcory Garden."
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">Writing</p>
        <h1 className="page-title">{article.title}</h1>
        <div className="meta-row">
          <span>{formatDate(article.publishedAt)}</span>
          <span className="badge">{article.theme}</span>
        </div>
      </div>
      <div className="detail-body stack">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
