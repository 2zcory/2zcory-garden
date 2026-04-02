import type {Metadata} from "next";

import {RouteHero} from "@/components/collection/route-hero";
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
      "Collaboration, project discussion, and thoughtful replies are welcome. This page should filter intent before it promises access.",
    signalEyebrow: "Channel policy",
    signalTitle: "Direct contact stays intentionally narrow.",
    signalBody:
      "A direct inbox should appear only when there is a reply path that can actually be maintained.",
    metricPaths: "next moves",
    metricChannels: "open channels",
    metricIntent: "contact mode",
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
      "Hợp tác, trao đổi dự án và phản hồi có chiều sâu đều được hoan nghênh. Trang này nên lọc ý định trước khi hứa hẹn quyền truy cập.",
    signalEyebrow: "Chính sách kênh",
    signalTitle: "Kênh liên hệ trực tiếp được giữ hẹp có chủ đích.",
    signalBody:
      "Một inbox trực tiếp chỉ nên xuất hiện khi thật sự có đường phản hồi có thể duy trì.",
    metricPaths: "bước tiếp theo",
    metricChannels: "kênh mở",
    metricIntent: "chế độ liên hệ",
    thoughtfulReplies: "Phản hồi có chiều sâu",
    projectDiscussion: "Trao đổi dự án",
    channelPolicyChip: "Chính sách kênh an toàn cho public",
    policyEyebrow: "Chính sách kênh",
    policyTitle: "Kênh liên hệ trực tiếp được giữ hẹp có chủ đích.",
    policyBody:
      "Một inbox trực tiếp chỉ nên xuất hiện khi thật sự có đường phản hồi có thể duy trì. Cho tới lúc đó, trang này nên trung thực về giới hạn đó thay vì giả vờ rằng đã có sẵn một kênh bền vững.",
    fitEyebrow: "Phù hợp",
    fitTitle: "Liên hệ khi context đã nối vào được.",
    fitBody:
      "Những tin nhắn mạnh nhất thường đi sau một thứ đã được xuất bản ở đây: một ghi chú trong Garden, một bài viết, hoặc một dự án đã cho cuộc trò chuyện một điểm bắt đầu thật.",
    goodReasons: "Những lý do phù hợp để liên hệ",
    goodReasonsBody:
      "Hợp tác, trao đổi dự án, phản hồi về một bài viết cụ thể, hoặc một trao đổi tiếp nối đủ cụ thể tới phần công việc đã được xuất bản.",
    notReady: "Điều chưa sẵn sàng",
    notReadyBody:
      "Một inbox trực tiếp lâu dài hiện chưa được công khai, nên trang này không nên ngụ ý rằng sẽ có phản hồi đảm bảo qua một kênh ẩn hoặc tạm thời.",
    directChannel: "Kênh trực tiếp",
    directTitle: "Email đang mở cho outreach có chủ đích.",
    directBody: "Với hợp tác, trao đổi dự án hoặc phản hồi nghiêm túc, hãy dùng địa chỉ bên dưới.",
    nextMove: "Bước đi phù hợp nhất",
    nextMoveTitle: "Quay lại với ngữ cảnh trước.",
    nextMoveBody:
      "Nếu chưa thể nhắn trực tiếp, bước tiếp theo hữu ích nhất là đi qua phần nội dung giải thích rõ loại công việc, suy nghĩ hoặc kiểu hợp tác mà bạn muốn bàn.",
    readWriting: "Đọc bài viết",
    viewProjects: "Xem dự án",
    browseGarden: "Xem ghi chú Garden",
    expectationEyebrow: "Kỳ vọng",
    expectationTitle: "Trang này nên lọc ý định, không giả vờ sẵn sàng.",
    expectationBody:
      "Site này hiện vẫn ưu tiên xuất bản. Thông tin liên hệ sẽ chỉ mở rộng khi có một đường phản hồi đủ đáng tin để công khai."
  },
  ja: {
    title: "連絡",
    description: "慎重な返信、協業、プロジェクト相談のための連絡面。",
    eyebrow: "連絡",
    heroTitle: "明確な連絡のしかた。",
    heroBody:
      "協業、プロジェクト相談、考え抜かれた返信は歓迎します。このページは access を約束する前に intent を絞るためのものです。",
    signalEyebrow: "チャネル方針",
    signalTitle: "直接連絡は意図的に狭く保つ。",
    signalBody:
      "直接の inbox は、実際に維持できる返信経路があるときにだけ現れるべきです。",
    metricPaths: "next moves",
    metricChannels: "open channels",
    metricIntent: "contact mode",
    thoughtfulReplies: "思慮ある返信",
    projectDiscussion: "プロジェクト相談",
    channelPolicyChip: "公開向けチャネル方針",
    policyEyebrow: "チャネル方針",
    policyTitle: "直接連絡は意図的に狭く保つ。",
    policyBody:
      "直接の inbox は、実際に維持できる返信経路があるときにだけ現れるべきです。それまでは、すでに持続的なチャネルがあるかのように見せるのではなく、この制約を正直に示すべきです。",
    fitEyebrow: "向いている連絡",
    fitTitle: "すでに文脈がつながっているときに連絡する。",
    fitBody:
      "いちばん強いメッセージは、すでにここで公開されている素材のあとに来ます。たとえばガーデンのノート、文章、あるいは会話の出発点になるプロジェクトです。",
    goodReasons: "連絡する良い理由",
    goodReasonsBody:
      "協業、プロジェクト相談、特定の文章への返信、または公開済みの仕事への具体的な follow-up。",
    notReady: "まだ整っていないこと",
    notReadyBody:
      "恒久的な直接 inbox はまだ公開されていないので、このページは隠れた一時的チャネルを通じた確実な返信を示唆するべきではありません。",
    directChannel: "直接チャネル",
    directTitle: "メールは慎重な outreach のために開かれています。",
    directBody:
      "協業、プロジェクト相談、または丁寧な返信のためには、以下のアドレスを使ってください。",
    nextMove: "最適な次の一歩",
    nextMoveTitle: "まず文脈を持って戻る。",
    nextMoveBody:
      "もしまだ直接メッセージができないなら、次に役立つのは、どんな仕事や思考や協業について話したいのかを説明している素材をたどることです。",
    readWriting: "文章を読む",
    viewProjects: "プロジェクトを見る",
    browseGarden: "ガーデンノートを見る",
    expectationEyebrow: "期待値",
    expectationTitle: "このページは意図を絞るべきで、空きがあるふりをしてはいけない。",
    expectationBody:
      "このサイトは今のところ publication-first です。連絡先は、公に出す価値のある信頼できる返信経路があるときだけ広がります。"
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
    <div className="page-stack contact-page">
      <RouteHero
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroBody}
        accent="projects"
        metrics={[
          {label: copy.metricPaths, value: hasDirectContact ? "1" : "3"},
          {label: copy.metricChannels, value: hasDirectContact ? "1" : "0"},
          {label: copy.metricIntent, value: "clear"}
        ]}
        aside={
          <>
            <p className="eyebrow">{copy.signalEyebrow}</p>
            <h2 className="section-heading">{copy.signalTitle}</h2>
            <p className="muted">{copy.signalBody}</p>
          </>
        }
      />

      <section className="surface-card contact-chip-surface">
        <div className="contact-chip-row">
          <span className="badge">{copy.thoughtfulReplies}</span>
          <span className="badge">{copy.projectDiscussion}</span>
          <span className="badge">{copy.channelPolicyChip}</span>
        </div>
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
