import type {Metadata} from "next";

import Link from "next/link";

import {ABOUT_COPY, AboutPage as AboutScreen} from "@/components/about/about-page";
import {buildPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: ABOUT_COPY.en.title,
  description: ABOUT_COPY.en.description
});

export default function AboutPage() {
  return <AboutScreen locale="en" LinkComponent={Link} />;
}
