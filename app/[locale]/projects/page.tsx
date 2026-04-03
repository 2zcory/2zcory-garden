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
    heroTitle: "Start with Context OS.",
    heroBody:
      "One project carries the system logic. The rest shows where that logic lands in public work.",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    leadKick: "Start here",
    leadTitle: "Context OS is the center of gravity.",
    leadBody:
      "The operating model comes first. Everything else is easier to read once that system is clear.",
    leadLabel: "Lead",
    supportLabel: "Support",
    leadSignals: "What it does",
    leadImpact: "Impact",
    relatedRoutes: "Related routes",
    leadSignalsList: [
      "Persistent AI collaboration",
      "Workflow recovery across sessions",
      "Private execution context with trust boundaries"
    ],
    supportTitle: "Supporting proof",
    supportBody:
      "These builds show the operating model in use. They support the lead project instead of competing with it.",
    viewLeadProject: "Explore Context OS",
    viewLeadProjectHint: "Start here",
    viewSupportProject: "See supporting proof",
    whyToggle: "Why this structure",
    whyTitle: "Weighted structure, not equal spotlight.",
    whyBody:
      "The page keeps one lead project up front, then compresses the rest into support evidence so the hierarchy is visible before the paragraphs are read.",
    routeNoteTitle: "Quiet bridges",
    routeNoteBody:
      "Writing and Garden stay here as supporting routes around the project system, not as a second navigation layer.",
    emptyTitle: "No projects listed yet.",
    emptyBody: "This section will publish selected execution work once the first project entries are ready."
  },
  vi: {
    title: "Dự án",
    description:
      "Các dự án được chọn từ 2zcory Garden, tập trung vào quyết định build, tradeoff và kết quả.",
    eyebrow: "Dự án",
    heroTitle: "Bắt đầu với Context OS.",
    heroBody:
      "Một dự án giữ logic của cả hệ thống. Phần còn lại cho thấy logic đó hạ xuống thành các bề mặt public như thế nào.",
    metricEntries: "dự án",
    metricShipped: "đã ship",
    metricActive: "đang active",
    leadKick: "Bắt đầu ở đây",
    leadTitle: "Context OS là trọng tâm của hệ thống.",
    leadBody:
      "Mô hình vận hành cần đứng trước. Khi hiểu nó rồi, các build công khai phía sau sẽ đọc nhanh và đúng hơn.",
    leadLabel: "Dẫn đầu",
    supportLabel: "Hỗ trợ",
    leadSignals: "Nó làm gì",
    leadImpact: "Tác động",
    relatedRoutes: "Lối vào liên quan",
    leadSignalsList: [
      "Cộng tác AI bền qua nhiều phiên",
      "Khôi phục workflow khi quay lại việc cũ",
      "Ngữ cảnh thực thi riêng với ranh giới tin cậy rõ ràng"
    ],
    supportTitle: "Bằng chứng hỗ trợ",
    supportBody:
      "Các build này cho thấy mô hình vận hành đang được dùng thật. Chúng hỗ trợ dự án dẫn đầu thay vì tranh spotlight với nó.",
    viewLeadProject: "Khám phá Context OS",
    viewLeadProjectHint: "Bắt đầu ở đây",
    viewSupportProject: "Xem bằng chứng hỗ trợ",
    whyToggle: "Vì sao cấu trúc này",
    whyTitle: "Có trọng lượng rõ ràng, không chia spotlight đều.",
    whyBody:
      "Trang giữ một dự án dẫn đầu ở phía trước, rồi nén phần còn lại thành bằng chứng hỗ trợ để người xem thấy hierarchy trước khi phải đọc các đoạn giải thích.",
    routeNoteTitle: "Những cây cầu yên hơn",
    routeNoteBody:
      "Writing và Garden xuất hiện như các lối nối hỗ trợ quanh hệ dự án, không phải như một tầng điều hướng thứ hai.",
    emptyTitle: "Chưa có dự án nào được liệt kê.",
    emptyBody: "Khu vực này sẽ xuất bản các phần thực thi được chọn khi những mục dự án đầu tiên sẵn sàng."
  },
  ja: {
    title: "プロジェクト",
    description:
      "2zcory Garden の選ばれたプロジェクト。ビルドの判断、tradeoff、結果に焦点を当てる。",
    eyebrow: "プロジェクト",
    heroTitle: "まず Context OS から。",
    heroBody:
      "ひとつの project がシステムの核を持ち、残りがその考え方が public work にどう着地したかを見せます。",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    leadKick: "ここから始める",
    leadTitle: "Context OS が重心です。",
    leadBody:
      "まず operating model を前に出します。それが見えれば、後ろの public build はずっと速く読めます。",
    leadLabel: "主軸",
    supportLabel: "補助",
    leadSignals: "できること",
    leadImpact: "インパクト",
    relatedRoutes: "関連ルート",
    leadSignalsList: [
      "持続する AI collaboration",
      "session をまたぐ workflow recovery",
      "trust boundary を持つ private execution context"
    ],
    supportTitle: "補助となる証拠",
    supportBody:
      "これらの build は operating model が実際に使われていることを示します。主軸と競うのではなく、それを支える位置です。",
    viewLeadProject: "Context OS を見る",
    viewLeadProjectHint: "ここから始める",
    viewSupportProject: "補助の証拠を見る",
    whyToggle: "なぜこの構造か",
    whyTitle: "均等な spotlight ではなく、重みづけされた構造。",
    whyBody:
      "最初に lead project を置き、残りは support evidence として圧縮することで、段落を読む前に hierarchy が見えるようにしています。",
    routeNoteTitle: "静かな橋",
    routeNoteBody:
      "Writing と Garden は project system の周辺にある補助ルートとして置き、第二の navigation layer にはしません。",
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
            <p className="eyebrow">{copy.leadKick}</p>
            <h2 className="section-heading">{copy.leadTitle}</h2>
            <p className="muted">{copy.leadBody}</p>
          </>
        }
      />
      <div className="projects-ledger-shell">
        {projects.length > 0 ? (
          <>
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
                      <p className="eyebrow projects-entry-label">{copy.leadSignals}</p>
                      <ul className="projects-entry-points">
                        {copy.leadSignalsList.map((signal) => (
                          <li key={signal}>{signal}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="projects-entry-column">
                      <p className="eyebrow projects-entry-label">{copy.leadImpact}</p>
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

                  <div className="projects-entry-actions">
                    <span className="projects-entry-hint">{copy.viewLeadProjectHint}</span>
                    <Link
                      href={`/projects/${leadProject.slug}`}
                      className="inline-link projects-entry-link projects-entry-link-lead"
                    >
                      {copy.viewLeadProject}
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}

            {supportProjects.length > 0 ? (
              <section className="projects-support-shell">
                <div className="projects-support-head">
                  <p className="eyebrow">{copy.supportTitle}</p>
                  <p className="muted">{copy.supportBody}</p>
                </div>
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
                        {copy.viewSupportProject}
                      </Link>
                    </div>
                  </li>
                ))}
                </ol>
              </section>
            ) : null}

            <details className="projects-why-card">
              <summary>{copy.whyToggle}</summary>
              <div className="projects-why-body">
                <div>
                  <p className="eyebrow projects-entry-label">{copy.whyTitle}</p>
                  <p className="muted">{copy.whyBody}</p>
                </div>
                <div className="projects-route-note">
                  <p className="eyebrow projects-entry-label">{copy.routeNoteTitle}</p>
                  <p className="muted">{copy.routeNoteBody}</p>
                </div>
              </div>
            </details>
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
