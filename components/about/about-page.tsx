import type {ComponentType, ReactNode} from "react";

import {RouteHero} from "@/components/collection/route-hero";
import type {AppLocale} from "@/i18n/routing";
import {getProfile} from "@/lib/content";

type EntryLink = {
  label: string;
  href: string;
};

type PrincipleItem = {
  title: string;
  body: string;
};

export type AboutCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  signalEyebrow: string;
  signalTitle: string;
  signalBody: string;
  metricRoutes: string;
  metricFocus: string;
  metricMode: string;
  sitePurpose: string;
  siteTitle: string;
  siteBody: string;
  principles: string;
  principleItems: PrincipleItem[];
  entryPoints: string;
  entryIntro: string;
  entryLinks: EntryLink[];
  currentFocus: string;
};

export const ABOUT_COPY: Record<AppLocale, AboutCopy> = {
  en: {
    title: "About",
    description:
      "Background, intent, and product framing for 2zcory Garden as a public home for thought and execution.",
    eyebrow: "About",
    heroTitle: "The person behind the terrain.",
    heroBody:
      "2zcory Garden is not a portfolio shell. It is a personal operating system made public, where thought, writing, and execution stay connected.",
    signalEyebrow: "Orientation",
    signalTitle: "Identity is here to support the work, not replace it.",
    signalBody:
      "The about page should explain why this system exists and what kind of work it is trying to make legible over time.",
    metricRoutes: "routes",
    metricFocus: "focus areas",
    metricMode: "operating mode",
    sitePurpose: "What this site is for",
    siteTitle: "A public operating site, not a profile shell.",
    siteBody:
      "This surface exists to make the work legible fast: what kind of material lives here, why it is organized this way, and where to enter first.",
    principles: "Operating principles",
    principleItems: [
      {
        title: "Public home over profile theater",
        body: "Identity exists here to orient the work, not to become the product."
      },
      {
        title: "Thinking, writing, and execution stay linked",
        body: "Notes, essays, and projects reinforce each other instead of being split into separate presentation layers."
      },
      {
        title: "Small baseline, durable growth",
        body: "The system starts lean enough to maintain and structured enough to grow over time."
      }
    ],
    entryPoints: "Start with the work",
    entryIntro:
      "The strongest way to understand this site is to enter through the material itself, then return to identity only if more context is needed.",
    entryLinks: [
      {label: "View projects", href: "/projects"},
      {label: "Read writing", href: "/writing"},
      {label: "Browse garden", href: "/garden"}
    ],
    currentFocus: "Current focus"
  },
  vi: {
    title: "Giới thiệu",
    description:
      "Bối cảnh, chủ đích và product framing của 2zcory Garden như một ngôi nhà công khai cho suy nghĩ và thực thi.",
    eyebrow: "Giới thiệu",
    heroTitle: "Người đứng sau địa hình này.",
    heroBody:
      "2zcory Garden không phải một vỏ portfolio. Đây là một personal operating system được mở ra công khai, nơi suy nghĩ, bài viết và thực thi được giữ nối với nhau.",
    signalEyebrow: "Định hướng",
    signalTitle: "Phần nhận diện ở đây để đỡ công việc, không thay chỗ cho nó.",
    signalBody:
      "Trang giới thiệu nên giải thích vì sao hệ thống này tồn tại và loại công việc nào nó đang cố làm cho dễ đọc theo thời gian.",
    metricRoutes: "lối vào",
    metricFocus: "trọng tâm",
    metricMode: "chế độ vận hành",
    sitePurpose: "Trang này dùng để làm gì",
    siteTitle: "Một public operating site, không phải vỏ profile.",
    siteBody:
      "Bề mặt này tồn tại để làm phần công việc trở nên dễ đọc thật nhanh: ở đây có loại material nào, vì sao nó được tổ chức theo cách này, và nên đi vào từ đâu trước.",
    principles: "Nguyên tắc vận hành",
    principleItems: [
      {
        title: "Ngôi nhà công khai thay vì profile theater",
        body: "Phần nhận diện ở đây để định hướng công việc, không để tự nó trở thành sản phẩm."
      },
      {
        title: "Suy nghĩ, bài viết và thực thi được giữ nối",
        body: "Note, essay và project gia cố cho nhau thay vì bị tách thành các lớp trình bày riêng."
      },
      {
        title: "Baseline nhỏ, tăng trưởng bền",
        body: "Hệ thống bắt đầu đủ gọn để tự duy trì và đủ có cấu trúc để lớn dần theo thời gian."
      }
    ],
    entryPoints: "Bắt đầu từ phần công việc",
    entryIntro:
      "Cách mạnh nhất để hiểu site này là đi vào từ chính material, rồi chỉ quay lại phần nhận diện khi cần thêm context.",
    entryLinks: [
      {label: "Xem dự án", href: "/projects"},
      {label: "Đọc bài viết", href: "/writing"},
      {label: "Xem garden", href: "/garden"}
    ],
    currentFocus: "Trọng tâm hiện tại"
  },
  ja: {
    title: "概要",
    description:
      "2zcory Garden を、思考と実装のための公開ホームとして位置づける背景と意図。",
    eyebrow: "概要",
    heroTitle: "この地形の後ろにいる人。",
    heroBody:
      "2zcory Garden は portfolio shell ではありません。思考と文章と実装をつないだ、公開された personal operating system です。",
    signalEyebrow: "オリエンテーション",
    signalTitle: "identity は work を支えるためにあり、置き換えるためではない。",
    signalBody:
      "about page は、この仕組みがなぜ存在するのか、そして時間を通して何を読めるようにしたいのかを説明するべきです。",
    metricRoutes: "routes",
    metricFocus: "focus areas",
    metricMode: "operating mode",
    sitePurpose: "このサイトの役割",
    siteTitle: "profile shell ではなく、公開された operating site。",
    siteBody:
      "この面の役割は、どんな material がここにあり、なぜこの構造なのか、そしてどこから入るべきかを、すばやく読めるようにすることです。",
    principles: "運用原則",
    principleItems: [
      {
        title: "profile theater より公開ホーム",
        body: "identity は work を案内するためにあり、主役になるためではありません。"
      },
      {
        title: "thought と writing と execution を分けない",
        body: "note、essay、project が別々の見せ方に分断されず、互いを補強する構造です。"
      },
      {
        title: "小さく始めて持続的に伸ばす",
        body: "維持できるだけ十分に小さく、時間とともに育てられるだけ十分に構造化されています。"
      }
    ],
    entryPoints: "まず work から入る",
    entryIntro:
      "このサイトを理解する最も強い方法は、identity からではなく material そのものから入り、必要なときだけ背景へ戻ることです。",
    entryLinks: [
      {label: "project を見る", href: "/projects"},
      {label: "文章を読む", href: "/writing"},
      {label: "garden を見る", href: "/garden"}
    ],
    currentFocus: "現在の焦点"
  }
};

