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
      "A clear contact page for collaboration or replies that already connect to the work published here.",
    eyebrow: "Contact",
    heroTitle: "Reach out when the work already gives us a place to start.",
    heroBody:
      "The strongest messages usually begin from something already visible on the site: a note in motion, a clearer piece of writing, or a project that has already landed.",
    signalEyebrow: "How to use this page",
    signalTitle: "The best contact starts from the work, not around it.",
    signalBody:
      "Garden, Writing, and Projects already show different states of the same public practice. Starting there usually makes the conversation sharper from the first message.",
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
    fitTitle: "Reach out when there is already a shared point of contact.",
    fitBody:
      "The strongest messages usually follow something already published here: a note still being worked through, a piece of writing with a clearer claim, or a project that gives the conversation a real proof point.",
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
    nextMoveTitle: "Start with the part of the work closest to your reason for writing.",
    nextMoveBody:
      "If a direct message is not possible yet, the best next step is to start from the route closest to what you want to talk about, then come back with that context in hand.",
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
    description: "Một trang liên hệ rõ ràng cho hợp tác hoặc phản hồi đã thật sự nối được với phần việc được xuất bản ở đây.",
    eyebrow: "Liên hệ",
    heroTitle: "Hãy liên hệ khi phần việc đã cho mình một chỗ để bắt đầu.",
    heroBody:
      "Những tin nhắn mạnh nhất thường bắt đầu từ một thứ đã thấy được trên site này: một note còn đang mở, một bài viết đã rõ ý hơn, hoặc một dự án đã chạm phần thực thi.",
    signalEyebrow: "Cách dùng trang này",
    signalTitle: "Cuộc liên hệ tốt nhất bắt đầu từ phần việc, không phải đi vòng ngoài nó.",
    signalBody:
      "Garden, Writing và Projects đã cho thấy những trạng thái khác nhau của cùng một practice công khai. Bắt đầu từ đó thường làm cuộc trò chuyện sắc hơn ngay từ tin đầu.",
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
    fitTitle: "Liên hệ khi đã có một điểm chạm chung.",
    fitBody:
      "Những tin nhắn mạnh nhất thường đi sau một thứ đã được xuất bản ở đây: một note còn đang được nghĩ tiếp, một bài viết đã có ý rõ hơn, hoặc một dự án cho cuộc trò chuyện một proof point thật.",
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
    nextMoveTitle: "Bắt đầu từ phần việc gần nhất với lý do bạn muốn viết.",
    nextMoveBody:
      "Nếu chưa thể nhắn trực tiếp, bước đi tốt nhất là đi vào route gần nhất với thứ bạn muốn bàn, rồi quay lại với phần ngữ cảnh đó trong tay.",
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
    description: "協業や返信が、すでにここで公開された work とつながっているときのための連絡ページ。",
    eyebrow: "連絡",
    heroTitle: "まず work が出発点を作っているときに連絡する。",
    heroBody:
      "いちばん強いメッセージは、すでにこのサイトで見えている何かから始まります。まだ動いているノート、より明確な文章、あるいはすでに着地したプロジェクトです。",
    signalEyebrow: "このページの使い方",
    signalTitle: "よい連絡は、work から始まります。",
    signalBody:
      "Garden、Writing、Projects は、同じ公開された実践の別の状態です。そこから始めると、最初のメッセージから話が通りやすくなります。",
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
    fitTitle: "すでに共有された接点があるときに連絡する。",
    fitBody:
      "いちばん強いメッセージは、すでにここで公開されている素材のあとに来ます。たとえば、まだ動いているノート、より明確な文章、あるいは conversation の proof point になる project です。",
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
    nextMoveTitle: "書きたい理由にいちばん近い work から始める。",
    nextMoveBody:
      "まだ直接メッセージができないなら、まず話したい内容にいちばん近い route から入り、その文脈を持ってここへ戻るのが次のよい一歩です。",
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
    description: copy.description,
    locale,
    pathname: "/contact"
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
