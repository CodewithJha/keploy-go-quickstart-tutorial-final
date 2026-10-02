import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-line text-muted border-t">
      <div className="page-container flex flex-col gap-3 py-8 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-pretty">
          Written by {site.author}. An independent tutorial, not an official Keploy page.
        </p>
        <a
          href={site.repoUrl}
          className="hover:text-fg self-start rounded-sm py-1 underline underline-offset-4"
        >
          View the source on GitHub
        </a>
      </div>
    </footer>
  );
}
