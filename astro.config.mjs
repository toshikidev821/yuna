import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yuna-1v6.pages.dev",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
});
