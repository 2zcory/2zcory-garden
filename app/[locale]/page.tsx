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
    description: "A public site where product judgment stays visible from rough thought to clearer writing to shipped systems.",
    eyebrow: "2zcory Garden",
    heroTitle: "Product judgment carried from rough thought to shipped systems.",
    heroLead:
      "2zcory Garden is a public practice for product-minded engineering: ideas while they are still changing, arguments once they have tightened, and systems once they have survived execution.",
    supportLabel: "Why to enter",
    supportText:
      "Start with Projects if you want the fastest proof, Writing if you want the clearer claim first, or Garden if you want the live edge of the work.",
    ctaPrimary: "Start with Projects",
    ctaSecondary: "Read the clearer argument",
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
      "Use this map after the first proof block has given you a reason to care. The routes are different states of one practice, not equal shelves.",
    routeGardenTitle: "Go here while the thinking is still open enough to change.",
    routeGardenBody:
      "Notes, fragments, and linked trails that still move. This is the right place once you want to see the work before it settles into a clearer position.",
    routeWritingTitle: "Go here when a line of thought has become a clearer position.",
    routeWritingBody:
      "Essays and longer pieces for readers who want the clearer claim behind the systems and decisions.",
    routeProjectsTitle: "Go here when the thinking has already met execution.",
    routeProjectsBody:
      "Selected projects with enough context to show what had to be handled, what was built, and what survived contact with reality.",
    routeGardenCount: "living entries",
    routeWritingCount: "published pieces",
    routeProjectsCount: "selected builds",
    routeOpen: "Open",
    routeGardenScan: "unfinished thinking",
    routeWritingScan: "clearer argument",
    routeProjectsScan: "survived execution",
    signalEyebrow: "Start with proof",
    signalTitle: "The fastest way to understand the builder is to start with one shipped system.",
    signalDescription:
      "Let one project create conviction first. Then move outward into writing for the sharper claim or Garden for the live edge behind it.",
    featuredTrails: "Projects",
    featuredTrailsTitle: "Proof that the thinking survives execution",
    featuredTrailsDescription: "Start here if you want the clearest evidence of product judgment under real constraints.",
    readNote: "Read note",
    visitGarden: "Visit the garden",
    featuredWriting: "Writing",
    featuredWritingTitle: "The clearest argument behind the work",
    featuredWritingDescription: "Read this next if you want the tighter claim behind the systems and decisions.",
    readArticle: "Read article",
    browseWriting: "Browse writing",
    selectedProjects: "Garden",
    selectedProjectsTitle: "The live edge where the work is still moving",
    selectedProjectsDescription: "Go here after the proof if you want to see the trails before they settle into clearer positions.",
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
    description: "Một site công khai nơi product judgment còn nhìn thấy được từ ý còn mở đến bài viết rõ hơn rồi tới những hệ thống đã ship.",
    eyebrow: "2zcory Garden",
    heroTitle: "Product judgment được mang từ ý còn mở tới những hệ thống đã ship.",
    heroLead:
      "2zcory Garden là một practice công khai cho product-minded engineering: những ý còn đang đổi, những lập luận đã gọn hơn, và những hệ thống đã qua được phần thực thi.",
    supportLabel: "Vì sao nên vào",
    supportText:
      "Bắt đầu ở Projects nếu muốn thấy proof nhanh nhất, Writing nếu muốn đọc phần lập luận rõ hơn trước, hoặc Garden nếu muốn vào phần việc còn đang sống.",
    ctaPrimary: "Bắt đầu ở Projects",
    ctaSecondary: "Đọc phần lập luận rõ hơn",
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
      "Hãy dùng bản đồ này sau khi proof đầu tiên đã cho mình một lý do để quan tâm. Các route là những trạng thái khác nhau của cùng một practice, không phải ba kệ nội dung ngang hàng.",
    routeGardenTitle: "Vào đây khi ý còn đang mở đủ để thay đổi tiếp.",
    routeGardenBody:
      "Các note, mảnh rời và đường suy nghĩ còn nối nhau. Đây là chỗ nên vào khi muốn xem phần việc trước khi nó lắng xuống thành một ý rõ hơn.",
    routeWritingTitle: "Vào đây khi một đường suy nghĩ đã thành một ý rõ hơn.",
    routeWritingBody:
      "Các bài dài hơn, dành cho người muốn đọc phần lập luận rõ hơn đứng phía sau các quyết định và hệ thống.",
    routeProjectsTitle: "Vào đây khi ý đó đã gặp phần thực thi.",
    routeProjectsBody:
      "Các dự án được chọn, có đủ ngữ cảnh để thấy đã phải xử lý điều gì, đã làm gì, và ý tưởng đã sống sót qua va chạm với thực tế ra sao.",
    routeGardenCount: "mục đang sống",
    routeWritingCount: "bài đã xuất bản",
    routeProjectsCount: "build được chọn",
    routeOpen: "Mở",
    routeGardenScan: "ý còn mở",
    routeWritingScan: "ý rõ hơn",
    routeProjectsScan: "qua được thực thi",
    signalEyebrow: "Bắt đầu từ proof",
    signalTitle: "Cách nhanh nhất để hiểu builder này là bắt đầu từ một hệ thống đã ship.",
    signalDescription:
      "Hãy để một dự án tạo conviction trước. Sau đó đi sang Writing để đọc ý rõ hơn, hoặc Garden để thấy phần sống đứng phía sau nó.",
    featuredTrails: "Projects",
    featuredTrailsTitle: "Proof cho thấy thinking sống sót qua execution",
    featuredTrailsDescription: "Bắt đầu ở đây nếu muốn thấy dấu hiệu rõ nhất của product judgment dưới áp lực thật.",
    readNote: "Đọc ghi chú",
    visitGarden: "Vào Garden",
    featuredWriting: "Writing",
    featuredWritingTitle: "Phần lập luận rõ nhất đứng sau công việc",
    featuredWritingDescription: "Đọc tiếp ở đây nếu muốn thấy claim đã được siết lại phía sau các quyết định và hệ thống.",
    readArticle: "Đọc bài viết",
    browseWriting: "Xem bài viết",
    selectedProjects: "Garden",
    selectedProjectsTitle: "Phần sống nơi công việc vẫn còn đang chuyển động",
    selectedProjectsDescription: "Đi vào đây sau proof nếu muốn thấy những trail trước khi chúng lắng xuống thành ý rõ hơn.",
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
    description: "考えの途中からより明確な文章、そして実際に ship された system まで、product judgment が見える公開サイト。",
    eyebrow: "2zcory Garden",
    heroTitle: "product judgment を、粗い思考から ship された system まで運ぶ場所です。",
    heroLead:
      "2zcory Garden は、product-minded engineering を公開で読み取るための practice です。まだ変わる考え、より明確になった議論、そして実行を通って残った system を並べます。",
    supportLabel: "なぜ入るか",
    supportText:
      "最初は Projects から入ると proof がいちばん早く見えます。まず議論を読みたいなら Writing、動いている端を見たいなら Garden です。",
    ctaPrimary: "Projects から始める",
    ctaSecondary: "より明確な議論を読む",
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
      "最初の proof で理由ができたあとに、この map を使えば十分です。三つの route は別棚ではなく、同じ実践の別の状態です。",
    routeGardenTitle: "考えがまだ変わり続けている段階を見るならここです。",
    routeGardenBody:
      "短いノート、断片、つながるメモ。仕事がまだ固まりきっていない段階を読みたいときの場所です。",
    routeWritingTitle: "より明確な主張になった段階を読むならここです。",
    routeWritingBody:
      "決定や system の後ろにある、より明確な議論を読みたい読者のための場所です。",
    routeProjectsTitle: "その考えが実際の仕事になったところを見るならここです。",
    routeProjectsBody:
      "公開した project をまとめています。何を作ったかだけでなく、何を受け止め、何が実行のあとでも残ったかが見えるようにしています。",
    routeGardenCount: "生きている entry",
    routeWritingCount: "公開済み pieces",
    routeProjectsCount: "選ばれた builds",
    routeOpen: "開く",
    routeGardenScan: "思考の途中",
    routeWritingScan: "より明確な考え",
    routeProjectsScan: "実行を通った考え",
    signalEyebrow: "proof から始める",
    signalTitle: "この builder を最短で理解するには、まず一つの ship された system から入る。",
    signalDescription:
      "まず一つの project で conviction を作り、そのあと Writing でより明確な議論を読み、Garden でその手前の動きを見る流れが自然です。",
    featuredTrails: "Projects",
    featuredTrailsTitle: "thinking が execution を通って残る証拠",
    featuredTrailsDescription: "いちばん早く proof を見たい読者のための入口です。",
    readNote: "ノートを読む",
    visitGarden: "ガーデンへ",
    featuredWriting: "Writing",
    featuredWritingTitle: "仕事の後ろにある、より明確な議論",
    featuredWritingDescription: "決定や system の背後にある claim を読みたいなら次はここです。",
    readArticle: "記事を読む",
    browseWriting: "文章を見る",
    selectedProjects: "Garden",
    selectedProjectsTitle: "まだ動いている work の端",
    selectedProjectsDescription: "proof のあとで、その前段階の trail を見たいときに入る場所です。",
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
        primaryHref="/projects"
        primaryLabel={copy.ctaPrimary}
        secondaryHref="/writing"
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
        </div>
      </HomeSection>

      <HomeSection
        eyebrow={copy.routesEyebrow}
        title={copy.routesTitle}
        description={copy.routesDescription}
        className="surface-card"
      >
        <div className="home-routes-grid">
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
        </div>
      </HomeSection>
    </div>
  );
}
