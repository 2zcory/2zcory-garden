import type {AppLocale} from "@/i18n/routing";

type LocalizedLink = {
  label: string;
  href: string;
};

type LocalizedProfileFields = {
  descriptor: string;
  bio: string[];
  currentFocus: string[];
};

type LocalizedNoteFields = {
  title: string;
  summary: string;
  body: string[];
  topicLabels: string[];
};

type LocalizedArticleFields = {
  title: string;
  excerpt: string;
  body: string[];
  theme: string;
};

type LocalizedProjectFields = {
  name: string;
  summary: string;
  role: string;
  problem: string;
  approach: string;
  outcomes: string[];
  links: LocalizedLink[];
};

type TranslationMap<T> = Partial<Record<AppLocale, T>>;

export type Profile = {
  name: string;
  descriptor: string;
  bio: string[];
  currentFocus: string[];
  links: LocalizedLink[];
  contactEmail: string;
  availableLocales: AppLocale[];
};

export type Note = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  topicLabels: string[];
  relatedNoteSlugs: string[];
  status: "published";
  publishedAt: string;
  featured: boolean;
  availableLocales: AppLocale[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  theme: string;
  status: "published";
  publishedAt: string;
  featured: boolean;
  availableLocales: AppLocale[];
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  problem: string;
  approach: string;
  outcomes: string[];
  links: LocalizedLink[];
  status: "active" | "shipped";
  featured: boolean;
  availableLocales: AppLocale[];
};

type NoteEntry = Omit<Note, "title" | "summary" | "body" | "topicLabels"> & {
  content: LocalizedNoteFields;
  translations?: TranslationMap<LocalizedNoteFields>;
};

type ArticleEntry = Omit<Article, "title" | "excerpt" | "body" | "theme"> & {
  content: LocalizedArticleFields;
  translations?: TranslationMap<LocalizedArticleFields>;
};

type ProjectEntry = Omit<Project, "name" | "summary" | "role" | "problem" | "approach" | "outcomes" | "links"> & {
  content: LocalizedProjectFields;
  translations?: TranslationMap<LocalizedProjectFields>;
};

const profileCopy: Record<AppLocale, LocalizedProfileFields> = {
  en: {
    descriptor: "Software engineer shaping a public home for thought, writing, and execution.",
    bio: [
      "2zcory Garden is a personal operating site where exploratory notes, shaped writing, and selected projects can remain connected instead of being split across disconnected identity surfaces.",
      "The launch baseline stays intentionally small: enough real content to make the product legible, enough structure to grow over time, and no extra machinery that would bury the work itself."
    ],
    currentFocus: [
      "Building a durable personal web product with a clear publishing model",
      "Turning scattered notes into public trails that can later harden into writing",
      "Showing proof of execution without collapsing into portfolio theater"
    ]
  },
  ja: {
    descriptor: "思考と文章と実装のための公開ホームを形にしているソフトウェアエンジニア。",
    bio: [
      "2zcory Garden は、探索中のノート、形を整えた文章、選ばれたプロジェクトを、ばらばらの自己紹介面に分断せず一つにつなぎとめるための、公開された personal operating system です。",
      "立ち上げ時の基準は意図的に小さく保たれています。プロダクトの輪郭が読めるだけの実在する内容、時間とともに伸ばせるだけの構造、そして仕事そのものを埋もれさせる余計な仕組みを持ち込まないことが条件です。"
    ],
    currentFocus: [
      "公開の出版モデルを持つ、持続可能な個人ウェブプロダクトを作ること",
      "散らばったノートを、後に文章へ固まっていく public trail に変えること",
      "すべてを portfolio theater にせず、実行の証拠を見せること"
    ]
  },
  vi: {
    descriptor: "Software engineer đang tạo một ngôi nhà công khai cho suy nghĩ, bài viết và thực thi.",
    bio: [
      "2zcory Garden là một personal operating system được mở ra công khai, nơi các ghi chú khám phá, bài viết đã được gọt và những dự án được chọn có thể ở lại cùng nhau thay vì bị tách ra thành các bề mặt nhận diện rời rạc.",
      "Baseline ra mắt được giữ nhỏ có chủ đích: đủ nội dung thật để sản phẩm dễ đọc, đủ cấu trúc để lớn dần theo thời gian, và không thêm máy móc thừa che khuất chính phần công việc."
    ],
    currentFocus: [
      "Xây một web product cá nhân bền vững với mô hình xuất bản rõ ràng",
      "Biến các mảnh ghi chú rời rạc thành các đường mòn công khai có thể cứng dần thành bài viết",
      "Cho thấy bằng chứng thực thi mà không biến mọi thứ thành portfolio theater"
    ]
  }
};

