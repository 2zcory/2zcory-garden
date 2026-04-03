import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {HomeFeaturedSection} from "@/components/home/home-featured-section";
import {HomeHero} from "@/components/home/home-hero";
import {HomeRouteCard} from "@/components/home/home-route-card";
import {HomeSection} from "@/components/home/home-section";
import type {AppLocale} from "@/i18n/routing";
import {getArticles, getFeaturedContent, getNotes, getProjects} from "@/lib/content";
import {buildPageMetadata, formatDate} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
  en: {
    title: "Home",
    description: "A personal site for notes, essays, and projects, with a clearer way to enter each one.",
    eyebrow: "2zcory Garden",
    heroTitle: "A place for notes, essays, and shipped work.",
    heroLead:
      "This is where ongoing notes, finished writing, and public projects live side by side. You can enter from the rough edge, the clearer argument, or the work that has already landed.",
    supportLabel: "Start here",
    supportText:
      "If you are new, start with the route that matches how you want to read.",
    ctaPrimary: "Enter the Garden",
    ctaSecondary: "About this site",
    routesLabel: "Three routes",
    routeGardenName: "Garden",
    routeGardenCue: "notes in motion",
    routeWritingName: "Writing",
    routeWritingCue: "finished essays",
    routeProjectsName: "Projects",
    routeProjectsCue: "shipped projects",
    metricRoutes: "routes",
    metricNotes: "published notes",
    metricArticles: "essays",
    routesEyebrow: "Choose a route",
    routesTitle: "Three ways in, depending on what you want to read.",
    routesDescription:
      "Each route holds a different stage of the work, so you do not have to decode the site before choosing where to begin.",
    routeGardenTitle: "Start with notes that are still unfolding.",
    routeGardenBody:
      "Short notes, fragments, and connected threads. This is the most open part of the site.",
    routeWritingTitle: "Move into essays with a clearer shape.",
    routeWritingBody:
      "Longer pieces for when a line of thought has settled enough to stand on its own.",
    routeProjectsTitle: "See the work once it has been built.",
    routeProjectsBody:
      "Selected projects with enough context to show what was made and why it matters.",
    routeGardenCount: "living entries",
    routeWritingCount: "published pieces",
    routeProjectsCount: "selected builds",
    routeOpen: "Open route",
    routeGardenScan: "Open-ended",
    routeWritingScan: "More deliberate",
    routeProjectsScan: "Built and shipped",
    signalEyebrow: "Recent work",
    signalTitle: "A quick read across the site.",
    signalDescription:
      "A few recent pieces are enough to show how the parts relate.",
    featuredTrails: "Garden",
    featuredTrailsTitle: "Notes and fragments still being worked through",
    featuredTrailsDescription: "A few recent entries from the more open side of the site.",
    readNote: "Read note",
    visitGarden: "Visit the garden",
    featuredWriting: "Writing",
    featuredWritingTitle: "Essays that take a clearer position",
    featuredWritingDescription: "Pieces for readers who want the more settled version.",
    readArticle: "Read article",
    browseWriting: "Browse writing",
    selectedProjects: "Projects",
    selectedProjectsTitle: "Projects where the work becomes concrete",
    selectedProjectsDescription: "Public builds, without turning the whole site into a portfolio.",
    openProject: "Open project",
    viewAllProjects: "View all projects",
    noNotes: "No featured notes yet.",
    noNotesBody: "Garden entries will appear here once the first notes are selected.",
    noWriting: "No featured writing yet.",
    noWritingBody: "Writing will appear here once the first essays are ready.",
    noProjects: "No selected projects yet.",
    noProjectsBody: "Projects will appear here once public project entries are ready."
  },
  vi: {
    title: "Trang chủ",
    description: "Một nơi để đọc note, bài viết và dự án, với lối vào rõ hơn cho từng phần.",
    eyebrow: "2zcory Garden",
    heroTitle: "Một nơi cho note, bài viết và những dự án đã thành hình.",
    heroLead:
      "Đây là nơi các note đang mở, bài viết đã gọt, và dự án công khai đứng cạnh nhau. Có thể đi vào từ phần còn thô, phần đã rõ hơn, hoặc phần việc đã chạm đất.",
    supportLabel: "Bắt đầu ở đây",
    supportText:
      "Nếu mới vào, hãy chọn lối đi hợp với cách mình muốn đọc.",
    ctaPrimary: "Vào Garden",
    ctaSecondary: "Về site này",
    routesLabel: "Ba lối vào",
    routeGardenName: "Garden",
    routeGardenCue: "note đang chuyển động",
    routeWritingName: "Writing",
    routeWritingCue: "bài viết đã thành hình",
    routeProjectsName: "Projects",
    routeProjectsCue: "dự án đã làm",
    metricRoutes: "lối vào",
    metricNotes: "ghi chú đã xuất bản",
    metricArticles: "bài viết",
    routesEyebrow: "Chọn lối vào",
    routesTitle: "Ba lối vào, tùy cách bạn muốn đọc.",
    routesDescription:
      "Mỗi route giữ một trạng thái khác nhau của công việc, nên có thể chọn đường vào ngay mà không phải giải mã site trước.",
    routeGardenTitle: "Bắt đầu từ những note còn đang mở.",
    routeGardenBody:
      "Note ngắn, mảnh rời và các đường suy nghĩ còn nối tiếp nhau. Đây là phần mở nhất của site.",
    routeWritingTitle: "Đi tiếp vào những bài viết đã có hình khối rõ hơn.",
    routeWritingBody:
      "Các bài dài hơn, dành cho lúc một ý đã lắng đủ để đứng thành bài riêng.",
    routeProjectsTitle: "Xem phần việc sau khi nó đã được làm ra.",
    routeProjectsBody:
      "Các dự án được chọn, đủ để thấy đã làm gì và vì sao nó đáng xem.",
    routeGardenCount: "mục đang sống",
    routeWritingCount: "bài đã xuất bản",
    routeProjectsCount: "build được chọn",
    routeOpen: "Mở lối vào",
    routeGardenScan: "còn mở",
    routeWritingScan: "đã gọn hơn",
    routeProjectsScan: "đã build",
    signalEyebrow: "Gần đây",
    signalTitle: "Một lát cắt nhanh của site.",
    signalDescription:
      "Chỉ vài mục gần đây là đã đủ thấy các phần này nối với nhau thế nào.",
    featuredTrails: "Garden",
    featuredTrailsTitle: "Những note và mảnh rời còn đang được nghĩ tiếp",
    featuredTrailsDescription: "Một vài mục mới từ phần mở nhất của site.",
    readNote: "Đọc ghi chú",
    visitGarden: "Vào Garden",
    featuredWriting: "Writing",
    featuredWritingTitle: "Những bài viết đã đi tới một ý rõ hơn",
    featuredWritingDescription: "Dành cho người muốn đọc phiên bản đã lắng xuống.",
    readArticle: "Đọc bài viết",
    browseWriting: "Xem bài viết",
    selectedProjects: "Projects",
    selectedProjectsTitle: "Những dự án nơi công việc trở nên cụ thể",
    selectedProjectsDescription: "Dự án công khai, nhưng không biến cả site thành portfolio.",
    openProject: "Mở dự án",
    viewAllProjects: "Xem tất cả dự án",
    noNotes: "Chưa có ghi chú nổi bật.",
    noNotesBody: "Garden sẽ hiện ở đây khi những note đầu tiên được chọn.",
    noWriting: "Chưa có bài viết nổi bật.",
    noWritingBody: "Writing sẽ hiện ở đây khi những bài đầu tiên sẵn sàng.",
    noProjects: "Chưa có dự án được chọn.",
    noProjectsBody: "Projects sẽ hiện ở đây khi các mục dự án công khai đã sẵn sàng."
  },
  ja: {
    title: "ホーム",
    description: "ノートと文章とプロジェクトを、それぞれ入りやすく並べた個人サイト。",
    eyebrow: "2zcory Garden",
    heroTitle: "ノートと文章と、形になった仕事のための場所。",
    heroLead:
      "ここでは、まだ開いているノート、形を整えた文章、そして公開できるプロジェクトが並んでいます。読みたい深さに合わせて入口を選べます。",
    supportLabel: "ここから始める",
    supportText:
      "はじめて来た人は、読みたいものに近い route から入れば十分です。",
    ctaPrimary: "Garden に入る",
    ctaSecondary: "このサイトについて",
    routesLabel: "三つの route",
    routeGardenName: "Garden",
    routeGardenCue: "生の思考",
    routeWritingName: "Writing",
    routeWritingCue: "整えた思考",
    routeProjectsName: "Projects",
    routeProjectsCue: "実行の証拠",
    metricRoutes: "routes",
    metricNotes: "公開ノート",
    metricArticles: "essay",
    routesEyebrow: "入口を選ぶ",
    routesTitle: "異なる三つの入口、でも一つのつながった仕組み。",
    routesDescription:
      "各 route に独自の視覚ロジックを与え、訪問者が長文を読まなくても意図で見分けられるようにします。",
    routeGardenTitle: "アイデアがまだ生きている場所から始める。",
    routeGardenBody:
      "ノート、断片、トレイル。essay や product decision になる前の、未完成な思考のための面です。",
    routeWritingTitle: "形を持った議論へ進む。",
    routeWritingBody:
      "整えられた essay、より明確な立場、そしてこの仕組みの編集された層を求める読者のための面です。",
    routeProjectsTitle: "思考がどこで着地したかを見る。",
    routeProjectsBody:
      "実行、tradeoff、現実のアウトプットを示す選ばれた build 群。サイト全体を generic な portfolio に平板化しません。",
    routeGardenCount: "生きている entry",
    routeWritingCount: "公開済み pieces",
    routeProjectsCount: "選ばれた builds",
    routeOpen: "route を開く",
    routeGardenScan: "trail-first",
    routeWritingScan: "argument-first",
    routeProjectsScan: "execution-first",
    signalEyebrow: "現在のシグナル",
    signalTitle: "各レイヤーからの最近の公開アウトプット。",
    signalDescription:
      "各 route の狭い抜粋だけで、この pipeline がひと目で読めるようにします。",
    featuredTrails: "Garden",
    featuredTrailsTitle: "動いているノートと断片",
    featuredTrailsDescription: "garden の生きた端からの短い読み口。",
    readNote: "ノートを読む",
    visitGarden: "ガーデンへ",
    featuredWriting: "Writing",
    featuredWritingTitle: "より形のある文章",
    featuredWritingDescription: "落ち着いた版を読みたい人のための文章。",
    readArticle: "記事を読む",
    browseWriting: "文章を見る",
    selectedProjects: "Projects",
    selectedProjectsTitle: "思考を具体化した build",
    selectedProjectsDescription: "portfolio theater ではない実行の証拠。",
    openProject: "プロジェクトを開く",
    viewAllProjects: "すべてのプロジェクトを見る",
    noNotes: "まだ注目ノートはありません。",
    noNotesBody: "最初のノートがホーム用に選ばれたら、ここにガーデンが現れます。",
    noWriting: "まだ注目の文章はありません。",
    noWritingBody: "最初の整えられた文章がホームに用意できたら、ここに現れます。",
    noProjects: "まだ選ばれたプロジェクトはありません。",
    noProjectsBody: "プロジェクトの entry が整えば、ここから公開された実行の証拠へ進めるようになります。"
  }
} as const;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const copy = COPY[locale] ?? COPY.en;

  return buildPageMetadata({
    title: copy.title,
    description: copy.description
  });
}

