import type {ReactNode} from "react";

import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {LocaleSwitcher} from "@/components/locale-switcher";
import {SiteNav} from "@/components/site-nav";
import {ThemeSwitcher} from "@/components/theme-switcher";
import {Link} from "@/i18n/routing";
import {routing} from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="site-shell" lang={locale}>
        <header className="site-header">
          <Link href="/" className="brand-mark">
            <span className="brand-seed">2Z</span>
            <span className="brand-copy">
              <strong>2zcory Garden</strong>
              <span>Thought and execution</span>
            </span>
          </Link>
          <div className="site-header-locale-panel">
            <LocaleSwitcher />
          </div>
          <div className="site-header-nav-row">
            <SiteNav />
          </div>
          <div className="site-header-theme-panel">
            <ThemeSwitcher />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
