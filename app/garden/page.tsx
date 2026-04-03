import type { Metadata } from "next";
import Link from "next/link";

import { GARDEN_COPY, GardenPage as GardenScreen } from "@/components/garden/garden-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Garden",
  description: GARDEN_COPY.en.description
});

export default function GardenPage() {
  return <GardenScreen locale="en" LinkComponent={Link} />;
}
