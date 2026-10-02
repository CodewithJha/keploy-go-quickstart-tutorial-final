import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: "export",
};

// Plugins are passed by name so they also work with Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "append",
          properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
          content: { type: "text", value: "#" },
        },
      ],
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
