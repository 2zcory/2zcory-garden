import type { Metadata } from "next";
import Link from "next/link";

import { WRITING_COPY, WritingPage as WritingScreen } from "@/components/writing/writing-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Writing",
  description: WRITING_COPY.en.description
});

export default function WritingPage() {
  return <WritingScreen locale="en" LinkComponent={Link} />;
}