const profile = {
  name: "Tri",
  links: [
    {label: "Projects", href: "/projects"},
    {label: "Writing", href: "/writing"},
    {label: "Garden", href: "/garden"}
  ],
  contactEmail: "",
  availableLocales: ["vi", "en", "ja"]
} satisfies Omit<Profile, "descriptor" | "bio" | "currentFocus">;

const notes: NoteEntry[] = [
  {
    slug: "notes-that-grow-into-products",
    content: {
      title: "Notes That Grow Into Products",
      summary: "When recurring fragments stop being scraps and start asking for a public home.",
      body: [
        "Some ideas do not begin as essays. They begin as recurring fragments: a phrase, a model, a project lesson that keeps resurfacing until it becomes hard to ignore.",
        "A garden note earns its place when it preserves that movement instead of pretending the answer arrived fully formed. The value is not polish alone. The value is the visible path."
      ],
      topicLabels: ["knowledge-garden", "product-shaping"]
    },
    translations: {
      vi: {
        title: "Những Ghi Chú Lớn Dần Thành Sản Phẩm",
        summary: "Khi những mảnh lặp lại ngừng là mẩu nháp và bắt đầu đòi một ngôi nhà công khai.",
        body: [
          "Có những ý tưởng không bắt đầu như bài viết. Chúng bắt đầu như các mảnh lặp lại: một cụm từ, một mô hình, một bài học dự án cứ quay về cho tới khi trở nên khó có thể bỏ qua.",
          "Một ghi chú Garden xứng đáng tồn tại khi nó giữ lại được chuyển động đó thay vì giả vờ câu trả lời đã đến trong hình dạng hoàn chỉnh. Giá trị không chỉ nằm ở độ bóng. Giá trị nằm ở con đường còn nhìn thấy được."
        ],
        topicLabels: ["knowledge-garden", "product-shaping"]
      }
    },
    relatedNoteSlugs: ["public-proof-without-portfolio-noise"],
    status: "published",
    publishedAt: "2026-03-30",
    featured: true,
    availableLocales: ["vi", "en"]
  },
  {
    slug: "public-proof-without-portfolio-noise",
    content: {
      title: "Public Proof Without Portfolio Noise",
      summary: "How to show execution without flattening every project into a sales card or generic case study.",
      body: [
        "Proof of work becomes weak when it is reduced to outcomes alone. The stronger signal is often the tradeoff, the constraint, or the failure avoided before it became expensive.",
        "A project surface should leave room for execution evidence without letting that evidence replace the larger body of thinking around it."
      ],
      topicLabels: ["projects", "positioning"]
    },
    relatedNoteSlugs: ["notes-that-grow-into-products"],
    status: "published",
    publishedAt: "2026-03-28",
    featured: true,
    availableLocales: ["en"]
  },
  {
    slug: "a-homepage-should-orient-not-perform",
    content: {
      title: "A Homepage Should Orient, Not Perform",
      summary: "Why the home surface should orient visitors instead of trying to impersonate every other page at once.",
      body: [
        "When the homepage tries to be biography, archive, and showcase all at once, visitors leave with noise rather than direction.",
        "Its stronger job is orientation: explain what this place is, show what kinds of material live here, and offer a few real paths inward."
      ],
      topicLabels: ["ux", "home"]
    },
    relatedNoteSlugs: [],
    status: "published",
    publishedAt: "2026-03-27",
    featured: false,
    availableLocales: ["en"]
  }
];

