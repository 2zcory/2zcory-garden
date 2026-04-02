import type {Metadata} from "next";

import {RouteHero} from "@/components/collection/route-hero";
import type {AppLocale} from "@/i18n/routing";
import {getProfile} from "@/lib/content";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
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
    siteBody:
      "It is a durable public home where exploratory thought, deliberate writing, and selected project work can remain connected instead of being split into disconnected identity surfaces. The point is not constant self-presentation. The point is to leave behind a legible body of work.",
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
    siteBody:
      "Đây là một ngôi nhà công khai bền vững nơi suy nghĩ khám phá, bài viết có chủ đích và một số dự án được chọn có thể ở lại cùng nhau thay vì bị tách thành các bề mặt nhận diện rời rạc. Mục tiêu không phải tự trình diễn liên tục. Mục tiêu là để lại một thân công việc đủ rõ để đọc.",
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
    siteBody:
      "ここは、探索中の思考、意図的に整えた文章、選ばれた project work を、分断された自己紹介面へ切り離さずにつなぎとめておくための持続的な公開ホームです。目的は絶え間ない自己演出ではありません。読める body of work を残すことです。",
    currentFocus: "現在の焦点"
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

export default async function LocalizedAboutPage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale];
  const profile = getProfile(locale);

  return (
    <section className="page-stack about-page">
      <RouteHero
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroBody}
        accent="garden"
        metrics={[
          {label: copy.metricRoutes, value: "3"},
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
        </article>

        <article className="surface-card about-purpose-card">
          <p className="eyebrow">{copy.sitePurpose}</p>
          <h2 className="section-heading">{copy.siteBody}</h2>
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
