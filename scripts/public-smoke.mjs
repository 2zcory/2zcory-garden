const DEFAULT_BASE_URL = "https://2zcory-garden.vercel.app";

const checks = [
  { path: "/", marker: "Một nơi cho note, bài viết và những dự án đã thành hình." },
  { path: "/vi", marker: "Một nơi cho note, bài viết và những dự án đã thành hình." },
  { path: "/en", marker: "A place for notes, essays, and shipped work." },
  { path: "/ja", marker: "ノートと文章と、形になった仕事のための場所。" },
  { path: "/vi/about", marker: "Site này giữ những gì" },
  { path: "/en/about", marker: "What this site holds" },
  { path: "/ja/about", marker: "このサイトにあるもの" },
  { path: "/vi/projects", marker: "Khám phá Context OS" },
  { path: "/en/projects", marker: "Explore Context OS" },
  { path: "/vi/projects/context-os", marker: "Context OS" },
  { path: "/en/projects/2zcory-garden", marker: "2zcory Garden" },
  { path: "/vi/writing", marker: "Những bài đã lắng đủ để tự đứng thành một bài." },
  { path: "/en/writing", marker: "Essays that have settled enough to stand on their own." },
  { path: "/ja/writing", marker: "ひとつの文章として読めるところまで落ち着いたもの。" },
  {
    path: "/vi/writing/building-a-personal-site-as-an-operating-system",
    marker: "Xây Một Personal Site Như Một Operating System"
  },
  {
    path: "/en/writing/building-a-personal-site-as-an-operating-system",
    marker: "Building A Personal Site As An Operating System"
  },
  {
    path: "/ja/writing/building-a-personal-site-as-an-operating-system",
    marker: "Operating System として個人サイトを作る"
  },
  {
    path: "/en/writing/when-writing-should-not-start-as-an-essay",
    marker: "When Writing Should Not Start As An Essay"
  },
  { path: "/vi/garden", marker: "Những note vẫn còn đang chuyển động." },
  { path: "/en/garden", marker: "Notes that are still moving." },
  { path: "/ja/garden", marker: "まだ動いているノート。" },
  {
    path: "/vi/garden/notes-that-grow-into-products",
    marker: "Những Ghi Chú Lớn Dần Thành Sản Phẩm"
  },
  {
    path: "/en/garden/notes-that-grow-into-products",
    marker: "Notes That Grow Into Products"
  },
  {
    path: "/en/garden/public-proof-without-portfolio-noise",
    marker: "Public Proof Without Portfolio Noise"
  },
  {
    path: "/en/garden/a-homepage-should-orient-not-perform",
    marker: "A Homepage Should Orient, Not Perform"
  },
  {
    path: "/vi/projects/2zcory-garden",
    marker: "Một ngôi nhà công khai cho note, bài viết, và dự án thuộc cùng một mạch công việc."
  },
  { path: "/vi/contact", marker: "Một cách liên hệ rõ ràng." },
  { path: "/en/contact", marker: "A clear way to reach out." },
  { path: "/ja/contact", marker: "明確な連絡のしかた。" }
];

function getBaseUrl() {
  const input = process.argv[2] ?? process.env.SMOKE_BASE_URL ?? DEFAULT_BASE_URL;

  try {
    return new URL(input).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Invalid base URL: ${input}`);
  }
}

async function verifyRoute(baseUrl, check) {
  const url = `${baseUrl}${check.path}`;
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "2zcory-garden-public-smoke/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`${check.path} returned HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    throw new Error(`${check.path} returned unexpected content-type: ${contentType || "missing"}`);
  }

  const body = await response.text();

  if (!body.includes(check.marker)) {
    throw new Error(`${check.path} did not include expected marker: ${check.marker}`);
  }

  return {
    path: check.path,
    status: response.status
  };
}

async function main() {
  const baseUrl = getBaseUrl();

  console.log(`Running public smoke against ${baseUrl}`);

  for (const check of checks) {
    const result = await verifyRoute(baseUrl, check);
    console.log(`PASS ${result.status} ${result.path}`);
  }

  console.log(`Smoke passed for ${checks.length} public routes.`);
}

main().catch((error) => {
  console.error(`Smoke failed: ${error.message}`);
  process.exitCode = 1;
});
