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
      "Selected projects from 2zcory Garden, with enough context to show what was built and what changed because of it.",
    eyebrow: "Projects",
    heroTitle: "Start with the project that explains the rest.",
    heroBody:
      "One project does most of the framing work here. The rest show how that way of working appears in public builds.",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    leadKick: "Start here",
    leadTitle: "Context OS gives the page its clearest entry point.",
    leadBody:
      "It is the best place to begin because it makes the rest of the project list easier to read.",
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
    supportTitle: "Other projects nearby",
    supportBody:
      "These projects matter on their own, but they read best once the lead project has set the frame.",
    viewLeadProject: "Explore Context OS",
    viewLeadProjectHint: "Start here",
    viewSupportProject: "Open project",
    whyToggle: "Why this structure",
    whyTitle: "One project leads, the others stay lighter.",
    whyBody:
      "The first project gets more room so the page is easier to scan. The others stay visible without all asking for the same amount of attention.",
    routeNoteTitle: "Related reading",
    routeNoteBody:
      "Writing and Garden sit nearby for readers who want more context around the work.",
    emptyTitle: "No projects listed yet.",
    emptyBody: "This section will publish selected execution work once the first project entries are ready."
  },
  vi: {
    title: "Dự án",
    description:
      "Các dự án được chọn từ 2zcory Garden, với đủ bối cảnh để thấy đã làm gì và nó thay đổi điều gì.",
    eyebrow: "Dự án",
    heroTitle: "Bắt đầu từ dự án giúp đọc phần còn lại rõ nhất.",
    heroBody:
      "Một dự án giữ phần khung chính của trang này. Những dự án còn lại cho thấy cách làm đó xuất hiện trong các build công khai.",
    metricEntries: "dự án",
    metricShipped: "đã ship",
    metricActive: "đang active",
    leadKick: "Bắt đầu ở đây",
    leadTitle: "Context OS là lối vào rõ nhất của trang này.",
    leadBody:
      "Nên bắt đầu ở đây trước, vì sau đó phần còn lại của danh sách dự án sẽ dễ đọc hơn nhiều.",
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
    supportTitle: "Những dự án ở gần",
    supportBody:
      "Các dự án này vẫn quan trọng theo cách riêng của chúng, nhưng chúng đọc rõ nhất sau khi dự án dẫn đã đặt xong khung nhìn.",
    viewLeadProject: "Khám phá Context OS",
    viewLeadProjectHint: "Bắt đầu ở đây",
    viewSupportProject: "Mở dự án",
    whyToggle: "Vì sao cấu trúc này",
    whyTitle: "Một dự án dẫn, phần còn lại nhẹ hơn.",
    whyBody:
      "Dự án đầu được cho thêm không gian để trang dễ quét hơn. Các dự án còn lại vẫn hiện ra, nhưng không đòi cùng một lượng chú ý.",
    routeNoteTitle: "Đọc thêm quanh đây",
    routeNoteBody:
      "Writing và Garden nằm gần đó cho người muốn thêm bối cảnh quanh phần việc.",
    emptyTitle: "Chưa có dự án nào được liệt kê.",
    emptyBody: "Khu vực này sẽ xuất bản các phần thực thi được chọn khi những mục dự án đầu tiên sẵn sàng."
  },
  ja: {
    title: "プロジェクト",
    description:
      "2zcory Garden で公開しているプロジェクトを、何を作り何が変わったかが読める形で並べたページ。",
    eyebrow: "プロジェクト",
    heroTitle: "まず、ほかを読みやすくする一本から。",
    heroBody:
      "一本の project がこのページの入口になります。残りは、その仕事の進め方が公開された build にどう表れるかを見せます。",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    leadKick: "ここから始める",
    leadTitle: "Context OS がいちばん入りやすい出発点です。",
    leadBody:
      "先にここを読むと、後ろに続く project がずっとわかりやすくなります。",
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
    supportTitle: "近くにあるほかのプロジェクト",
    supportBody:
      "これらの project もそれぞれ重要ですが、先頭の一本を読んだあとに見ると位置づけがつかみやすくなります。",
    viewLeadProject: "Context OS を見る",
    viewLeadProjectHint: "ここから始める",
    viewSupportProject: "プロジェクトを見る",
    whyToggle: "なぜこの構造か",
    whyTitle: "一本を先に、ほかは少し軽く。",
    whyBody:
      "最初の project に少し広さを持たせることで、ページ全体が読みやすくなります。ほかの project も見えたままですが、同じ強さでは前に出ません。",
    routeNoteTitle: "関連する読みもの",
    routeNoteBody:
      "Writing と Garden は、仕事の周辺にある文脈を読みたい人のために近くに置いています。",
    emptyTitle: "まだ掲載されたプロジェクトはありません。",
    emptyBody: "最初の project entry が整えば、このセクションに選ばれた execution work が公開されます。"
  }
} as const;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = COPY[locale];

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    locale,
    pathname: "/projects"
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
