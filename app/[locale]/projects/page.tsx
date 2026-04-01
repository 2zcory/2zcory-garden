import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/routing";
import {getProjects} from "@/lib/content";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
  en: {
    title: "Projects",
    description:
      "Selected projects from 2zcory Garden, focused on build decisions, tradeoffs, and outcomes.",
    eyebrow: "Projects",
    heroTitle: "Execution evidence.",
    heroBody:
      "Selected projects that show build decisions, tradeoffs, and outcomes rather than just a stack of portfolio thumbnails. The point is evidence, not performance.",
    viewProject: "View project",
    emptyTitle: "No projects listed yet.",
    emptyBody: "This section will publish selected execution work once the first project entries are ready."
  },
  vi: {
    title: "Dự án",
    description:
      "Các dự án được chọn từ 2zcory Garden, tập trung vào quyết định build, tradeoff và kết quả.",
    eyebrow: "Dự án",
    heroTitle: "Bằng chứng thực thi.",
    heroBody:
      "Các dự án được chọn để cho thấy quyết định build, tradeoff và kết quả, thay vì chỉ là một chồng portfolio thumbnail. Trọng tâm là bằng chứng, không phải trình diễn.",
    viewProject: "Xem dự án",
    emptyTitle: "Chưa có dự án nào được liệt kê.",
    emptyBody: "Khu vực này sẽ xuất bản các phần execution work được chọn khi những project entry đầu tiên sẵn sàng."
  }
} as const;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = COPY[locale];

  return buildPageMetadata({
    title: copy.title,
    description: copy.description
  });
}

export default async function LocalizedProjectsPage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale];
  const projects = getProjects();
  const tCommon = await getTranslations({locale, namespace: "Common"});

  return (
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{copy.heroTitle}</h1>
        <p className="page-copy">{copy.heroBody}</p>
      </div>
      <div className="content-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article key={project.slug} className="content-item">
              <div className="meta-row">
                <span className="badge">{project.status}</span>
                <span>{project.role}</span>
              </div>
              <h2>{project.name}</h2>
              <p className="muted">{project.summary}</p>
              {locale === "vi" && !project.availableLocales.includes("vi") ? (
                <p className="locale-note">{tCommon("englishOnly")}</p>
              ) : null}
              <Link href={`/projects/${project.slug}`} className="inline-link">
                {copy.viewProject}
              </Link>
            </article>
          ))
        ) : (
          <article className="content-item">
            <h2>{copy.emptyTitle}</h2>
            <p className="muted">{copy.emptyBody}</p>
          </article>
        )}
      </div>
    </section>
  );
}
