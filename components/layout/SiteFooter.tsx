import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-line text-muted border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm sm:px-6">
        <p>Written by {site.author}. An independent tutorial, not an official Keploy page.</p>
        <a href={site.repoUrl} className="hover:text-fg underline underline-offset-4">
          View the source on GitHub
        </a>
      </div>
    </footer>
  );
}