type AboutPageProps = {
  locale: AppLocale;
  LinkComponent: ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
  }>;
};

export function AboutPage({locale, LinkComponent}: AboutPageProps) {
  const copy = ABOUT_COPY[locale];
  const profile = getProfile(locale);

  return (
    <section className="page-stack about-page">
      <RouteHero
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroBody}
        accent="garden"
        metrics={[
          {label: copy.metricRoutes, value: String(copy.entryLinks.length)},
          {label: copy.metricFocus, value: String(profile.currentFocus.length)},
          {label: copy.metricMode, value: "public"}
        ]}
        aside={
          <>
            <p className="eyebrow">{copy.signalEyebrow}</p>
            <h2 className="section-heading">{copy.signalTitle}</h2>
            <p className="muted">{copy.signalBody}</p>
          </>
        }
      />

      <section className="about-grid">
        <article className="surface-card about-profile-card">
          <p className="eyebrow">{profile.name}</p>
          <h2 className="section-heading">{profile.descriptor}</h2>
          <div className="detail-body stack">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="about-entry-panel">
            <p className="eyebrow">{copy.entryPoints}</p>
            <p className="section-intro about-entry-intro">{copy.entryIntro}</p>
            <div className="about-entry-links">
              {copy.entryLinks.map((link) => (
                <LinkComponent
                  key={link.href}
                  href={link.href}
                  className="button-link secondary about-entry-link"
                >
                  {link.label}
                </LinkComponent>
              ))}
            </div>
          </div>
        </article>

        <article className="surface-card about-purpose-card about-system-card">
          <p className="eyebrow">{copy.sitePurpose}</p>
          <h2 className="section-heading">{copy.siteTitle}</h2>
          <p className="section-intro about-system-intro">{copy.siteBody}</p>

          <div className="about-principles">
            <p className="eyebrow">{copy.principles}</p>
            <div className="about-principles-list">
              {copy.principleItems.map((item, index) => (
                <article key={item.title} className="about-principle-item">
                  <span className="about-focus-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="surface-card about-focus-card">
        <p className="eyebrow">{copy.currentFocus}</p>
        <div className="about-focus-list">
          {profile.currentFocus.map((item, index) => (
            <article key={item} className="about-focus-item">
              <span className="about-focus-index">{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
