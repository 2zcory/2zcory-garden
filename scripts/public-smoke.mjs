const DEFAULT_BASE_URL = "https://2zcory-garden.vercel.app";

const checks = [
  { path: "/", marker: "A map for thought that turns into public work." },
  { path: "/about", marker: "What this site is for" },
  { path: "/projects", marker: "Execution evidence." },
  { path: "/projects/context-os", marker: "Context OS" },
  { path: "/projects/2zcory-garden", marker: "2zcory Garden" },
  { path: "/writing", marker: "Deliberate output." },
  {
    path: "/writing/building-a-personal-site-as-an-operating-system",
    marker: "Building A Personal Site As An Operating System"
  },
  {
    path: "/writing/when-writing-should-not-start-as-an-essay",
    marker: "When Writing Should Not Start As An Essay"
  },
  { path: "/garden", marker: "Thought in motion." },
  {
    path: "/garden/notes-that-grow-into-products",
    marker: "Notes That Grow Into Products"
  },
  {
    path: "/garden/public-proof-without-portfolio-noise",
    marker: "Public Proof Without Portfolio Noise"
  },
  {
    path: "/garden/a-homepage-should-orient-not-perform",
    marker: "A Homepage Should Orient, Not Perform"
  },
  { path: "/contact", marker: "A clear way to reach out." }
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
