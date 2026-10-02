import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { TutorialHeader } from "@/components/layout/TutorialHeader";
import Tutorial from "@/content/tutorial.mdx";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="bg-accent text-on-accent sr-only z-50 rounded-md px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div
        id="top"
        className="page-container py-(--section-space) xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-x-16"
      >
        <main id="main" className="mx-auto max-w-(--article-max) min-w-0 xl:mx-0">
          <article>
            <TutorialHeader />
            <div className="doc">
              <Tutorial />
            </div>
          </article>
        </main>
        <aside className="hidden xl:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)] max-h-[calc(100dvh-var(--header-h)-4rem)] overflow-y-auto">
            <TableOfContents />
          </div>
        </aside>
      </div>
      <SiteFooter />
    </>
  );
}
