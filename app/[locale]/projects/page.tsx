import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {RouteHero} from "@/components/collection/route-hero";
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
    signalEyebrow: "Route signal",
    signalTitle: "Selected builds, ranked by real weight.",
    signalBody:
      "Projects should read like evidence with hierarchy, not like every entry deserves identical spotlight.",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    ledgerEyebrow: "Current shape",
    ledgerTitle: "Two projects, different weights.",
    ledgerBody:
      "The page should admit the real structure of the work: one lead project, then supporting proof. The list should not pretend every entry carries the same public weight.",
    leadLabel: "Lead",
    supportLabel: "Support",
    leadSummary: "Summary",
    leadEvidence: "Evidence",
    relatedRoutes: "Related routes",
    routeNoteTitle: "Route outward",
    routeNoteBody:
      "Writing and Garden should appear here only as quiet bridges around the project evidence, not as a second navigation system.",
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
    signalEyebrow: "Tín hiệu lối vào",
    signalTitle: "Các build được chọn, xếp theo trọng lượng thật.",
    signalBody:
      "Projects nên đọc như bằng chứng có thứ bậc, không phải như mọi mục đều xứng một mức spotlight ngang nhau.",
    metricEntries: "dự án",
    metricShipped: "đã ship",
    metricActive: "đang active",
    ledgerEyebrow: "Trạng thái hiện tại",
    ledgerTitle: "Hai dự án, hai mức trọng lượng.",
    ledgerBody:
      "Trang nên thừa nhận đúng cấu trúc thật của phần việc: một dự án dẫn đầu, rồi tới các bằng chứng hỗ trợ. Danh sách không nên giả vờ mọi entry đều có cùng trọng lượng công khai.",
    leadLabel: "Dẫn đầu",
    supportLabel: "Hỗ trợ",
    leadSummary: "Tóm tắt",
    leadEvidence: "Bằng chứng",
    relatedRoutes: "Lối vào liên quan",
    routeNoteTitle: "Lối đi tiếp",
    routeNoteBody:
      "Writing và Garden chỉ nên xuất hiện như những cây cầu yên hơn bao quanh bằng chứng dự án, không phải như một hệ điều hướng thứ hai.",
    viewProject: "Xem dự án",
    emptyTitle: "Chưa có dự án nào được liệt kê.",
    emptyBody: "Khu vực này sẽ xuất bản các phần thực thi được chọn khi những mục dự án đầu tiên sẵn sàng."
  },
  ja: {
    title: "プロジェクト",
    description:
      "2zcory Garden の選ばれたプロジェクト。ビルドの判断、tradeoff、結果に焦点を当てる。",
    eyebrow: "プロジェクト",
    heroTitle: "実行の証拠。",
    heroBody:
      "単なる portfolio thumbnail の束ではなく、ビルドの判断、tradeoff、結果を見せるために選ばれたプロジェクトです。重要なのは演出ではなく証拠です。",
    signalEyebrow: "ルートの信号",
    signalTitle: "選ばれた build を、実際の重みで並べる。",
    signalBody:
      "Projects は同じ spotlight を配るのではなく、階層のある evidence として読めるべきです。",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    ledgerEyebrow: "現在の構造",
    ledgerTitle: "二つのプロジェクト、違う重み。",
    ledgerBody:
      "このページは仕事の実際の構造をそのまま見せるべきです。ひとつが先頭に立ち、残りが支える。すべての entry が同じ重みを持つふりをしてはいけません。",
    leadLabel: "主軸",
    supportLabel: "補助",
    leadSummary: "概要",
    leadEvidence: "証拠",
    relatedRoutes: "関連ルート",
    routeNoteTitle: "外へのルート",
    routeNoteBody:
      "Writing と Garden は、プロジェクトの証拠の周囲にある静かな橋としてだけ現れるべきで、第二の navigation system になるべきではありません。",
    viewProject: "プロジェクトを見る",
    emptyTitle: "まだ掲載されたプロジェクトはありません。",
    emptyBody: "最初の project entry が整えば、このセクションに選ばれた execution work が公開されます。"
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
  const projects = getProjects(locale);
  const tCommon = await getTranslations({locale, namespace: "Common"});
  const [leadProject, ...supportProjects] = projects;
  const shippedCount = projects.filter((project) => project.status === "shipped").length;
  const activeCount = projects.filter((project) => project.status === "active").length;

  return (
    <section className="page-stack projects-page route-page route-page-projects">
      <RouteHero
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroBody}
        accent="projects"
        metrics={[
          {label: copy.metricEntries, value: String(projects.length)},
          {label: copy.metricShipped, value: String(shippedCount)},
          {label: copy.metricActive, value: String(activeCount)}
        ]}
        aside={
          <>
            <p className="eyebrow">{copy.signalEyebrow}</p>
            <h2 className="section-heading">{copy.signalTitle}</h2>
            <p className="muted">{copy.signalBody}</p>
          </>
        }
      />
      <div className="projects-ledger-shell">
        {projects.length > 0 ? (
          <>
            <div className="projects-ledger-head surface-card">
              <div>
                <p className="eyebrow">{copy.ledgerEyebrow}</p>
                <h2 className="section-heading">{copy.ledgerTitle}</h2>
              </div>
              <p className="section-intro projects-ledger-copy">{copy.ledgerBody}</p>
            </div>

            {leadProject ? (
              <article className="projects-entry projects-entry-lead">
                <div className="projects-entry-rank">01</div>
                <div className="projects-entry-body">
                  <div className="projects-entry-head">
                    <div>
                      <div className="meta-row projects-entry-meta">
                        <span className="badge">{copy.leadLabel}</span>
                        <span>{leadProject.role}</span>
                      </div>
                      <h2>{leadProject.name}</h2>
                    </div>
                    <p className="muted">{leadProject.problem}</p>
                  </div>

                  <div className="projects-entry-grid">
                    <div className="projects-entry-column">
                      <p className="eyebrow projects-entry-label">{copy.leadSummary}</p>
                      <p className="muted">{leadProject.summary}</p>
                    </div>
                    <div className="projects-entry-column">
                      <p className="eyebrow projects-entry-label">{copy.leadEvidence}</p>
                      <ul className="projects-entry-points">
                        {leadProject.outcomes.map((outcome) => (
                          <li key={outcome}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="projects-entry-column projects-entry-column-route">
                      <p className="eyebrow projects-entry-label">{copy.relatedRoutes}</p>
                      <div className="projects-route-links">
                        {leadProject.links.map((item) => (
                          <Link key={item.href} href={item.href} className="inline-link">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {locale !== "en" && !leadProject.availableLocales.includes(locale) ? (
                    <p className="locale-note projects-entry-note">{tCommon("englishOnly")}</p>
                  ) : null}

                  <Link
                    href={`/projects/${leadProject.slug}`}
                    className="inline-link projects-entry-link"
                  >
                    {copy.viewProject}
                  </Link>
                </div>
              </article>
            ) : null}

            {supportProjects.length > 0 ? (
              <ol className="projects-support-list" start={leadProject ? 2 : 1}>
                {supportProjects.map((project, index) => (
                  <li key={project.slug} className="projects-entry projects-entry-support">
                    <div className="projects-entry-rank">
                      {String(index + (leadProject ? 2 : 1)).padStart(2, "0")}
                    </div>
                    <div className="projects-entry-body">
                      <div className="projects-entry-head">
                        <div>
                          <div className="meta-row projects-entry-meta">
                            <span className="badge projects-badge-muted">{copy.supportLabel}</span>
                            <span>{project.role}</span>
                          </div>
                          <h2>{project.name}</h2>
                        </div>
                        <p className="muted">{project.summary}</p>
                      </div>

                      {locale !== "en" && !project.availableLocales.includes(locale) ? (
                        <p className="locale-note projects-entry-note">
                          {tCommon("englishOnly")}
                        </p>
                      ) : null}

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-link projects-entry-link"
                      >
                        {copy.viewProject}
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}

            <article className="projects-route-note">
              <p className="eyebrow projects-entry-label">{copy.routeNoteTitle}</p>
              <p className="muted">{copy.routeNoteBody}</p>
            </article>
          </>
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
