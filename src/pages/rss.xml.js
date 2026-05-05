import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: "toshiki — daily one pick",
    description:
      "毎日のITトレンドから1本だけピックして、自分なりに咀嚼する記録。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary ?? "",
      link: `/posts/${post.id.replace(/\.md$/, "")}/`,
      categories: post.data.tags ?? [],
    })),
    customData: `<language>ja</language>`,
  });
}
