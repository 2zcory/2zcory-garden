import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/routing";
import type {AppLocale} from "@/i18n/routing";
import {getFeaturedContent} from "@/lib/content";
import {buildPageMetadata, formatDate} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
  en: {
    title: "Home",
    description: "A public entry point into 2zcory Garden, connecting notes, writing, and selected projects.",
    eyebrow: "Public home for thought and execution",
    refined: "Refined first-screen pass",
    heroTitle: "A map for thought that turns into public work.",
    heroLead:
      "2zcory Garden should open like a territory, not like a summary page. The first screen should explain the place quickly, then make three routes legible: thinking still in motion, writing already shaped, and work already made concrete.",
    chips: ["Keep the split structure", "Tighten first-screen rhythm", "No broad redesign"],
    goalLabel: "Refinement goal",
    goalText: "Make the hero feel more decisive than descriptive.",
    ctaPrimary: "Review the routes",
    ctaSecondary: "Check the intent",
    ruleEyebrow: "Orientation rule",
    ruleTitle: "One site, three ways in.",
    ruleBodyA:
      "The homepage should orient first. It does not need to explain every content type equally, only give visitors a strong first read and an obvious way inward.",
    ruleBodyB:
      "This pass is about cadence, emphasis, and calm. It should sharpen the first screen without changing the underlying route logic.",
    boardEyebrow: "Refinement target",
    boardTitle: "Keep the atlas feeling, reduce the leftover noise.",
    boardBody:
      "The board should still read as connected terrain, but the composition needs a cleaner rhythm so the first impression feels authored rather than merely arranged.",
    routeGardenTitle: "Notes, fragments, and trails still moving.",
    routeGardenBody:
      "Start at the live edge of ideas. This route holds the unfinished, the connective tissue, and the threads that may later harden into essays or project decisions.",
    routeWritingTitle: "Essays and clearer positions after the trail.",
    routeWritingBody:
      "This layer is for visitors who want shaped arguments, clearer conclusions, and the more deliberate editorial surface of the site.",
    routeProjectsTitle: "Builds that prove the thinking can land.",
    routeProjectsBody:
      "This route carries execution evidence without flattening the whole site into a portfolio wall.",
    routeOpen: "Open route",
    routeGarden: "thought in motion",
    routeWriting: "deliberate pieces",
    routeProjects: "proof of work",
    boardCaptionStrong: "Refinement reading rule",
    boardCaptionText: "Keep the asymmetry and route tension, but make the first screen land with more composure.",
    featuredTrails: "Featured trails",
    readNote: "Read note",
    visitGarden: "Visit the garden",
    featuredWriting: "Featured writing",
    readArticle: "Read article",
    browseWriting: "Browse writing",
    selectedProjects: "Selected projects",
    openProject: "Open project",
    viewAllProjects: "View all projects",
    noNotes: "No featured notes yet.",
    noNotesBody: "The garden will appear here once the first notes are selected for the home surface.",
    noWriting: "No featured writing yet.",
    noWritingBody: "Shaped essays will appear here once the first writing pieces are ready for the home surface.",
    noProjects: "No selected projects yet.",
    noProjectsBody: "This section will point to public execution evidence once project entries are ready."
  },
  vi: {
    title: "Trang chủ",
    description: "Điểm vào công khai của 2zcory Garden, kết nối note, bài viết và các dự án được chọn.",
    eyebrow: "Ngôi nhà công khai cho suy nghĩ và thực thi",
    refined: "Vòng tinh chỉnh first-screen",
    heroTitle: "Một bản đồ cho suy nghĩ có thể trở thành sản phẩm công khai.",
    heroLead:
      "2zcory Garden nên mở ra như một vùng đất, không phải một trang tóm tắt. Màn hình đầu tiên cần giải thích nơi này thật nhanh, rồi làm rõ ba lối vào: suy nghĩ còn đang chuyển động, bài viết đã được gọt lại, và công việc đã thành hình.",
    chips: ["Giữ nguyên split structure", "Siết nhịp first-screen", "Không mở rộng redesign"],
    goalLabel: "Mục tiêu tinh chỉnh",
    goalText: "Làm hero quyết đoán hơn thay vì chỉ mang tính mô tả.",
    ctaPrimary: "Xem các lối vào",
    ctaSecondary: "Xem chủ đích",
    ruleEyebrow: "Quy tắc định hướng",
    ruleTitle: "Một site, ba đường đi vào.",
    ruleBodyA:
      "Homepage nên ưu tiên định hướng. Nó không cần giải thích mọi loại nội dung với trọng số ngang nhau, chỉ cần tạo được lần đọc đầu rõ ràng và một cách đi sâu vào đủ dễ thấy.",
    ruleBodyB:
      "Vòng này tập trung vào nhịp điệu, nhấn mạnh và độ yên. Nó cần làm first-screen sắc hơn mà không đổi route logic nền bên dưới.",
    boardEyebrow: "Mục tiêu của pass",
    boardTitle: "Giữ cảm giác atlas, giảm phần nhiễu còn sót lại.",
    boardBody:
      "Board vẫn phải đọc như một địa hình liên kết, nhưng bố cục cần nhịp sạch hơn để ấn tượng đầu tiên trông có chủ đích thay vì chỉ là đã được sắp xếp.",
    routeGardenTitle: "Note, fragment và trail vẫn đang chuyển động.",
    routeGardenBody:
      "Bắt đầu từ mép sống của ý tưởng. Route này giữ phần chưa hoàn tất, connective tissue và những sợi chỉ sau này có thể cứng lại thành essay hoặc quyết định dự án.",
    routeWritingTitle: "Bài viết và lập trường rõ hơn sau quãng trail.",
    routeWritingBody:
      "Lớp này dành cho người muốn các lập luận đã được gọt, kết luận rõ hơn và bề mặt biên tập có chủ đích hơn của site.",
    routeProjectsTitle: "Những thứ đã build để chứng minh suy nghĩ có thể hạ xuống.",
    routeProjectsBody:
      "Route này mang bằng chứng thực thi mà không ép toàn site thành một bức tường portfolio.",
    routeOpen: "Mở route",
    routeGarden: "suy nghĩ đang chuyển động",
    routeWriting: "bài viết có chủ đích",
    routeProjects: "bằng chứng thực thi",
    boardCaptionStrong: "Quy tắc đọc refinement",
    boardCaptionText: "Giữ độ lệch và lực căng giữa các route, nhưng để first-screen hạ xuống gọn và chín hơn.",
    featuredTrails: "Các trail nổi bật",
    readNote: "Đọc note",
    visitGarden: "Vào garden",
    featuredWriting: "Bài viết nổi bật",
    readArticle: "Đọc bài viết",
    browseWriting: "Xem writing",
    selectedProjects: "Dự án được chọn",
    openProject: "Mở dự án",
    viewAllProjects: "Xem tất cả dự án",
    noNotes: "Chưa có note nổi bật.",
    noNotesBody: "Garden sẽ hiện ở đây khi những note đầu tiên được chọn cho bề mặt homepage.",
    noWriting: "Chưa có bài viết nổi bật.",
    noWritingBody: "Các bài viết đã được gọt sẽ hiện ở đây khi đợt writing đầu tiên sẵn sàng cho homepage.",
    noProjects: "Chưa có dự án được chọn.",
    noProjectsBody: "Khu vực này sẽ trỏ tới các bằng chứng thực thi công khai khi các project entry đã sẵn sàng."
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

export default async function LocaleHomePage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale];
  const featured = getFeaturedContent(locale);
  const tCommon = await getTranslations({locale, namespace: "Common"});

  return (
    <div className="page-stack">
      <section className="hero-card home-atlas-shell">
        <div className="home-atlas-grid">
          <section className="home-atlas-copy">
            <div className="home-atlas-kicker">
              <p className="eyebrow">{copy.eyebrow}</p>
              <span className="home-kicker-pill">{copy.refined}</span>
            </div>

            <div>
              <h1 className="hero-title home-atlas-title">{copy.heroTitle}</h1>
              <p className="hero-copy home-atlas-lead">{copy.heroLead}</p>
            </div>

            <div className="home-intent-row" aria-label="Refinement boundaries">
              {copy.chips.map((chip) => (
                <span key={chip} className="home-intent-chip">
                  {chip}
                </span>
              ))}
            </div>

            <div className="home-rhythm-note">
              <strong>{copy.goalLabel}</strong>
              <span>{copy.goalText}</span>
            </div>

            <div className="cta-row">
              <Link href="/garden" className="button-link">
                {copy.ctaPrimary}
              </Link>
              <Link href="/about" className="button-link secondary">
                {copy.ctaSecondary}
              </Link>
            </div>

            <section className="home-rule-card">
              <p className="eyebrow">{copy.ruleEyebrow}</p>
              <h2 className="section-heading">{copy.ruleTitle}</h2>
              <p className="muted">{copy.ruleBodyA}</p>
              <p className="muted">{copy.ruleBodyB}</p>
            </section>
          </section>

          <section className="home-atlas-board">
            <div className="home-board-header">
              <p className="eyebrow">{copy.boardEyebrow}</p>
              <h2>{copy.boardTitle}</h2>
              <p className="muted">{copy.boardBody}</p>
            </div>

            <article className="home-route-card home-route-garden">
              <div className="route-label">Route 01 / Garden</div>
              <h2>{copy.routeGardenTitle}</h2>
              <p>{copy.routeGardenBody}</p>
              <div className="home-route-actions">
                <Link href="/garden" className="route-pill">
                  {copy.routeOpen}
                </Link>
                <span className="route-pill route-pill-muted">{copy.routeGarden}</span>
              </div>
            </article>

            <article className="home-route-card home-route-writing">
              <div className="route-label">Route 02 / Writing</div>
              <h2>{copy.routeWritingTitle}</h2>
              <p>{copy.routeWritingBody}</p>
              <div className="home-route-actions">
                <Link href="/writing" className="route-pill">
                  {copy.routeOpen}
                </Link>
                <span className="route-pill route-pill-muted">{copy.routeWriting}</span>
              </div>
            </article>

            <article className="home-route-card home-route-projects">
              <div className="route-label">Route 03 / Projects</div>
              <h2>{copy.routeProjectsTitle}</h2>
              <p>{copy.routeProjectsBody}</p>
              <div className="home-route-actions">
                <Link href="/projects" className="route-pill">
                  {copy.routeOpen}
                </Link>
                <span className="route-pill route-pill-muted">{copy.routeProjects}</span>
              </div>
            </article>

            <div className="home-board-caption">
              <strong>{copy.boardCaptionStrong}</strong>
              <span>{copy.boardCaptionText}</span>
            </div>
          </section>
        </div>
      </section>

      <section className="surface-card">
        <p className="eyebrow">{copy.featuredTrails}</p>
        <div className="content-list">
          {featured.notes.length > 0 ? (
            featured.notes.map((note) => (
              <article key={note.slug} className="content-item">
                {locale === "vi" && !note.availableLocales.includes("vi") ? (
                  <p className="locale-note">{tCommon("englishOnly")}</p>
                ) : null}
                <div className="meta-row">
                  <span>{formatDate(note.publishedAt, locale)}</span>
                  {note.topicLabels.map((label) => (
                    <span key={label} className="badge">
                      {label}
                    </span>
                  ))}
                </div>
                <h3>{note.title}</h3>
                <p className="muted">{note.summary}</p>
                <Link href={`/garden/${note.slug}`} className="inline-link">
                  {copy.readNote}
                </Link>
              </article>
            ))
          ) : (
            <article className="content-item">
              <h3>{copy.noNotes}</h3>
              <p className="muted">{copy.noNotesBody}</p>
              <Link href="/garden" className="inline-link">
                {copy.visitGarden}
              </Link>
            </article>
          )}
        </div>
      </section>

      <section className="section-grid">
        <article className="surface-card stack">
          <p className="eyebrow">{copy.featuredWriting}</p>
          {featured.articles.length > 0 ? (
            featured.articles.map((article) => (
              <div key={article.slug}>
                {locale === "vi" && !article.availableLocales.includes("vi") ? (
                  <p className="locale-note">{tCommon("englishOnly")}</p>
                ) : null}
                <h3>{article.title}</h3>
                <p className="muted">{article.excerpt}</p>
                <Link href={`/writing/${article.slug}`} className="inline-link">
                  {copy.readArticle}
                </Link>
              </div>
            ))
          ) : (
            <div>
              <h3>{copy.noWriting}</h3>
              <p className="muted">{copy.noWritingBody}</p>
              <Link href="/writing" className="inline-link">
                {copy.browseWriting}
              </Link>
            </div>
          )}
        </article>
        <article className="surface-card stack">
          <p className="eyebrow">{copy.selectedProjects}</p>
          {featured.projects.length > 0 ? (
            featured.projects.map((project) => (
              <div key={project.slug}>
                {locale === "vi" && !project.availableLocales.includes("vi") ? (
                  <p className="locale-note">{tCommon("englishOnly")}</p>
                ) : null}
                <h3>{project.name}</h3>
                <p className="muted">{project.summary}</p>
                <Link href={`/projects/${project.slug}`} className="inline-link">
                  {copy.openProject}
                </Link>
              </div>
            ))
          ) : (
            <div>
              <h3>{copy.noProjects}</h3>
              <p className="muted">{copy.noProjectsBody}</p>
              <Link href="/projects" className="inline-link">
                {copy.viewAllProjects}
              </Link>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
