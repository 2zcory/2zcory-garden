import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getSiteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = getSiteMetadata();

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="site-shell">
            <header className="site-header">
              <Link href="/" className="brand-mark">
                <span className="brand-seed">2Z</span>
                <span>2zcory Garden</span>
              </Link>
              <div className="site-header-controls">
                <ThemeSwitcher />
                <SiteNav />
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
