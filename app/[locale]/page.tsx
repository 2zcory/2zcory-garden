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
    description: "A personal site where unfinished thought, shaped writing, and shipped work stay visible in one public practice.",
    eyebrow: "2zcory Garden",
    heroTitle: "See how thought turns into writing and shipped work.",
    heroLead:
      "2zcory Garden is not meant to read like a tidy personal archive. It opens one public practice in motion: ideas that are still changing, ideas that have become essays, and ideas that have already landed as real work.",
    supportLabel: "Why to enter",
    supportText:
      "Start with Garden if you want the live edge, Writing if you want the clearer claim, or Projects if you want to see what survived execution.",
    ctaPrimary: "Start with Garden",
    ctaSecondary: "See shipped work",
    routesLabel: "Three routes",
    routeGardenName: "Garden",
    routeGardenCue: "ideas in progress",
    routeWritingName: "Writing",
    routeWritingCue: "ideas made clear",
    routeProjectsName: "Projects",
    routeProjectsCue: "ideas made real",
    metricRoutes: "routes",
    metricNotes: "published notes",
    metricArticles: "essays",
    routesEyebrow: "Choose a route",
    routesTitle: "Three visible states of the same body of work.",
    routesDescription:
      "You do not need to decode the whole site first. Enter where the work feels most useful to you now.",
    routeGardenTitle: "Go here while the thinking is still open enough to change.",
    routeGardenBody:
      "Notes, fragments, and linked trails that still move. This is the right place if you want to see the work before it settles into a clearer position.",
    routeWritingTitle: "Go here when a line of thought has become a clearer position.",
    routeWritingBody:
      "Essays and longer pieces for when the argument has tightened enough to stand on its own.",
    routeProjectsTitle: "Go here when the thinking has already met execution.",
    routeProjectsBody:
      "Selected projects with enough context to show what was built, why it mattered, and how the ideas survived contact with reality.",
    routeGardenCount: "living entries",
    routeWritingCount: "published pieces",
    routeProjectsCount: "selected builds",
    routeOpen: "Open",
    routeGardenScan: "unfinished thinking",
    routeWritingScan: "clearer argument",
    routeProjectsScan: "survived execution",
    signalEyebrow: "Recent work",
    signalTitle: "A quick way to see the movement.",
    signalDescription:
      "Start with one recent note, one essay, or one project if you want the shortest path into the practice.",
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
    description: "Một site cá nhân nơi ý còn mở, bài viết đã gọn, và phần việc đã ship đứng cạnh nhau như một practice công khai.",
    eyebrow: "2zcory Garden",
    heroTitle: "Xem cách một ý đi thành bài viết và phần việc đã ship.",
    heroLead:
      "2zcory Garden không nên đọc như một kho lưu trữ cá nhân được sắp gọn. Nó mở ra một practice công khai đang chuyển động: những ý còn đang đổi, những ý đã thành bài, và những ý đã chạm đất thành phần việc thực.",
    supportLabel: "Vì sao nên vào",
    supportText:
      "Bắt đầu ở Garden nếu muốn xem phần đang sống, Writing nếu muốn đọc ý đã rõ hơn, hoặc Projects nếu muốn xem thứ đã qua được va chạm với thực tế.",
    ctaPrimary: "Bắt đầu ở Garden",
    ctaSecondary: "Xem phần việc đã ship",
    routesLabel: "Ba lối vào",
    routeGardenName: "Garden",
    routeGardenCue: "ý đang mở",
    routeWritingName: "Writing",
    routeWritingCue: "ý đã thành hình",
    routeProjectsName: "Projects",
    routeProjectsCue: "ý đã chạm đất",
    metricRoutes: "lối vào",
    metricNotes: "ghi chú đã xuất bản",
    metricArticles: "bài viết",
    routesEyebrow: "Chọn lối vào",
    routesTitle: "Ba trạng thái nhìn thấy được của cùng một body of work.",
    routesDescription:
      "Không cần hiểu hết toàn bộ site rồi mới vào. Chỉ cần đi vào chỗ hiện tại có ích nhất với mình.",
    routeGardenTitle: "Vào đây khi ý còn đang mở đủ để thay đổi tiếp.",
    routeGardenBody:
      "Các note, mảnh rời và đường suy nghĩ còn nối nhau. Đây là chỗ để xem phần việc trước khi nó lắng xuống thành một ý rõ hơn.",
    routeWritingTitle: "Vào đây khi một đường suy nghĩ đã thành một ý rõ hơn.",
    routeWritingBody:
      "Các bài dài hơn, dành cho lúc lập luận đã gọn đủ để đứng thành một bài riêng.",
    routeProjectsTitle: "Vào đây khi ý đó đã gặp phần thực thi.",
    routeProjectsBody:
      "Các dự án được chọn, có đủ ngữ cảnh để thấy đã làm gì, vì sao nó quan trọng, và ý tưởng đã sống sót qua va chạm với thực tế ra sao.",
    routeGardenCount: "mục đang sống",
    routeWritingCount: "bài đã xuất bản",
    routeProjectsCount: "build được chọn",
    routeOpen: "Mở",
    routeGardenScan: "ý còn mở",
    routeWritingScan: "ý rõ hơn",
    routeProjectsScan: "qua được thực thi",
    signalEyebrow: "Gần đây",
    signalTitle: "Cách nhanh nhất để thấy chuyển động của site.",
    signalDescription:
      "Nếu muốn vào nhanh, hãy bắt đầu bằng một note gần đây, một bài viết, hoặc một dự án để thấy practice này đang đi như thế nào.",
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
    description: "考えの途中、整った文章、そして実際に形になった仕事が一つの公開された実践として見える個人サイト。",
    eyebrow: "2zcory Garden",
    heroTitle: "考えが文章や実際の仕事になる流れを見せる場所です。",
    heroLead:
      "2zcory Garden は整った個人アーカイブとして読む場所ではありません。まだ変わり続ける考え、文章になった考え、そして実際の仕事として着地した考えを、一つの公開された実践として見せる場所です。",
    supportLabel: "なぜ入るか",
    supportText:
      "初めてなら、Garden は考えの途中、Writing はより明確な主張、Projects は実際に着地した仕事として読むと分かりやすいです。",
    ctaPrimary: "Garden から始める",
    ctaSecondary: "実際の仕事を見る",
    routesLabel: "三つの route",
    routeGardenName: "Garden",
    routeGardenCue: "途中の考え",
    routeWritingName: "Writing",
    routeWritingCue: "形になった考え",
    routeProjectsName: "Projects",
    routeProjectsCue: "現実に着地した考え",
    metricRoutes: "routes",
    metricNotes: "公開ノート",
    metricArticles: "essay",
    routesEyebrow: "入口を選ぶ",
    routesTitle: "同じ仕事の三つの見える状態です。",
    routesDescription:
      "サイト全体を理解してから入る必要はありません。今いちばん見たい状態から入れば十分です。",
    routeGardenTitle: "考えがまだ変わり続けている段階を見るならここです。",
    routeGardenBody:
      "短いノート、断片、つながるメモ。まだ固まりきっていない思考を読む場所です。",
    routeWritingTitle: "より明確な主張になった段階を読むならここです。",
    routeWritingBody:
      "考えがひとつの文章として立つところまで整理された内容を置いています。",
    routeProjectsTitle: "その考えが実際の仕事になったところを見るならここです。",
    routeProjectsBody:
      "公開したプロジェクトをまとめています。何を作ったかだけでなく、その考えが現実の実行に耐えたかも見えるようにしています。",
    routeGardenCount: "生きている entry",
    routeWritingCount: "公開済み pieces",
    routeProjectsCount: "選ばれた builds",
    routeOpen: "開く",
    routeGardenScan: "思考の途中",
    routeWritingScan: "より明確な考え",
    routeProjectsScan: "実行を通った考え",
    signalEyebrow: "現在のシグナル",
    signalTitle: "この実践の動きをすばやく読めます。",
    signalDescription:
      "最短で入りたいなら、最近のノート、文章、プロジェクトのどれか一つから始めてください。",
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
    description: copy.description,
    locale,
    pathname: "/"
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
        secondaryHref="/projects"
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
