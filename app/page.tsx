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
      <div id="top" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
          <main id="main" className="min-w-0">
            <article>
              <TutorialHeader />
              <div className="doc">
                <Tutorial />
              </div>
            </article>
          </main>
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
