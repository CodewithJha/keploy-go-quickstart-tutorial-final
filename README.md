# Keploy Go quickstart tutorial

A single-page tutorial built with Next.js and MDX. It walks through Keploy's Gin + MongoDB quickstart: record real API calls against a Go URL shortener, then replay them as tests with the database stopped.

- Live site: https://keploy-go-quickstart-tutorial-ebon.vercel.app
- Source: https://github.com/CodewithJha/keploy-go-quickstart-tutorial-final

## Why this exists

This is my submission for the Keploy DevRel candidate assignment. The brief: run one of Keploy's Go quickstarts, write an original beginner tutorial from the experience, and publish it as a static Next.js + MDX page.

I chose the "Running App Locally" variant of the [Gin + MongoDB quickstart](https://keploy.io/docs/quickstart/samples-gin/). I ran it on macOS (Apple Silicon) with Keploy 3.8.58 and Go 1.27.1. The commands, output and problems in the tutorial come from that run. Anything I did not run is labelled as such in the text.

## Stack

- Next.js 16 (App Router), TypeScript, static export (`output: "export"`)
- `@next/mdx` for the tutorial content
- Tailwind CSS v4 for styling
- `rehype-pretty-code` with Shiki for syntax highlighting at build time
- `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- ESLint and Prettier (with the Tailwind class sorting plugin), pnpm

## Project structure

```text
app/                 Root layout and the single page, plus CSS (app/styles)
components/layout/   Header, mobile menu, theme toggle, table of contents, footer
components/mdx/      Components used inside the tutorial: Callout, Step, Checkpoint,
                     CommandBlock, CodeBlock, CopyButton, Problem, WorkflowDiagram
config/              Site metadata, nav links and the table of contents list
content/tutorial.mdx The tutorial itself
lib/                 Theme init script and a small text helper for copy buttons
mdx-components.tsx   Maps MDX elements and custom tags to React components
```

## How MDX is used

`content/tutorial.mdx` is imported by `app/page.tsx` like a component. `@next/mdx` compiles it at build time. `mdx-components.tsx` registers the custom components, so the tutorial can use tags such as `<Callout>`, `<Step>` and `<CommandBlock>` without imports. Fenced code blocks are highlighted by `rehype-pretty-code` during the build and rendered through the `CodeBlock` component, which adds a copy button. The plugins are listed by name in `next.config.ts`, which keeps them compatible with Turbopack.

## Run it locally

You need Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Scripts

| Command          | What it does                                 |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Start the dev server                         |
| `pnpm build`     | Build the static site into `out/`            |
| `pnpm lint`      | Run ESLint                                   |
| `pnpm format`    | Format everything with Prettier              |
| `pnpm typecheck` | Run the TypeScript compiler without emitting |

To check the production build locally, run `pnpm build` and serve the `out/` folder with any static server, for example `python3 -m http.server --directory out 3100`.

## Key decisions

- **One MDX file, config-driven navigation.** The table of contents lives in `config/toc.ts`, so the sidebar and the mobile menu share one list.
- **Content stays server-rendered.** Code highlighting happens at build time. Client components exist only for the theme toggle, mobile menu, copy buttons, the small "Scroll" hint on code that is too wide for a phone screen, and the active-section highlight in the table of contents.
- **Theme without a flash.** A tiny inline script sets the `dark` class before first paint, using the saved choice or the system preference. The toggle swaps icons with CSS, so it needs no state.
- **No unnecessary libraries.** No component kit, no icon package and no animation library. The icons are small inline SVGs.
- **Honest content.** Problems in the troubleshooting section are split into ones I hit and ones taken from the docs.

## Deployment

The site is a static export, so any static host works. It is hosted on Vercel, and the Vercel project is connected to this GitHub repository: every push to `main` triggers a production deploy automatically. Vercel detects Next.js and runs `pnpm build`. You can also deploy manually with `npx vercel deploy --prod`. The live site is at https://keploy-go-quickstart-tutorial-ebon.vercel.app.

## Verification

Before publishing I ran `pnpm lint`, `pnpm typecheck`, `pnpm format:check` and `pnpm build`, then checked the production build in a browser: every table of contents anchor, the theme toggle, the mobile menu, copy buttons, and horizontal overflow at 320, 375, 768 and 1280 pixel widths.

## Notes

The tutorial is an independent write-up, not an official Keploy page. Keploy's CLI output and file formats change between versions, so what you see may differ from what is shown here.
