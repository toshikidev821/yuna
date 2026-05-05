import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://yuna-1v6.pages.dev",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [sitemap(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "anchor",
          },
          content: { type: "text", value: "#" },
        },
      ],
    ],
  },
});
