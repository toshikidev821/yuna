import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://yuna.pages.dev",
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
