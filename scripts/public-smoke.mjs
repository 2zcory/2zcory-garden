const DEFAULT_BASE_URL = "https://2zcory-garden.vercel.app";

const checks = [
  { path: "/", marker: "Product judgment được mang từ ý còn mở tới những hệ thống đã ship." },
  { path: "/vi", marker: "Product judgment được mang từ ý còn mở tới những hệ thống đã ship." },
  { path: "/en", marker: "Product judgment carried from rough thought to shipped systems." },
  { path: "/ja", marker: "product judgment を、粗い思考から ship された system まで運ぶ場所です。" },
  { path: "/vi/about", marker: "Site này giữ những gì" },
  { path: "/en/about", marker: "What this site holds" },
  { path: "/ja/about", marker: "このサイトにあるもの" },
  { path: "/vi/projects", marker: "Nơi ý đã thật sự gặp phần thực thi." },
  { path: "/en/projects", marker: "Where the thinking has already met execution." },
  { path: "/vi/projects/context-os", marker: "Context OS" },
  { path: "/en/projects/2zcory-garden", marker: "2zcory Garden" },
  { path: "/vi/writing", marker: "Nơi một đường suy nghĩ thành một ý rõ hơn." },
  { path: "/en/writing", marker: "Where a line of thought becomes a clearer position." },
  { path: "/ja/writing", marker: "ひとつの考えが、より明確な立場になる場所。" },
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
  { path: "/vi/garden", marker: "Nơi ý còn mở đủ để thay đổi tiếp." },
  { path: "/en/garden", marker: "Where the thinking stays open enough to change." },
  { path: "/ja/garden", marker: "考えがまだ変わり続けている場所。" },
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
  { path: "/vi/contact", marker: "Hãy liên hệ khi phần việc đã cho mình một chỗ để bắt đầu." },
  { path: "/en/contact", marker: "Reach out when the work already gives us a place to start." },
  { path: "/ja/contact", marker: "まず work が出発点を作っているときに連絡する。" }
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
