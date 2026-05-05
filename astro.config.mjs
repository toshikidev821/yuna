import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://yuna-1v6.pages.dev",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
});
