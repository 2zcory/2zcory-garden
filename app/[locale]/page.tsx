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
    description: "One site, three ways in: raw thinking, refined writing, and projects that prove the work can land.",
    eyebrow: "Personal operating system",
    heroTitle: "Thinking, writing, and building in one terrain.",
    heroLead:
      "2zcory Garden is a personal operating system. Garden captures raw thinking, Writing shapes it into arguments, and Projects show where it turns into execution.",
    supportLabel: "Why this home exists",
    supportText:
      "The homepage should orient in seconds: show the pipeline, separate the three routes, and make the first click obvious without sounding like a portfolio.",
    ctaPrimary: "Enter the Garden",
    ctaSecondary: "Read the system",
    routesLabel: "Three routes",
    routeGardenName: "Garden",
    routeGardenCue: "raw thinking",
    routeWritingName: "Writing",
    routeWritingCue: "refined thinking",
    routeProjectsName: "Projects",
    routeProjectsCue: "proof of work",
    metricRoutes: "routes",
    metricNotes: "published notes",
    metricArticles: "essays",
    routesEyebrow: "Choose a route",
    routesTitle: "Three distinct entry points, one connected system.",
    routesDescription:
      "Each route gets its own visual logic so visitors can scan by intent instead of reading paragraphs to decode the difference.",
    routeGardenTitle: "Start where ideas are still alive.",
    routeGardenBody:
      "Loose notes, fragments, and trails. This is the surface for unfinished thought before it becomes an essay or a product decision.",
    routeWritingTitle: "Move into shaped arguments.",
    routeWritingBody:
      "Essays, clearer positions, and more deliberate editorial structure for people who want the refined layer of the system.",
    routeProjectsTitle: "See where the thinking lands.",
    routeProjectsBody:
      "Selected builds that show execution, tradeoffs, and real output without flattening the whole site into a generic portfolio.",
    routeGardenCount: "living entries",
    routeWritingCount: "published pieces",
    routeProjectsCount: "selected builds",
    routeOpen: "Open route",
    routeGardenScan: "Trail-first",
    routeWritingScan: "Argument-first",
    routeProjectsScan: "Execution-first",
    signalEyebrow: "Current signals",
    signalTitle: "Recent public outputs from each layer.",
    signalDescription:
      "A narrow read from each route makes the pipeline legible at a glance.",
    featuredTrails: "Garden",
    featuredTrailsTitle: "Notes and fragments in motion",
    featuredTrailsDescription: "Quick reads from the live edge of the garden.",
    readNote: "Read note",
    visitGarden: "Visit the garden",
    featuredWriting: "Writing",
    featuredWritingTitle: "Essays with stronger shape",
    featuredWritingDescription: "Refined pieces for readers who want the settled version.",
    readArticle: "Read article",
    browseWriting: "Browse writing",
    selectedProjects: "Projects",
    selectedProjectsTitle: "Builds that make the thinking concrete",
    selectedProjectsDescription: "Execution evidence without portfolio theater.",
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
    description: "Một site, ba lối vào: suy nghĩ thô, bài viết đã gọt và các dự án chứng minh việc làm thật.",
    eyebrow: "Personal operating system",
    heroTitle: "Suy nghĩ, bài viết và build ở trong cùng một địa hình.",
    heroLead:
      "2zcory Garden là một personal operating system. Garden giữ suy nghĩ thô, Writing gọt nó thành lập luận, còn Projects cho thấy nơi nó hạ xuống thành thực thi.",
    supportLabel: "Vì sao trang chủ này tồn tại",
    supportText:
      "Màn hình đầu phải định hướng trong vài giây: cho thấy pipeline, tách rõ ba lối vào và khiến cú click đầu tiên trở nên hiển nhiên mà không biến site thành portfolio.",
    ctaPrimary: "Vào Garden",
    ctaSecondary: "Đọc hệ thống",
    routesLabel: "Ba lối vào",
    routeGardenName: "Garden",
    routeGardenCue: "suy nghĩ thô",
    routeWritingName: "Writing",
    routeWritingCue: "suy nghĩ đã gọt",
    routeProjectsName: "Projects",
    routeProjectsCue: "bằng chứng thực thi",
    metricRoutes: "lối vào",
    metricNotes: "ghi chú đã xuất bản",
    metricArticles: "bài viết",
    routesEyebrow: "Chọn lối vào",
    routesTitle: "Ba điểm vào khác nhau, một hệ thống nối liền.",
    routesDescription:
      "Mỗi lối vào có logic thị giác riêng để người xem quét theo ý định thay vì phải đọc từng đoạn dài mới hiểu chúng khác nhau ở đâu.",
    routeGardenTitle: "Bắt đầu ở nơi ý tưởng còn đang sống.",
    routeGardenBody:
      "Các ghi chú, mảnh rời và đường mòn còn dang dở. Đây là bề mặt cho suy nghĩ chưa thành bài viết hoặc chưa hóa thành quyết định sản phẩm.",
    routeWritingTitle: "Đi tiếp vào các lập luận đã thành hình.",
    routeWritingBody:
      "Bài viết, lập trường rõ hơn và lớp biên tập có chủ đích hơn cho người muốn phần đã được gọt của hệ thống này.",
    routeProjectsTitle: "Xem nơi suy nghĩ chạm đất.",
    routeProjectsBody:
      "Những build được chọn để cho thấy thực thi, tradeoff và đầu ra thật mà không làm phẳng toàn site thành một portfolio generic.",
    routeGardenCount: "mục đang sống",
    routeWritingCount: "bài đã xuất bản",
    routeProjectsCount: "build được chọn",
    routeOpen: "Mở lối vào",
    routeGardenScan: "ưu tiên trail",
    routeWritingScan: "ưu tiên lập luận",
    routeProjectsScan: "ưu tiên thực thi",
    signalEyebrow: "Tín hiệu hiện tại",
    signalTitle: "Đầu ra công khai gần đây từ từng lớp.",
    signalDescription:
      "Mỗi lối vào chỉ cần một lát cắt hẹp là đủ để người xem hiểu pipeline trong một lần quét.",
    featuredTrails: "Garden",
    featuredTrailsTitle: "Ghi chú và mảnh rời còn đang chuyển động",
    featuredTrailsDescription: "Các lát cắt ngắn từ mép sống của Garden.",
    readNote: "Đọc ghi chú",
    visitGarden: "Vào Garden",
    featuredWriting: "Writing",
    featuredWritingTitle: "Bài viết đã có hình khối rõ hơn",
    featuredWritingDescription: "Các bài dành cho người muốn phiên bản đã lắng xuống.",
    readArticle: "Đọc bài viết",
    browseWriting: "Xem bài viết",
    selectedProjects: "Projects",
    selectedProjectsTitle: "Những build làm suy nghĩ trở nên cụ thể",
    selectedProjectsDescription: "Bằng chứng thực thi, không phải portfolio theater.",
    openProject: "Mở dự án",
    viewAllProjects: "Xem tất cả dự án",
    noNotes: "Chưa có ghi chú nổi bật.",
    noNotesBody: "Garden sẽ hiện ở đây khi những ghi chú đầu tiên được chọn cho bề mặt trang chủ.",
    noWriting: "Chưa có bài viết nổi bật.",
    noWritingBody: "Các bài viết đã được gọt sẽ hiện ở đây khi đợt nội dung đầu tiên sẵn sàng cho trang chủ.",
    noProjects: "Chưa có dự án được chọn.",
    noProjectsBody: "Khu vực này sẽ trỏ tới các bằng chứng thực thi công khai khi các mục dự án đã sẵn sàng."
  },
  ja: {
    title: "ホーム",
    description: "ひとつのサイト、三つの入口。生の思考、整えた文章、そして実行の証拠をつなぐ。",
    eyebrow: "Personal operating system",
    heroTitle: "思考と文章と実装が、ひとつの地形にある。",
    heroLead:
      "2zcory Garden は personal operating system です。Garden は生の思考を受け止め、Writing はそれを議論へ整え、Projects はそれが実装へ着地した場所を見せます。",
    supportLabel: "このホームの役割",
    supportText:
      "最初の画面は数秒で案内できるべきです。パイプラインを見せ、三つの route を分け、portfolio のように見せずに最初のクリックを明確にします。",
    ctaPrimary: "Garden に入る",
    ctaSecondary: "仕組みを読む",
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
