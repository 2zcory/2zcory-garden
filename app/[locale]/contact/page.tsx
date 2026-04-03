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
      "A clear contact page for collaboration, project discussion, and replies that already have context.",
    eyebrow: "Contact",
    heroTitle: "A clear way to reach out.",
    heroBody:
      "Collaboration, project discussion, and thoughtful replies are welcome. The best messages usually start from something already published here.",
    signalEyebrow: "How to use this page",
    signalTitle: "Reach out when there is already a real starting point.",
    signalBody:
      "A note, an essay, or a project usually makes the conversation sharper from the first message.",
    metricPaths: "next moves",
    metricChannels: "open channels",
    metricIntent: "contact mode",
    thoughtfulReplies: "Thoughtful replies",
    projectDiscussion: "Project discussion",
    channelPolicyChip: "Public-safe channel policy",
    policyEyebrow: "Channel Policy",
    policyTitle: "Direct contact stays narrow on purpose.",
    policyBody:
      "A direct inbox only belongs here if there is a reply path that can actually be maintained. Until then, it is better to stay clear than to imply more access than exists.",
    fitEyebrow: "Good Fit",
    fitTitle: "Reach out when the context is already there.",
    fitBody:
      "The strongest messages usually follow something already published here: a note in the garden, a piece of writing, or a project that gives the conversation a real place to begin.",
    goodReasons: "Good reasons to contact",
    goodReasonsBody:
      "Collaboration, project discussion, responses to a specific piece of writing, or a concrete follow-up to published work.",
    notReady: "What is not offered here",
    notReadyBody:
      "This page does not promise guaranteed replies through hidden, temporary, or informal channels.",
    directChannel: "Direct Channel",
    directTitle: "Email is open for careful outreach.",
    directBody:
      "For collaboration, project discussion, or a thoughtful reply, use the address below.",
    nextMove: "Best Next Move",
    nextMoveTitle: "Start with the work, then come back.",
    nextMoveBody:
      "If a direct message is not possible yet, the best next step is to read the material closest to what you want to talk about.",
    readWriting: "Read writing",
    viewProjects: "View projects",
    browseGarden: "Browse garden notes",
    expectationEyebrow: "Expectation",
    expectationTitle: "Clarity matters more than appearing always available.",
    expectationBody:
      "This site is still publication-first. Contact details should only expand when there is a reliable reply path worth publishing."
  },
  vi: {
    title: "Liên hệ",
    description: "Một trang liên hệ rõ ràng cho hợp tác, trao đổi dự án, và những phản hồi đã có sẵn ngữ cảnh.",
    eyebrow: "Liên hệ",
    heroTitle: "Một cách liên hệ rõ ràng.",
    heroBody:
      "Hợp tác, trao đổi dự án và phản hồi có chiều sâu đều được hoan nghênh. Những tin nhắn tốt nhất thường bắt đầu từ một thứ đã có trên site này.",
    signalEyebrow: "Cách dùng trang này",
    signalTitle: "Hãy liên hệ khi đã có một điểm bắt đầu thật.",
    signalBody:
      "Một note, một bài viết, hay một dự án thường giúp cuộc trò chuyện đi đúng trọng tâm ngay từ tin đầu.",
    metricPaths: "bước tiếp theo",
    metricChannels: "kênh mở",
    metricIntent: "chế độ liên hệ",
    thoughtfulReplies: "Phản hồi có chiều sâu",
    projectDiscussion: "Trao đổi dự án",
    channelPolicyChip: "Chính sách kênh an toàn cho public",
    policyEyebrow: "Chính sách kênh",
    policyTitle: "Kênh liên hệ trực tiếp được giữ hẹp có chủ đích.",
    policyBody:
      "Một inbox trực tiếp chỉ nên nằm ở đây khi thật sự có đường phản hồi có thể duy trì. Nếu chưa có, tốt hơn là nói rõ thay vì gợi cảm giác rằng quyền truy cập luôn đang mở.",
    fitEyebrow: "Phù hợp",
    fitTitle: "Liên hệ khi ngữ cảnh đã có sẵn.",
    fitBody:
      "Những tin nhắn mạnh nhất thường đi sau một thứ đã được xuất bản ở đây: một ghi chú trong Garden, một bài viết, hoặc một dự án cho cuộc trò chuyện một chỗ bắt đầu thật.",
    goodReasons: "Những lý do phù hợp để liên hệ",
    goodReasonsBody:
      "Hợp tác, trao đổi dự án, phản hồi về một bài viết cụ thể, hoặc một trao đổi tiếp nối đủ cụ thể tới phần công việc đã được xuất bản.",
    notReady: "Điều không được hứa ở đây",
    notReadyBody:
      "Trang này không hứa phản hồi đảm bảo qua các kênh ẩn, tạm thời, hay không được công khai rõ ràng.",
    directChannel: "Kênh trực tiếp",
    directTitle: "Email đang mở cho những liên hệ có cân nhắc.",
    directBody: "Nếu muốn bàn về hợp tác, dự án, hay phản hồi nghiêm túc, hãy dùng địa chỉ bên dưới.",
    nextMove: "Bước đi phù hợp nhất",
    nextMoveTitle: "Bắt đầu từ phần việc, rồi quay lại đây.",
    nextMoveBody:
      "Nếu chưa thể nhắn trực tiếp, bước đi tốt nhất là đọc phần nội dung gần nhất với thứ bạn muốn bàn.",
    readWriting: "Đọc bài viết",
    viewProjects: "Xem dự án",
    browseGarden: "Xem ghi chú Garden",
    expectationEyebrow: "Kỳ vọng",
    expectationTitle: "Rõ ràng quan trọng hơn việc tỏ ra luôn sẵn sàng.",
    expectationBody:
      "Site này hiện vẫn ưu tiên xuất bản. Thông tin liên hệ chỉ nên mở rộng khi có một đường phản hồi đủ đáng tin để đưa ra công khai."
  },
  ja: {
    title: "連絡",
    description: "協業やプロジェクト相談、すでに文脈のある返信のための連絡ページ。",
    eyebrow: "連絡",
    heroTitle: "明確な連絡のしかた。",
    heroBody:
      "協業、プロジェクト相談、考え抜かれた返信は歓迎します。いちばんよい連絡は、すでにここにある何かから始まります。",
    signalEyebrow: "このページの使い方",
    signalTitle: "ちゃんとした出発点があるときに連絡する。",
    signalBody:
      "ノート、文章、プロジェクトのどれかがあると、最初のメッセージから話がずっと通りやすくなります。",
    metricPaths: "next moves",
    metricChannels: "open channels",
    metricIntent: "contact mode",
    thoughtfulReplies: "思慮ある返信",
    projectDiscussion: "プロジェクト相談",
    channelPolicyChip: "公開向けチャネル方針",
    policyEyebrow: "チャネル方針",
    policyTitle: "直接連絡は意図的に絞っています。",
    policyBody:
      "直接の inbox は、実際に維持できる返信経路があるときだけ置くべきです。まだそこまで整っていないなら、その制約をそのまま示すほうが正直です。",
    fitEyebrow: "向いている連絡",
    fitTitle: "文脈がすでにつながっているときに連絡する。",
    fitBody:
      "いちばん強いメッセージは、すでにここで公開されている素材のあとに来ます。たとえばガーデンのノート、文章、あるいは会話の出発点になるプロジェクトです。",
    goodReasons: "連絡する良い理由",
    goodReasonsBody:
      "協業、プロジェクト相談、特定の文章への返信、または公開済みの仕事への具体的な follow-up。",
    notReady: "ここで約束していないこと",
    notReadyBody:
      "このページは、隠れた一時的チャネルや非公開の経路を通じた確実な返信を約束しません。",
    directChannel: "直接チャネル",
    directTitle: "メールは、よく考えられた連絡のために開いています。",
    directBody:
      "協業、プロジェクト相談、または丁寧な返信のためには、以下のアドレスを使ってください。",
    nextMove: "最適な次の一歩",
    nextMoveTitle: "まず仕事を読み、それから戻る。",
    nextMoveBody:
      "まだ直接メッセージができないなら、まず話したい内容にいちばん近い素材を読むのが次のよい一歩です。",
    readWriting: "文章を読む",
    viewProjects: "プロジェクトを見る",
    browseGarden: "ガーデンノートを見る",
    expectationEyebrow: "期待値",
    expectationTitle: "いつでも開いているように見せるより、はっきりしているほうがいい。",
    expectationBody:
      "このサイトは今のところ publication-first です。連絡先は、公に出せるだけの安定した返信経路があるときにだけ広げるべきです。"
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