const articles: ArticleEntry[] = [
  {
    slug: "building-a-personal-site-as-an-operating-system",
    content: {
      title: "Building A Personal Site As An Operating System",
      excerpt:
        "Why a personal site should connect identity, thought, and execution instead of splitting them into isolated presentation layers.",
      body: [
        "Most personal sites split identity, writing, and project work into separate performance layers. The result is legible, but it often feels thin because the pieces do not reinforce each other.",
        "A stronger model is an operating site: one place where ideas can mature, public proof can accumulate, and the current direction of the builder remains visible without constant reinvention."
      ],
      theme: "product-direction"
    },
    translations: {
      vi: {
        title: "Xây Một Personal Site Như Một Operating System",
        excerpt:
          "Vì sao một personal site nên nối identity, thought và execution thay vì tách chúng thành những lớp trình bày rời rạc.",
        body: [
          "Phần lớn personal site tách identity, writing và project work thành các lớp trình diễn riêng. Kết quả dễ đọc, nhưng thường mỏng vì các mảnh đó không thật sự gia cố cho nhau.",
          "Một mô hình mạnh hơn là operating system cá nhân được mở ra công khai: một nơi để ý tưởng trưởng thành, bằng chứng công khai tích lũy, và hướng đi hiện tại của người làm vẫn hiện ra mà không cần tự tái phát minh liên tục."
        ],
        theme: "định hướng sản phẩm"
      },
      ja: {
        title: "Operating System として個人サイトを作る",
        excerpt:
          "個人サイトは identity と thought と execution を分断された見せ方にせず、ひとつにつなぐべきだという話。",
        body: [
          "多くの個人サイトは identity、writing、project work を別々の見せ方へ切り分けます。読みやすくはなりますが、各要素が互いを補強しないため、全体としては薄く感じられがちです。",
          "より強いモデルは operating site です。そこでアイデアは成熟し、公開された証拠は積み上がり、作り手の現在地も、何度も自分を作り直さなくても見えるままに保たれます。"
        ],
        theme: "プロダクト方向"
      }
    },
    status: "published",
    publishedAt: "2026-03-29",
    featured: true,
    availableLocales: ["vi", "en", "ja"]
  },
  {
    slug: "when-writing-should-not-start-as-an-essay",
    content: {
      title: "When Writing Should Not Start As An Essay",
      excerpt:
        "Why some public thought should stay garden-like until the argument is ready to carry real editorial weight.",
      body: [
        "An essay shape can create false clarity too early. Some material becomes better writing only after it has survived as notes for a while and proven that it wants to persist.",
        "Keeping a visible garden is not a lack of editorial quality. It is an honest distinction between thinking in motion and thought that has already settled into a stronger claim."
      ],
      theme: "writing"
    },
    status: "published",
    publishedAt: "2026-03-26",
    featured: true,
    availableLocales: ["en"]
  }
];

const projects: ProjectEntry[] = [
  {
    slug: "context-os",
    content: {
      name: "Context OS",
      summary:
        "A system for durable assistant collaboration, workflow recovery, and disciplined private execution context.",
      role: "Product shaping, workflow design, implementation",
      problem:
        "Long-running AI-assisted work tends to lose continuity, execution standards, and trust boundaries across sessions and repositories.",
      approach:
        "Build a layered context model with a startup baseline, private project repositories, explicit workflow playbooks, and repeatable trust checks that survive session resets.",
      outcomes: [
        "Durable startup and repo-execution workflows",
        "Cleaner handoff between public code repos and private context repos",
        "A repeatable way to move from planning to implementation without losing context"
      ],
      links: [
        {label: "Related garden note", href: "/garden/public-proof-without-portfolio-noise"},
        {label: "Related essay", href: "/writing/building-a-personal-site-as-an-operating-system"}
      ]
    },
    status: "active",
    featured: true,
    availableLocales: ["en"]
  },
  {
    slug: "2zcory-garden",
    content: {
      name: "2zcory Garden",
      summary: "A personal operating system made public as a home for notes, writing, and proof of work.",
      role: "Product direction, IA, implementation baseline",
      problem:
        "Generic personal sites flatten evolving thought into static profile pages, portfolio summaries, or disconnected publishing surfaces.",
      approach:
        "Create distinct surfaces for garden notes, writing, projects, and identity while keeping the first release small enough for one-owner maintenance.",
      outcomes: [
        "Rebuilt product foundation from zero",
        "A garden-led content model that differentiates notes, writing, and projects",
        "A public-first Next.js baseline with route-level metadata, responsive behavior, and smoke-verified public routes"
      ],
      links: [
        {label: "Read the essay", href: "/writing/building-a-personal-site-as-an-operating-system"},
        {label: "See the related note", href: "/garden/notes-that-grow-into-products"}
      ]
    },
    translations: {
      vi: {
        name: "2zcory Garden",
        summary:
          "Một personal operating system được mở ra công khai như ngôi nhà cho ghi chú, bài viết và bằng chứng thực thi.",
        role: "Định hướng sản phẩm, IA, nền triển khai",
        problem:
          "Các personal site dạng generic thường làm phẳng suy nghĩ đang phát triển thành profile page tĩnh, portfolio summary hoặc các bề mặt publish tách rời.",
        approach:
          "Tạo các bề mặt riêng cho Garden, Writing, Projects và phần nhận diện, đồng thời giữ release đầu đủ nhỏ để một người có thể tự duy trì.",
        outcomes: [
          "Xây lại nền sản phẩm từ con số không",
          "Một content model dẫn bởi Garden để phân biệt ghi chú, bài viết và dự án",
          "Một nền Next.js public-first với metadata theo route, responsive behavior và smoke-verified public routes"
        ],
        links: [
          {label: "Đọc bài viết liên quan", href: "/writing/building-a-personal-site-as-an-operating-system"},
          {label: "Xem ghi chú liên quan", href: "/garden/notes-that-grow-into-products"}
        ]
      }
    },
    status: "active",
    featured: true,
    availableLocales: ["vi", "en"]
  }
];

