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
      "Selected projects from 2zcory Garden where the thinking has already met execution and survived contact with reality.",
    eyebrow: "Projects",
    heroTitle: "Where the thinking has already met execution.",
    heroBody:
      "Projects is the part of the site where the ideas have already been forced through delivery. The lead project gives the clearest proof point, and the rest show how that public practice survives in different builds.",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    leadKick: "Start with the clearest proof",
    leadTitle: "One project should make the rest of the page easier to read.",
    leadBody:
      "The lead project carries the strongest example of how thought becomes concrete work. The rest read faster once that frame is clear.",
    leadLabel: "Lead",
    supportLabel: "Support",
    leadSignals: "What survived execution",
    leadImpact: "What changed because of it",
    relatedRoutes: "Follow the thinking outward",
    leadSignalsList: [
      "Persistent AI collaboration",
      "Workflow recovery across sessions",
      "Private execution context with trust boundaries"
    ],
    supportTitle: "Other projects nearby",
    supportBody:
      "These projects matter on their own, but they read best once the lead project has shown the standard: ideas are not enough until they survive implementation.",
    viewLeadProject: "Explore the lead project",
    viewLeadProjectHint: "Start with the clearest proof",
    viewSupportProject: "Open project",
    whyToggle: "Why this structure",
    whyTitle: "One project leads because proof reads best with one clear entry point.",
    whyBody:
      "The first project gets more room so the route can prove something quickly. The others stay visible without all demanding the same amount of attention.",
    routeNoteTitle: "Related reading",
    routeNoteBody:
      "Garden shows the work before it settles. Writing shows it once the claim becomes clearer. Projects shows what made it through delivery.",
    emptyTitle: "No projects listed yet.",
    emptyBody: "This section will publish selected execution work once the first project entries are ready."
  },
  vi: {
    title: "Dự án",
    description:
      "Những dự án được chọn từ 2zcory Garden nơi ý đã thật sự gặp phần thực thi và sống sót qua va chạm với thực tế.",
    eyebrow: "Dự án",
    heroTitle: "Nơi ý đã thật sự gặp phần thực thi.",
    heroBody:
      "Projects là phần của site nơi ý tưởng đã bị ép đi qua delivery. Dự án dẫn cho thấy proof rõ nhất, còn phần còn lại cho thấy practice đó sống sót ra sao trong nhiều build khác nhau.",
    metricEntries: "dự án",
    metricShipped: "đã ship",
    metricActive: "đang active",
    leadKick: "Bắt đầu từ proof rõ nhất",
    leadTitle: "Một dự án nên khiến phần còn lại của trang dễ đọc hơn.",
    leadBody:
      "Dự án dẫn giữ ví dụ rõ nhất cho chuyện một ý đi thành phần việc cụ thể. Đọc nó trước thì phần còn lại của trang sẽ vào khung nhanh hơn.",
    leadLabel: "Dẫn đầu",
    supportLabel: "Hỗ trợ",
    leadSignals: "Thứ gì đã qua được phần thực thi",
    leadImpact: "Nó đã làm thay đổi điều gì",
    relatedRoutes: "Đi ngược ra phần thinking",
    leadSignalsList: [
      "Cộng tác AI bền qua nhiều phiên",
      "Khôi phục workflow khi quay lại việc cũ",
      "Ngữ cảnh thực thi riêng với ranh giới tin cậy rõ ràng"
    ],
    supportTitle: "Những dự án ở gần",
    supportBody:
      "Các dự án này vẫn quan trọng theo cách riêng, nhưng chúng đọc rõ nhất sau khi dự án dẫn đã cho thấy chuẩn chung: ý tưởng chỉ có nghĩa khi nó qua được phần implementation.",
    viewLeadProject: "Xem dự án dẫn",
    viewLeadProjectHint: "Bắt đầu từ proof rõ nhất",
    viewSupportProject: "Mở dự án",
    whyToggle: "Vì sao cấu trúc này",
    whyTitle: "Một dự án dẫn trước vì proof cần một điểm vào rõ.",
    whyBody:
      "Dự án đầu được cho thêm không gian để route này chứng minh điều nó cần chứng minh ngay. Các dự án còn lại vẫn hiện ra, nhưng không đòi cùng một lượng chú ý.",
    routeNoteTitle: "Đọc thêm quanh đây",
    routeNoteBody:
      "Garden cho thấy phần việc trước khi nó lắng xuống. Writing cho thấy lúc ý đã rõ hơn. Projects cho thấy thứ gì thật sự qua được delivery.",
    emptyTitle: "Chưa có dự án nào được liệt kê.",
    emptyBody: "Khu vực này sẽ xuất bản các phần thực thi được chọn khi những mục dự án đầu tiên sẵn sàng."
  },
  ja: {
    title: "プロジェクト",
    description:
      "2zcory Garden の中で、考えが実際の実行に耐えたかどうかを読めるプロジェクトの面。",
    eyebrow: "プロジェクト",
    heroTitle: "考えが実際の実行に着地した場所。",
    heroBody:
      "Projects は、考えが delivery を通った場所です。先頭の一本がいちばん明確な proof を示し、残りはその実践が別の build でどう生きるかを見せます。",
    metricEntries: "projects",
    metricShipped: "shipped",
    metricActive: "active",
    leadKick: "いちばん明確な proof から始める",
    leadTitle: "一本の project が、ページ全体を読みやすくするべきです。",
    leadBody:
      "先頭の project は、考えが具体的な仕事になる流れをいちばんはっきり示します。先にここを読むと、後ろの project も位置づけが見えやすくなります。",
    leadLabel: "主軸",
    supportLabel: "補助",
    leadSignals: "実行を通って残ったもの",
    leadImpact: "その結果何が変わったか",
    relatedRoutes: "思考へ戻る入口",
    leadSignalsList: [
      "持続する AI collaboration",
      "session をまたぐ workflow recovery",
      "trust boundary を持つ private execution context"
    ],
    supportTitle: "近くにあるほかのプロジェクト",
    supportBody:
      "これらの project もそれぞれ重要ですが、先頭の一本が示す基準を見たあとで読むほうがわかりやすくなります。考えは、implementation を通って初めて意味を持ちます。",
    viewLeadProject: "主軸の project を見る",
    viewLeadProjectHint: "いちばん明確な proof から",
    viewSupportProject: "プロジェクトを見る",
    whyToggle: "なぜこの構造か",
    whyTitle: "proof には、まず一本の明確な入口が必要です。",
    whyBody:
      "最初の project に少し広さを持たせることで、この route が何を証明したいのかをすぐ読めます。ほかの project も見えたままですが、同じ強さでは前に出ません。",
    routeNoteTitle: "関連する読みもの",
    routeNoteBody:
      "Garden は考えがまだ動いている場所で、Writing はそれがより明確になった場所です。Projects はそれが delivery を通った場所です。",
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
