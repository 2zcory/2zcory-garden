const DEFAULT_BASE_URL = "https://2zcory-garden.vercel.app";

const checks = [
  { path: "/", marker: "Suy nghĩ, bài viết và build ở trong cùng một địa hình." },
  { path: "/vi", marker: "Suy nghĩ, bài viết và build ở trong cùng một địa hình." },
  { path: "/en", marker: "Thinking, writing, and building in one terrain." },
  { path: "/ja", marker: "思考と文章と実装が、ひとつの地形にある。" },
  { path: "/vi/about", marker: "Trang này dùng để làm gì" },
  { path: "/en/about", marker: "What this site is for" },
  { path: "/ja/about", marker: "このサイトの役割" },
  { path: "/vi/projects", marker: "Khám phá Context OS" },
  { path: "/en/projects", marker: "Explore Context OS" },
  { path: "/vi/projects/context-os", marker: "Context OS" },
  { path: "/en/projects/2zcory-garden", marker: "2zcory Garden" },
  { path: "/vi/writing", marker: "Đầu ra đã được gọt, không phải archive cho đủ chỗ." },
  { path: "/en/writing", marker: "Shaped output, not archive filler." },
  { path: "/ja/writing", marker: "埋め草の archive ではなく、整えられた output。" },
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
  { path: "/vi/garden", marker: "Đường mòn hiện ra, vẫn còn mở." },
  { path: "/en/garden", marker: "Visible trails, still open." },
  { path: "/ja/garden", marker: "見える trail、まだ開いたまま。" },
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
    marker: "Một personal operating system được mở ra công khai như ngôi nhà cho ghi chú, bài viết và bằng chứng thực thi."
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
