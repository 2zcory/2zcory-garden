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
    description: "A short introduction to the person and the work behind 2zcory Garden.",
    eyebrow: "About",
    heroTitle: "A short note on who this is for and who made it.",
    heroBody:
      "This site is a public home for notes, essays, and projects. It is personal in voice, but the work stays in front.",
    signalEyebrow: "Reading note",
    signalTitle: "Start with the work, then come back here for context.",
    signalBody:
      "If you want the quickest sense of the site, go to Projects, Writing, or Garden first. This page is here for the background around them.",
    metricRoutes: "routes",
    metricFocus: "focus areas",
    metricMode: "operating mode",
    sitePurpose: "What this site holds",
    siteTitle: "A public home for work that is still connected to the person behind it.",
    siteBody:
      "The site keeps notes, essays, and projects close to one another so the reader can move between early thinking, clearer writing, and finished work without switching contexts.",
    principles: "What it leans toward",
    principleItems: [
      {
        title: "Work first",
        body: "The personal layer matters, but it should help the work read more clearly, not compete with it."
      },
      {
        title: "One line of thought, shown at different stages",
        body: "Notes, essays, and projects sit near each other because they often belong to the same thread."
      },
      {
        title: "Small enough to keep alive",
        body: "The site stays light on purpose so it can keep growing without turning into administration."
      }
    ],
    entryPoints: "Start with the work",
    entryIntro:
      "The clearest way to understand the site is still to read something first, then come back here if you want the longer frame.",
    entryLinks: [
      {label: "View projects", href: "/projects"},
      {label: "Read writing", href: "/writing"},
      {label: "Browse garden", href: "/garden"}
    ],
    currentFocus: "Current focus"
  },
  vi: {
    title: "Giới thiệu",
    description: "Một phần giới thiệu ngắn về người làm ra 2zcory Garden và kiểu công việc có ở đây.",
    eyebrow: "Giới thiệu",
    heroTitle: "Một ghi chú ngắn về người làm ra site này và nó dành cho ai.",
    heroBody:
      "Đây là một ngôi nhà công khai cho note, bài viết và dự án. Giọng của nó là cá nhân, nhưng phần công việc vẫn đứng phía trước.",
    signalEyebrow: "Cách đọc",
    signalTitle: "Nên bắt đầu từ công việc trước, rồi quay lại đây nếu cần thêm bối cảnh.",
    signalBody:
      "Nếu muốn hiểu nhanh site này, hãy vào Projects, Writing, hoặc Garden trước. Trang này chỉ thêm phần nền phía sau.",
    metricRoutes: "lối vào",
    metricFocus: "trọng tâm",
    metricMode: "chế độ vận hành",
    sitePurpose: "Site này giữ những gì",
    siteTitle: "Một ngôi nhà công khai cho công việc, vẫn còn dính với con người làm ra nó.",
    siteBody:
      "Site giữ note, bài viết, và dự án ở gần nhau để người đọc có thể đi từ ý còn mở sang phần đã gọt, rồi sang việc đã làm, mà không phải đổi bối cảnh quá nhiều.",
    principles: "Những gì nó nghiêng về",
    principleItems: [
      {
        title: "Công việc đứng trước",
        body: "Phần cá nhân vẫn cần, nhưng nó nên giúp đọc phần việc rõ hơn chứ không tranh vai với nó."
      },
      {
        title: "Một đường suy nghĩ, đi qua nhiều trạng thái",
        body: "Note, bài viết và dự án được đặt gần nhau vì nhiều khi chúng thuộc cùng một mạch."
      },
      {
        title: "Vừa đủ nhỏ để giữ nó sống",
        body: "Site được giữ nhẹ có chủ đích, để nó có thể lớn dần mà không biến thành phần việc hành chính."
      }
    ],
    entryPoints: "Bắt đầu từ phần công việc",
    entryIntro:
      "Cách dễ hiểu nhất vẫn là đọc một thứ gì đó trước, rồi quay lại đây nếu muốn biết khung dài hơn.",
    entryLinks: [
      {label: "Xem dự án", href: "/projects"},
      {label: "Đọc bài viết", href: "/writing"},
      {label: "Xem garden", href: "/garden"}
    ],
    currentFocus: "Trọng tâm hiện tại"
  },
  ja: {
    title: "概要",
    description: "2zcory Garden を作った人と、この場所の使い方を短く紹介するページ。",
    eyebrow: "概要",
    heroTitle: "誰が作ったのか、そして誰のための場所か。",
    heroBody:
      "ここはノートと文章とプロジェクトのための公開ホームです。個人の声はありますが、前に出るのは仕事のほうです。",
    signalEyebrow: "読み方",
    signalTitle: "まず work を見て、必要ならここに戻るのがいちばん早い。",
    signalBody:
      "手早く掴みたいなら、Projects、Writing、Garden から先に入ってください。このページはその背景を足すためにあります。",
    metricRoutes: "routes",
    metricFocus: "focus areas",
    metricMode: "operating mode",
    sitePurpose: "このサイトにあるもの",
    siteTitle: "作った人の気配を残しつつ、仕事を前に出すための公開ホーム。",
    siteBody:
      "ノート、文章、プロジェクトを近くに置くことで、考えの初期段階から形になった仕事までを行き来しやすくしています。",
    principles: "この場所が寄っていく方向",
    principleItems: [
      {
        title: "仕事を先に置く",
        body: "個人の輪郭は必要ですが、主役になるためではなく、仕事を読みやすくするためにあります。"
      },
      {
        title: "ひとつの思考を別の段階で見せる",
        body: "note、文章、project は切り離された別物ではなく、同じ流れの異なる段階として並びます。"
      },
      {
        title: "生かし続けられる小ささ",
        body: "管理のために重くせず、続けながら育てられる軽さを保っています。"
      }
    ],
    entryPoints: "まず work から入る",
    entryIntro:
      "いちばんわかりやすいのは、まず何かひとつ読んで、そのあと必要ならここへ戻ることです。",
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
