import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {DetailHero} from "@/components/collection/detail-hero";
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
    signalEyebrow: "How to read this page",
    signalTitle: "Start with the pressure, then read what survived execution.",
    signalBody:
      "This page should read like one proof document: what was hard, how the work answered it, and what remained true after delivery.",
    pressure: "What was hard",
    pressureTitle: "The pressure this project had to answer",
    handling: "Chosen move",
    handlingTitle: "How the work responded",
    proof: "What survived execution",
    proofTitle: "Evidence that stayed true after delivery",
    bridges: "Where to go next",
    bridgesTitle: "Related reading around this project",
    noLinks: "No related links published yet."
  },
  vi: {
    fallbackTitle: "Dự án",
    fallbackDescription: "Các dự án được chọn từ 2zcory Garden.",
    eyebrow: "Dự án",
    signalEyebrow: "Cách đọc trang này",
    signalTitle: "Bắt đầu từ áp lực thật, rồi đọc thứ gì đã sống sót sau phần thực thi.",
    signalBody:
      "Trang này nên đọc như một proof document: điều gì thật sự khó, công việc đã đáp lại ra sao, và điều gì còn đứng vững sau delivery.",
    pressure: "Điều thật sự khó",
    pressureTitle: "Áp lực mà dự án này phải đáp lại",
    handling: "Cách xử lý",
    handlingTitle: "Công việc đã đáp lại như thế nào",
    proof: "Thứ còn đứng vững sau thực thi",
    proofTitle: "Những dấu hiệu còn giữ được sau delivery",
    bridges: "Đi tiếp từ đây",
    bridgesTitle: "Những lối đọc tiếp quanh dự án này",
    noLinks: "Chưa có liên kết liên quan nào được publish."
  },
  ja: {
    fallbackTitle: "プロジェクト",
    fallbackDescription: "2zcory Garden の選ばれたプロジェクト。",
    eyebrow: "プロジェクト",
    signalEyebrow: "このページの読み方",
    signalTitle: "まず本当の圧力を見て、そのあと実行を通って残ったものを読む。",
    signalBody:
      "このページは一つの proof document として読むべきです。何が難しかったのか、その仕事がどう応えたのか、そして delivery のあとに何が残ったのかを見せます。",
    pressure: "本当に難しかったこと",
    pressureTitle: "このプロジェクトが受け止める必要のあった圧力",
    handling: "選んだ動き",
    handlingTitle: "その圧力にどう応えたか",
    proof: "実行を通って残ったもの",
    proofTitle: "delivery のあとでも残った証拠",
    bridges: "ここから先へ",
    bridgesTitle: "このプロジェクトの周りにある読みもの",
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
      description: copy.fallbackDescription,
      locale,
      pathname: `/projects/${slug}`
    });
  }

  return buildPageMetadata({
    title: project.name,
    description: project.summary,
    locale,
    pathname: `/projects/${slug}`
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
    <section className="page-stack detail-page detail-page-projects">
      <DetailHero
        accent="projects"
        eyebrow={copy.eyebrow}
        title={project.name}
        summary={project.summary}
        meta={
          <>
            <span className="badge">{project.status}</span>
            <span>{project.role}</span>
          </>
        }
        note={
          locale !== "en" && !project.availableLocales.includes(locale) ? (
            <p className="locale-note">{tCommon("englishOnly")}</p>
          ) : undefined
        }
        aside={
          <>
            <p className="eyebrow">{copy.signalEyebrow}</p>
            <h2 className="section-heading">{copy.signalTitle}</h2>
            <p className="muted">{copy.signalBody}</p>
          </>
        }
      />
      <article className="surface-card project-detail-pressure-card">
        <div className="project-detail-intro">
          <p className="eyebrow">{copy.pressure}</p>
          <h2 className="section-heading project-detail-heading">{copy.pressureTitle}</h2>
        </div>
        <p className="project-detail-lead">{project.problem}</p>
      </article>

      <div className="project-detail-grid">
        <article className="surface-card project-detail-response-card">
          <div className="project-detail-intro">
            <p className="eyebrow">{copy.handling}</p>
            <h2 className="section-heading project-detail-heading">{copy.handlingTitle}</h2>
          </div>
          <div className="detail-body stack">
            <p>{project.approach}</p>
          </div>
        </article>

        <aside className="surface-card project-detail-proof-card">
          <div className="project-detail-intro">
            <p className="eyebrow">{copy.proof}</p>
            <h2 className="section-heading project-detail-heading">{copy.proofTitle}</h2>
          </div>
          <ul className="list-reset project-detail-proof-list">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="project-detail-proof-item">
                {outcome}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="surface-card project-detail-bridges-card">
        <div className="project-detail-intro">
          <p className="eyebrow">{copy.bridges}</p>
          <h2 className="section-heading project-detail-heading">{copy.bridgesTitle}</h2>
        </div>
        <div className="project-detail-bridges-list">
          {project.links.length > 0 ? (
            project.links.map((item) => (
              <Link key={item.href} href={item.href} className="inline-link project-detail-bridge-link">
                {item.label}
              </Link>
            ))
          ) : (
            <p className="muted">{copy.noLinks}</p>
          )}
        </div>
      </section>
    </section>
  );
}
