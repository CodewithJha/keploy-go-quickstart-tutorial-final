import { navLinks } from "@/config/nav";
import { site } from "@/config/site";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="bg-bg/90 border-line sticky top-0 z-40 border-b backdrop-blur">
      <div className="page-container flex h-(--header-h) items-center justify-between gap-3">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2.5 rounded-md py-2 text-[0.9375rem] leading-tight font-semibold sm:text-base"
        >
          <span aria-hidden="true" className="bg-accent size-3 shrink-0 rounded-sm" />
          <span className="text-pretty">{site.shortName}</span>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-fg rounded-md px-3 py-2 text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
