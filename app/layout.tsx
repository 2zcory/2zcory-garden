import {hasLocale} from "next-intl";
import {headers} from "next/headers";

import { ThemeProvider } from "@/components/theme-provider";
import {routing} from "@/i18n/routing";
import { getSiteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = getSiteMetadata();

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({children}: RootLayoutProps) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-next-intl-locale") ?? undefined;
  const documentLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  return (
    <html lang={documentLocale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
