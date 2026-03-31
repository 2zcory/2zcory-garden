import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { getSiteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = getSiteMetadata();

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand-mark">
              <span className="brand-seed">2Z</span>
              <span>2zcory Garden</span>
            </Link>
            <SiteNav />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
