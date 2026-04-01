const DEFAULT_BASE_URL = "https://2zcory-garden.vercel.app";

const checks = [
  { path: "/", marker: "Một bản đồ cho suy nghĩ có thể trở thành sản phẩm công khai." },
  { path: "/vi", marker: "Một bản đồ cho suy nghĩ có thể trở thành sản phẩm công khai." },
  { path: "/en", marker: "A map for thought that turns into public work." },
  { path: "/vi/about", marker: "Site này dùng để làm gì" },
  { path: "/en/about", marker: "What this site is for" },
  { path: "/vi/projects", marker: "Bằng chứng thực thi." },
  { path: "/en/projects", marker: "Execution evidence." },
  { path: "/vi/projects/context-os", marker: "Context OS" },
  { path: "/en/projects/2zcory-garden", marker: "2zcory Garden" },
  { path: "/vi/writing", marker: "Đầu ra có chủ đích." },
  { path: "/en/writing", marker: "Deliberate output." },
  {
    path: "/vi/writing/building-a-personal-site-as-an-operating-system",
    marker: "Nội dung này hiện mới được xuất bản bằng tiếng Anh."
  },
  {
    path: "/en/writing/building-a-personal-site-as-an-operating-system",
    marker: "Building A Personal Site As An Operating System"
  },
  {
    path: "/en/writing/when-writing-should-not-start-as-an-essay",
    marker: "When Writing Should Not Start As An Essay"
  },
  { path: "/vi/garden", marker: "Suy nghĩ đang chuyển động." },
  { path: "/en/garden", marker: "Thought in motion." },
  {
    path: "/vi/garden/notes-that-grow-into-products",
    marker: "Nội dung này hiện mới được xuất bản bằng tiếng Anh."
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
  { path: "/vi/contact", marker: "Một cách liên hệ rõ ràng." },
  { path: "/en/contact", marker: "A clear way to reach out." }
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
