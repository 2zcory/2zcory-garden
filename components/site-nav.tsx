"use client";

import {useTranslations} from "next-intl";

import {Link, usePathname} from "@/i18n/routing";

const navigation = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/writing", label: "writing" },
  { href: "/garden", label: "garden" },
  { href: "/contact", label: "contact" }
];

export function SiteNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label={t("label")}>
      {navigation.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link key={item.href} href={item.href} className={`nav-link${isActive ? " active" : ""}`}>
            {t(item.label)}
          </Link>
        );
      })}
    </nav>
  );
}
