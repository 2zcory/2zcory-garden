import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {Link} from "@/i18n/routing";
import {routing} from "@/i18n/routing";
import type {AppLocale} from "@/i18n/routing";
import {getProject, getProjects} from "@/lib/content";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale; slug: string}>;
};

const COPY = {
  en: {
    fallbackTitle: "Projects",
    fallbackDescription: "Selected projects from 2zcory Garden.",
    eyebrow: "Project",
    problem: "Problem",
    approach: "Approach",
    outcomes: "Outcomes",
    relatedLinks: "Related links",
    noLinks: "No related links published yet."
  },
  vi: {
    fallbackTitle: "Dự án",
    fallbackDescription: "Các dự án được chọn từ 2zcory Garden.",
    eyebrow: "Dự án",
    problem: "Vấn đề",
    approach: "Cách tiếp cận",
    outcomes: "Kết quả",
    relatedLinks: "Liên kết liên quan",
    noLinks: "Chưa có liên kết liên quan nào được publish."
  },
  ja: {
    fallbackTitle: "プロジェクト",
    fallbackDescription: "2zcory Garden の選ばれたプロジェクト。",
    eyebrow: "プロジェクト",
    problem: "課題",
    approach: "アプローチ",
    outcomes: "結果",
    relatedLinks: "関連リンク",
    noLinks: "まだ関連リンクは公開されていません。"
  }
} as const;

export function generateStaticParams() {
  return getProjects().flatMap((project) =>
    routing.locales.map((locale) => ({locale, slug: project.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const project = getProject(slug, locale);
  const copy = COPY[locale];

  if (!project) {
    return buildPageMetadata({
      title: copy.fallbackTitle,
      description: copy.fallbackDescription
    });
  }

  return buildPageMetadata({
    title: project.name,
    description: project.summary
  });
}

export default async function LocalizedProjectDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  const project = getProject(slug, locale);
  const copy = COPY[locale];
  const tCommon = await getTranslations({locale, namespace: "Common"});

  if (!project) {
    notFound();
  }

  return (
    <section className="surface-card detail-grid">
      <article className="stack">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="page-title">{project.name}</h1>
          <div className="meta-row">
            <span className="badge">{project.status}</span>
            <span>{project.role}</span>
          </div>
          {locale !== "en" && !project.availableLocales.includes(locale) ? (
            <p className="locale-note">{tCommon("englishOnly")}</p>
          ) : null}
        </div>
        <div className="detail-body stack">
          <p>{project.summary}</p>
          <div>
            <h2 className="section-heading">{copy.problem}</h2>
            <p className="muted">{project.problem}</p>
          </div>
          <div>
            <h2 className="section-heading">{copy.approach}</h2>
            <p className="muted">{project.approach}</p>
          </div>
        </div>
      </article>
      <aside className="surface-card stack">
        <div>
          <h2 className="section-heading">{copy.outcomes}</h2>
          <ul className="list-reset stack">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="muted">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-heading">{copy.relatedLinks}</h2>
          <div className="aside-list">
            {project.links.length > 0 ? (
              project.links.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))
            ) : (
              <p className="muted">{copy.noLinks}</p>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
}
