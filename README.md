# Keploy Go quickstart tutorial

A single-page, statically exported tutorial site built with Next.js and MDX. It teaches a developer who has never used Keploy how to record real API calls against a Go service and replay them as tests, with the database switched off.

- Live site: https://keploy-go-quickstart-tutorial-ebon.vercel.app
- Repository: https://github.com/CodewithJha/keploy-go-quickstart-tutorial-final

## What this project demonstrates

- An original beginner tutorial written from a real Keploy run, not a copy of the official docs.
- A Next.js App Router site whose content is a single MDX file compiled at build time by `@next/mdx`.
- Custom React components used directly inside MDX: steps, callouts, checkpoints, troubleshooting cards, a workflow diagram and code blocks with copy buttons.
- Build-time syntax highlighting with light and dark themes, a theme toggle, a sticky table of contents with scroll-spy and a mobile contents menu.

## Keploy quickstart used

The tutorial follows the "Running App Locally" variant of Keploy's [Gin + MongoDB quickstart](https://keploy.io/docs/quickstart/samples-gin/): a Gin URL shortener from [keploy/samples-go](https://github.com/keploy/samples-go/tree/main/gin-mongo), with the app on the host and MongoDB in Docker.

I ran it on macOS (Apple Silicon) with Go 1.27.1 and Keploy 3.8.58. That run recorded 5 test cases and 9 MongoDB mocks. `keploy test` then passed 5 of 5 with MongoDB stopped, and deliberately editing an expected response in one recorded test produced 4 passed and 1 failed. The commands, output and problems in the tutorial come from that run. Anything I did not run myself is labelled as such in the text.

## Key technologies

| Area        | Choice                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------- |
| Framework   | Next.js 16.3.8 (App Router, Turbopack), React 19.2.8, TypeScript 5                           |
| Content     | `@next/mdx` 16.3.8 with `@mdx-js/loader` and `@mdx-js/react` 3                               |
| MDX plugins | `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code` 0.14 + Shiki 4 |
| Styling     | Tailwind CSS 4 via `@tailwindcss/postcss`, plus CSS design tokens in `app/styles/`           |
| Tooling     | ESLint 9 (`eslint-config-next`), Prettier 3 with `prettier-plugin-tailwindcss`, pnpm 11      |
| Hosting     | Vercel, static export                                                                        |

There is no component library, icon package or animation library. Icons are inline SVGs in `components/icons.tsx`.

## What the tutorial covers

The sections in `content/tutorial.mdx`, in order:

1. What you will build
2. What is Keploy
3. Prerequisites
4. Get the sample app
5. Prepare the app
6. Install Keploy
7. Record test cases
8. Replay the tests
9. Break a test on purpose
10. Read what Keploy generated (a test case, the mocks)
11. How Keploy works
12. Why this matters for Go developers
13. Common problems and fixes (problems I hit, mistakes to avoid)
14. Verification checklist
15. Clean up
16. What you learned
17. Next steps

## Local setup

Prerequisites:

- Node.js 22.13 or newer. Next.js 16 needs 20.9+, but the pinned pnpm 11.20.0 needs 22.13+.
- pnpm 11. With Corepack, `corepack enable` picks up the version from `packageManager` in `package.json`.

No environment variables are needed (see `.env.example`).

```bash
git clone https://github.com/CodewithJha/keploy-go-quickstart-tutorial-final.git
cd keploy-go-quickstart-tutorial-final
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Development commands

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `pnpm dev`          | Start the dev server                                      |
| `pnpm lint`         | Run ESLint                                                |
| `pnpm typecheck`    | Run `tsc --noEmit`                                        |
| `pnpm format`       | Format all files with Prettier                            |
| `pnpm format:check` | Check formatting without writing                          |
| `pnpm build`        | Production build (static export to `out/`)                |
| `pnpm start`        | `next start`; not used, since the site is a static export |

## Production build

```bash
pnpm build
```

`next.config.ts` sets `output: "export"`, so the build writes plain HTML, CSS and JS to `out/`. The only page is `/`, alongside the default not-found page, the favicon and the Open Graph image. To preview the export locally, serve `out/` with any static server:

```bash
python3 -m http.server --directory out 3100
```

## Project structure

```text
app/
  layout.tsx              Root layout: fonts, metadata (Open Graph, Twitter), pre-paint theme script
  page.tsx                The single page: skip link, header, MDX content, sidebar TOC, footer
  globals.css             Tailwind entry; imports the files in app/styles/
  styles/                 tokens.css (colours, spacing), prose.css (MDX typography), code.css
  icon.svg                Favicon
  opengraph-image.png     Social preview image (alt text in opengraph-image.alt.txt)
