import type {Metadata} from "next";

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
    sitePurpose: "Site này dùng để làm gì",
    siteBody:
      "Đây là một ngôi nhà công khai bền vững nơi suy nghĩ khám phá, bài viết có chủ đích và một số project work được chọn có thể ở lại cùng nhau thay vì bị tách thành các bề mặt nhận diện rời rạc. Mục tiêu không phải tự trình diễn liên tục. Mục tiêu là để lại một body of work đủ rõ để đọc.",
    currentFocus: "Trọng tâm hiện tại"
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
    <section className="surface-card page-stack">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{profile.name}</h1>
        <p className="page-copy">{profile.descriptor}</p>
      </div>
      <div className="stack">
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className="detail-body">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="divider" />
      <div className="stack">
        <h2 className="section-heading">{copy.sitePurpose}</h2>
        <p className="muted">{copy.siteBody}</p>
      </div>
      <div className="stack">
        <h2 className="section-heading">{copy.currentFocus}</h2>
        <ul className="list-reset stack">
          {profile.currentFocus.map((item) => (
            <li key={item} className="muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