export default async function LocaleHomePage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale] ?? COPY.en;
  const featured = getFeaturedContent(locale);
  const notes = getNotes(locale);
  const articles = getArticles(locale);
  const projects = getProjects(locale);
  const tCommon = await getTranslations({locale, namespace: "Common"});

  return (
    <div className="page-stack">
      <HomeHero
        eyebrow={copy.eyebrow}
        headline={copy.heroTitle}
        subtext={copy.heroLead}
        supportingLabel={copy.supportLabel}
        supportingText={copy.supportText}
        primaryHref="/garden"
        primaryLabel={copy.ctaPrimary}
        secondaryHref="/about"
        secondaryLabel={copy.ctaSecondary}
        routesLabel={copy.routesLabel}
        routes={[
          {index: "01", name: copy.routeGardenName, cue: copy.routeGardenCue},
          {index: "02", name: copy.routeWritingName, cue: copy.routeWritingCue},
          {index: "03", name: copy.routeProjectsName, cue: copy.routeProjectsCue}
        ]}
        metrics={[
          {value: "3", label: copy.metricRoutes},
          {value: String(notes.length), label: copy.metricNotes},
          {value: String(articles.length), label: copy.metricArticles}
        ]}
      />

      <HomeSection
        eyebrow={copy.routesEyebrow}
        title={copy.routesTitle}
        description={copy.routesDescription}
        className="surface-card"
      >
        <div className="home-routes-grid">
          <HomeRouteCard
            index="01"
            routeName={copy.routeGardenName}
            title={copy.routeGardenTitle}
            description={copy.routeGardenBody}
            cue={copy.routeGardenScan}
            countLabel={copy.routeGardenCount}
            countValue={String(notes.length)}
            href="/garden"
            cta={copy.routeOpen}
            accent="garden"
          />
          <HomeRouteCard
            index="02"
            routeName={copy.routeWritingName}
            title={copy.routeWritingTitle}
            description={copy.routeWritingBody}
            cue={copy.routeWritingScan}
            countLabel={copy.routeWritingCount}
            countValue={String(articles.length)}
            href="/writing"
            cta={copy.routeOpen}
            accent="writing"
          />
          <HomeRouteCard
            index="03"
            routeName={copy.routeProjectsName}
            title={copy.routeProjectsTitle}
            description={copy.routeProjectsBody}
            cue={copy.routeProjectsScan}
            countLabel={copy.routeProjectsCount}
            countValue={String(projects.length)}
            href="/projects"
            cta={copy.routeOpen}
            accent="projects"
          />
        </div>
      </HomeSection>

      <HomeSection
        eyebrow={copy.signalEyebrow}
        title={copy.signalTitle}
        description={copy.signalDescription}
        className="surface-card"
      >
        <div className="home-signals-grid">
          <HomeFeaturedSection
            eyebrow={copy.featuredTrails}
            title={copy.featuredTrailsTitle}
            description={copy.featuredTrailsDescription}
            items={featured.notes.map((note) => ({
              slug: note.slug,
              title: note.title,
              summary: note.summary,
              meta: formatDate(note.publishedAt, locale),
              badges: note.topicLabels,
              href: `/garden/${note.slug}`,
              localeNote: locale !== "en" && !note.availableLocales.includes(locale) ? tCommon("englishOnly") : undefined
            }))}
            emptyTitle={copy.noNotes}
            emptyBody={copy.noNotesBody}
            emptyHref="/garden"
            emptyCta={copy.visitGarden}
            itemCta={copy.readNote}
          />
          <HomeFeaturedSection
            eyebrow={copy.featuredWriting}
            title={copy.featuredWritingTitle}
            description={copy.featuredWritingDescription}
            items={featured.articles.map((article) => ({
              slug: article.slug,
              title: article.title,
              summary: article.excerpt,
              meta: formatDate(article.publishedAt, locale),
              badges: [article.theme],
              href: `/writing/${article.slug}`,
              localeNote:
                locale !== "en" && !article.availableLocales.includes(locale) ? tCommon("englishOnly") : undefined
            }))}
            emptyTitle={copy.noWriting}
            emptyBody={copy.noWritingBody}
            emptyHref="/writing"
            emptyCta={copy.browseWriting}
            itemCta={copy.readArticle}
          />
          <HomeFeaturedSection
            eyebrow={copy.selectedProjects}
            title={copy.selectedProjectsTitle}
            description={copy.selectedProjectsDescription}
            items={featured.projects.map((project) => ({
              slug: project.slug,
              title: project.name,
              summary: project.summary,
              badges: [project.role],
              href: `/projects/${project.slug}`,
              localeNote:
                locale !== "en" && !project.availableLocales.includes(locale) ? tCommon("englishOnly") : undefined
            }))}
            emptyTitle={copy.noProjects}
            emptyBody={copy.noProjectsBody}
            emptyHref="/projects"
            emptyCta={copy.viewAllProjects}
            itemCta={copy.openProject}
          />
        </div>
      </HomeSection>
    </div>
  );
}
