import type {AppLocale} from "@/i18n/routing";

export type Profile = {
  name: string;
  descriptor: string;
  bio: string[];
  currentFocus: string[];
  links: Array<{ label: string; href: string }>;
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
  links: Array<{ label: string; href: string }>;
  status: "active" | "shipped";
  featured: boolean;
  availableLocales: AppLocale[];
};

const profileCopy: Record<
  AppLocale,
  {
    descriptor: string;
    bio: string[];
    currentFocus: string[];
  }
> = {
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
  vi: {
    descriptor: "Software engineer đang tạo một ngôi nhà công khai cho suy nghĩ, bài viết và thực thi.",
    bio: [
      "2zcory Garden là một personal operating site nơi các note khám phá, bài viết đã được gọt và những dự án được chọn có thể ở lại cùng nhau thay vì bị tách ra thành các bề mặt nhận diện rời rạc.",
      "Baseline ra mắt được giữ nhỏ có chủ đích: đủ nội dung thật để sản phẩm dễ đọc, đủ cấu trúc để lớn dần theo thời gian, và không thêm máy móc thừa che khuất chính phần công việc."
    ],
    currentFocus: [
      "Xây một web product cá nhân bền vững với mô hình xuất bản rõ ràng",
      "Biến các mảnh note rời rạc thành public trails có thể cứng dần thành writing",
      "Cho thấy bằng chứng thực thi mà không biến mọi thứ thành portfolio theater"
    ]
  }
};

const profile = {
  name: "Tri",
  links: [
    { label: "Projects", href: "/projects" },
    { label: "Writing", href: "/writing" },
    { label: "Garden", href: "/garden" }
  ],
  contactEmail: "",
  availableLocales: ["vi", "en"]
} satisfies Omit<Profile, "descriptor" | "bio" | "currentFocus">;

const notes: Note[] = [
  {
    slug: "notes-that-grow-into-products",
    title: "Notes That Grow Into Products",
    summary: "When recurring fragments stop being scraps and start asking for a public home.",
    body: [
      "Some ideas do not begin as essays. They begin as recurring fragments: a phrase, a model, a project lesson that keeps resurfacing until it becomes hard to ignore.",
      "A garden note earns its place when it preserves that movement instead of pretending the answer arrived fully formed. The value is not polish alone. The value is the visible path."
    ],
    topicLabels: ["knowledge-garden", "product-shaping"],
    relatedNoteSlugs: ["public-proof-without-portfolio-noise"],
    status: "published",
    publishedAt: "2026-03-30",
    featured: true,
    availableLocales: ["en"]
  },
  {
    slug: "public-proof-without-portfolio-noise",
    title: "Public Proof Without Portfolio Noise",
    summary: "How to show execution without flattening every project into a sales card or generic case study.",
    body: [
      "Proof of work becomes weak when it is reduced to outcomes alone. The stronger signal is often the tradeoff, the constraint, or the failure avoided before it became expensive.",
      "A project surface should leave room for execution evidence without letting that evidence replace the larger body of thinking around it."
    ],
    topicLabels: ["projects", "positioning"],
    relatedNoteSlugs: ["notes-that-grow-into-products"],
    status: "published",
    publishedAt: "2026-03-28",
    featured: true,
    availableLocales: ["en"]
  },
  {
    slug: "a-homepage-should-orient-not-perform",
    title: "A Homepage Should Orient, Not Perform",
    summary: "Why the home surface should orient visitors instead of trying to impersonate every other page at once.",
    body: [
      "When the homepage tries to be biography, archive, and showcase all at once, visitors leave with noise rather than direction.",
      "Its stronger job is orientation: explain what this place is, show what kinds of material live here, and offer a few real paths inward."
    ],
    topicLabels: ["ux", "home"],
    relatedNoteSlugs: [],
    status: "published",
    publishedAt: "2026-03-27",
    featured: false,
    availableLocales: ["en"]
  }
];

const articles: Article[] = [
  {
    slug: "building-a-personal-site-as-an-operating-system",
    title: "Building A Personal Site As An Operating System",
    excerpt: "Why a personal site should connect identity, thought, and execution instead of splitting them into isolated presentation layers.",
    body: [
      "Most personal sites split identity, writing, and project work into separate performance layers. The result is legible, but it often feels thin because the pieces do not reinforce each other.",
      "A stronger model is an operating site: one place where ideas can mature, public proof can accumulate, and the current direction of the builder remains visible without constant reinvention."
    ],
    theme: "product-direction",
    status: "published",
    publishedAt: "2026-03-29",
    featured: true,
    availableLocales: ["en"]
  },
  {
    slug: "when-writing-should-not-start-as-an-essay",
    title: "When Writing Should Not Start As An Essay",
    excerpt: "Why some public thought should stay garden-like until the argument is ready to carry real editorial weight.",
    body: [
      "An essay shape can create false clarity too early. Some material becomes better writing only after it has survived as notes for a while and proven that it wants to persist.",
      "Keeping a visible garden is not a lack of editorial quality. It is an honest distinction between thinking in motion and thought that has already settled into a stronger claim."
    ],
    theme: "writing",
    status: "published",
    publishedAt: "2026-03-26",
    featured: true,
    availableLocales: ["en"]
  }
];

const projects: Project[] = [
  {
    slug: "context-os",
    name: "Context OS",
    summary: "A system for durable assistant collaboration, workflow recovery, and disciplined private execution context.",
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
      { label: "Related garden note", href: "/garden/public-proof-without-portfolio-noise" },
      { label: "Related essay", href: "/writing/building-a-personal-site-as-an-operating-system" }
    ],
    status: "active",
    featured: true,
    availableLocales: ["en"]
  },
  {
    slug: "2zcory-garden",
    name: "2zcory Garden",
    summary: "A personal operating site built as a public home for notes, writing, and proof of work.",
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
      { label: "Read the essay", href: "/writing/building-a-personal-site-as-an-operating-system" },
      { label: "See the related note", href: "/garden/notes-that-grow-into-products" }
    ],
    status: "active",
    featured: true,
    availableLocales: ["en"]
  }
];

export function getProfile(locale: AppLocale = "en"): Profile {
  const localizedProfile = profileCopy[locale];

  return {
    ...profile,
    descriptor: localizedProfile.descriptor,
    bio: localizedProfile.bio,
    currentFocus: localizedProfile.currentFocus
  };
}

export function getNotes() {
  return [...notes].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export function getArticles() {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getProjects() {
  return [...projects];
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedContent() {
  return {
    notes: getNotes().filter((note) => note.featured).slice(0, 2),
    articles: getArticles().filter((article) => article.featured).slice(0, 2),
    projects: getProjects().filter((project) => project.featured).slice(0, 2)
  };
}