function localizeFields<T>(content: T, translations: TranslationMap<T> | undefined, locale: AppLocale) {
  if (locale === "en") {
    return content;
  }

  return translations?.[locale] ?? content;
}

function localizeNote(entry: NoteEntry, locale: AppLocale): Note {
  const content = localizeFields(entry.content, entry.translations, locale);

  return {
    slug: entry.slug,
    title: content.title,
    summary: content.summary,
    body: content.body,
    topicLabels: content.topicLabels,
    relatedNoteSlugs: entry.relatedNoteSlugs,
    status: entry.status,
    publishedAt: entry.publishedAt,
    featured: entry.featured,
    availableLocales: entry.availableLocales
  };
}

function localizeArticle(entry: ArticleEntry, locale: AppLocale): Article {
  const content = localizeFields(entry.content, entry.translations, locale);

  return {
    slug: entry.slug,
    title: content.title,
    excerpt: content.excerpt,
    body: content.body,
    theme: content.theme,
    status: entry.status,
    publishedAt: entry.publishedAt,
    featured: entry.featured,
    availableLocales: entry.availableLocales
  };
}

function localizeProject(entry: ProjectEntry, locale: AppLocale): Project {
  const content = localizeFields(entry.content, entry.translations, locale);

  return {
    slug: entry.slug,
    name: content.name,
    summary: content.summary,
    role: content.role,
    problem: content.problem,
    approach: content.approach,
    outcomes: content.outcomes,
    links: content.links,
    status: entry.status,
    featured: entry.featured,
    availableLocales: entry.availableLocales
  };
}

export function getProfile(locale: AppLocale = "en"): Profile {
  const localizedProfile = profileCopy[locale];

  return {
    ...profile,
    descriptor: localizedProfile.descriptor,
    bio: localizedProfile.bio,
    currentFocus: localizedProfile.currentFocus
  };
}

export function getNotes(locale: AppLocale = "en") {
  return [...notes]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((note) => localizeNote(note, locale));
}

export function getNote(slug: string, locale: AppLocale = "en") {
  const note = notes.find((entry) => entry.slug === slug);
  return note ? localizeNote(note, locale) : undefined;
}

export function getArticles(locale: AppLocale = "en") {
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((article) => localizeArticle(article, locale));
}

export function getArticle(slug: string, locale: AppLocale = "en") {
  const article = articles.find((entry) => entry.slug === slug);
  return article ? localizeArticle(article, locale) : undefined;
}

export function getProjects(locale: AppLocale = "en") {
  return [...projects].map((project) => localizeProject(project, locale));
}

export function getProject(slug: string, locale: AppLocale = "en") {
  const project = projects.find((entry) => entry.slug === slug);
  return project ? localizeProject(project, locale) : undefined;
}

export function getFeaturedContent(locale: AppLocale = "en") {
  return {
    notes: getNotes(locale)
      .filter((note) => note.featured)
      .slice(0, 2),
    articles: getArticles(locale)
      .filter((article) => article.featured)
      .slice(0, 2),
    projects: getProjects(locale)
      .filter((project) => project.featured)
      .slice(0, 2)
  };
}