components/
  icons.tsx               Inline SVG icons
  layout/                 SiteHeader, TutorialHeader, TableOfContents, MobileMenu, ThemeToggle, SiteFooter
  mdx/                    Components used by the MDX content (see below)
config/
  site.ts                 Title, description, URLs, tested versions
  nav.ts                  Header links
  toc.ts                  Table of contents entries, shared by the sidebar and mobile menu
content/
  tutorial.mdx            The tutorial
lib/
  theme.ts                Inline script that sets the theme before first paint
  get-text.ts             Extracts plain text from a React tree for copy buttons
mdx-components.tsx        Maps MDX elements and custom tags to React components
next.config.ts            Static export and the MDX plugin pipeline
```

## How MDX is used

`next.config.ts` wraps the config with `createMDX` from `@next/mdx` and adds `md`/`mdx` to `pageExtensions`. `app/page.tsx` imports `content/tutorial.mdx` as a component and renders it inside the article.

`mdx-components.tsx` exports `useMDXComponents`, which registers these components so the MDX file can use them without imports:

| Tag                 | Purpose                                                            |
| ------------------- | ------------------------------------------------------------------ |
| `<Step>`            | Numbered step with a title                                         |
| `<Callout>`         | Note, tip or warning box (`type="info" \| "tip" \| "warning"`)     |
| `<Checkpoint>`      | Marks a point where the reader confirms the expected result        |
| `<CommandBlock>`    | One shell command with a `$` prompt that is not copied             |
| `<Problem>`         | Troubleshooting card: why it happens, how to identify, fix, verify |
| `<WorkflowDiagram>` | Record and replay diagram built from HTML and CSS                  |

It also overrides `pre` with `CodeBlock` and `figure` with `CodeFigure`, so every fenced code block gets a toolbar with a language or file title and a copy button. `CodeFrame` holds that toolbar, and `ScrollHint` shows a small "Scroll" hint when a code line is wider than the screen.

Syntax highlighting runs at build time. `rehype-pretty-code` uses Shiki with the `github-light` and `github-dark-dimmed` themes, and CSS switches between them with the site theme, so no highlighting code ships to the browser.

Heading ids come from `rehype-slug`, and `rehype-autolink-headings` appends a `#` link to each heading. The table of contents is not generated from the MDX: it is the list in `config/toc.ts`, whose ids match the slugged `h2` headings. `TableOfContents` highlights the current section on scroll and marks it with `aria-current`.

The MDX plugins are referenced by name in `next.config.ts` so they work with Turbopack.

## Deployment

The Vercel project is connected to this GitHub repository. Every push to `main` creates a production deployment; Vercel detects Next.js and runs `pnpm build`.

To deploy manually instead, from a linked checkout:

```bash
npx vercel deploy --prod
```

Because the output is a static export, `out/` can also be served from any static host.

## Live site and source

- Live: https://keploy-go-quickstart-tutorial-ebon.vercel.app
- Source: https://github.com/CodewithJha/keploy-go-quickstart-tutorial-final

## Verification

Checks that were run on this project:

- `pnpm format:check`, `pnpm lint`, `pnpm typecheck` and `pnpm build` all pass.
- Every in-page `#` link in the built `out/index.html` resolves to an element id, and every table of contents id matches a heading.
- Every external URL in the MDX, config and README returns HTTP 200.
- The live site was tested in headless Google Chrome (via Playwright) at widths from 320 to 1920 pixels, in light and dark themes: no horizontal page overflow, long code scrolls inside its block, and the mobile menu, theme toggle and persistence, copy buttons, table of contents and keyboard focus all work, with no console errors or failed requests.

Browser testing was Chrome emulation only. Real touch devices, Safari, Firefox and screen readers were not tested, and colour contrast was not measured.

## Assignment context

This is my submission for the Keploy DevRel candidate assignment. The brief was to run one of Keploy's Go quickstarts, write a new beginner-friendly tutorial from that experience, and publish it as a static single-page Next.js + MDX site on Vercel.

This is an independent write-up, not an official Keploy page. Keploy's CLI output and file formats change between versions, so what you see may differ from what is shown here.
