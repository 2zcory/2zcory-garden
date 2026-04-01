import type {Metadata} from "next";

import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/routing";
import {getProfile} from "@/lib/content";
import {buildPageMetadata} from "@/lib/metadata";

type PageProps = {
  params: Promise<{locale: AppLocale}>;
};

const COPY = {
  en: {
    title: "Contact",
    description:
      "Direct contact details for thoughtful replies, collaboration, and project discussion.",
    eyebrow: "Contact",
    heroTitle: "A clear way to reach out.",
    heroBody:
      "Collaboration, project discussion, and thoughtful replies are welcome. This surface clarifies what kind of outreach fits the site before it exposes any channel details.",
    thoughtfulReplies: "Thoughtful replies",
    projectDiscussion: "Project discussion",
    channelPolicyChip: "Public-safe channel policy",
    policyEyebrow: "Channel Policy",
    policyTitle: "Direct contact stays intentionally narrow.",
    policyBody:
      "A direct inbox should appear only when there is a reply path that can actually be maintained. Until then, the page should stay honest about the constraint instead of pretending a durable channel already exists.",
    fitEyebrow: "Good Fit",
    fitTitle: "Reach out when the context already connects.",
    fitBody:
      "The strongest messages usually follow material that is already published here: something in the garden, a writing piece, or a project that gives the conversation a real starting point.",
    goodReasons: "Good reasons to contact",
    goodReasonsBody:
      "Collaboration, project discussion, responses to a specific piece of writing, or a concrete follow-up to published work.",
    notReady: "What is not ready yet",
    notReadyBody:
      "A permanent direct inbox is not published right now, so this page should not imply guaranteed replies through a hidden or temporary channel.",
    directChannel: "Direct Channel",
    directTitle: "Email is open for thoughtful outreach.",
    directBody:
      "For collaboration, project discussion, or careful replies, use the address below.",
    nextMove: "Best Next Move",
    nextMoveTitle: "Return with context first.",
    nextMoveBody:
      "If a direct message is not possible yet, the most useful next step is to follow the material that explains what kind of work, thinking, or collaboration you want to discuss.",
    readWriting: "Read writing",
    viewProjects: "View projects",
    browseGarden: "Browse garden notes",
    expectationEyebrow: "Expectation",
    expectationTitle: "The page should filter intent, not fake availability.",
    expectationBody:
      "This site is publication-first for now. Contact details will expand only when there is a reliable response path worth publishing."
  },
  vi: {
    title: "Liên hệ",
    description: "Thông tin liên hệ trực tiếp cho những phản hồi có chủ đích, hợp tác và trao đổi dự án.",
    eyebrow: "Liên hệ",
    heroTitle: "Một cách liên hệ rõ ràng.",
    heroBody:
      "Hợp tác, trao đổi dự án và những phản hồi có chiều sâu đều được hoan nghênh. Bề mặt này dùng để làm rõ kiểu outreach nào phù hợp với site trước khi công khai bất kỳ kênh nào.",
    thoughtfulReplies: "Phản hồi có chiều sâu",
    projectDiscussion: "Trao đổi dự án",
    channelPolicyChip: "Chính sách kênh public-safe",
    policyEyebrow: "Chính sách kênh",
    policyTitle: "Kênh liên hệ trực tiếp được giữ hẹp có chủ đích.",
    policyBody:
      "Một inbox trực tiếp chỉ nên xuất hiện khi thật sự có đường phản hồi có thể duy trì. Cho tới lúc đó, page này nên trung thực về giới hạn đó thay vì giả vờ rằng đã có sẵn một channel bền vững.",
    fitEyebrow: "Phù hợp",
    fitTitle: "Liên hệ khi context đã nối vào được.",
    fitBody:
      "Những tin nhắn mạnh nhất thường đi sau một thứ đã được publish ở đây: một note trong garden, một bài writing, hoặc một project đã cho cuộc trò chuyện một điểm bắt đầu thật.",
    goodReasons: "Những lý do phù hợp để liên hệ",
    goodReasonsBody:
      "Hợp tác, trao đổi dự án, phản hồi về một bài viết cụ thể, hoặc một follow-up đủ cụ thể tới phần công việc đã được publish.",
    notReady: "Điều chưa sẵn sàng",
    notReadyBody:
      "Một inbox trực tiếp lâu dài hiện chưa được publish, nên page này không nên ngụ ý rằng sẽ có phản hồi đảm bảo qua một kênh ẩn hoặc tạm thời.",
    directChannel: "Kênh trực tiếp",
    directTitle: "Email đang mở cho outreach có chủ đích.",
    directBody: "Với hợp tác, trao đổi dự án hoặc phản hồi nghiêm túc, hãy dùng địa chỉ bên dưới.",
    nextMove: "Bước đi phù hợp nhất",
    nextMoveTitle: "Quay lại với context trước.",
    nextMoveBody:
      "Nếu chưa thể nhắn trực tiếp, bước tiếp theo hữu ích nhất là đi qua phần nội dung giải thích rõ loại công việc, suy nghĩ hoặc kiểu hợp tác mà bạn muốn bàn.",
    readWriting: "Đọc writing",
    viewProjects: "Xem projects",
    browseGarden: "Xem garden notes",
    expectationEyebrow: "Kỳ vọng",
    expectationTitle: "Page này nên lọc ý định, không giả vờ sẵn sàng.",
    expectationBody:
      "Site này hiện vẫn publication-first. Thông tin liên hệ sẽ chỉ mở rộng khi có một đường phản hồi đủ đáng tin để công khai."
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

export default async function LocalizedContactPage({params}: PageProps) {
  const {locale} = await params;
  const copy = COPY[locale];
  const profile = getProfile(locale);
  const hasDirectContact = Boolean(profile.contactEmail);

  return (
    <div className="page-stack">
      <section className="surface-card contact-hero-grid">
        <div className="stack">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="page-title">{copy.heroTitle}</h1>
            <p className="page-copy">{copy.heroBody}</p>
          </div>
          <div className="contact-chip-row">
            <span className="badge">{copy.thoughtfulReplies}</span>
            <span className="badge">{copy.projectDiscussion}</span>
            <span className="badge">{copy.channelPolicyChip}</span>
          </div>
        </div>
        <aside className="surface-card contact-policy-card">
          <p className="eyebrow">{copy.policyEyebrow}</p>
          <h2 className="section-heading">{copy.policyTitle}</h2>
          <p className="muted">{copy.policyBody}</p>
        </aside>
      </section>

      <section className="surface-card contact-stage-grid">
        <article className="stack">
          <div>
            <p className="eyebrow">{copy.fitEyebrow}</p>
            <h2 className="section-heading">{copy.fitTitle}</h2>
            <p className="section-intro">{copy.fitBody}</p>
          </div>
          <div className="section-grid contact-intent-grid">
            <article className="content-item">
              <h3>{copy.goodReasons}</h3>
              <p className="muted">{copy.goodReasonsBody}</p>
            </article>
            <article className="content-item">
              <h3>{copy.notReady}</h3>
              <p className="muted">{copy.notReadyBody}</p>
            </article>
          </div>
        </article>

        <aside className="contact-cta-stack">
          {hasDirectContact ? (
            <article className="content-item contact-primary-card">
              <p className="eyebrow">{copy.directChannel}</p>
              <h2 className="section-heading">{copy.directTitle}</h2>
              <p className="muted">{copy.directBody}</p>
              <Link href={`mailto:${profile.contactEmail}`} className="button-link contact-action-link">
                {profile.contactEmail}
              </Link>
            </article>
          ) : (
            <article className="content-item contact-primary-card">
              <p className="eyebrow">{copy.nextMove}</p>
              <h2 className="section-heading">{copy.nextMoveTitle}</h2>
              <p className="muted">{copy.nextMoveBody}</p>
              <div className="contact-link-list">
                <Link href="/writing" className="button-link secondary contact-action-link">
                  {copy.readWriting}
                </Link>
                <Link href="/projects" className="button-link secondary contact-action-link">
                  {copy.viewProjects}
                </Link>
                <Link href="/garden" className="button-link secondary contact-action-link">
                  {copy.browseGarden}
                </Link>
              </div>
            </article>
          )}

          <article className="content-item">
            <p className="eyebrow">{copy.expectationEyebrow}</p>
            <h2 className="section-heading">{copy.expectationTitle}</h2>
            <p className="muted">{copy.expectationBody}</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
