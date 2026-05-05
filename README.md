# yuna

毎日のITトレンドから1本だけピックして自分なりに咀嚼する個人ブログ。

- フレームワーク: [Astro](https://astro.build/) v5
- ホスティング: Cloudflare Pages
- 記事生成: ローカルで `~/develop/scripts/post_article_via_claude.sh` が Claude Code (headless) を呼んで markdown を生成 → push → Cloudflare Pages が自動デプロイ

## 構成

```
yuna/
├── src/
│   ├── content/
│   │   └── posts/          # 日々の markdown 記事
│   ├── pages/
│   │   ├── index.astro     # アーカイブ一覧
│   │   └── posts/[...slug].astro  # 各記事ページ
│   ├── layouts/BaseLayout.astro
│   ├── styles/global.css
│   └── content.config.ts   # collection スキーマ
├── public/                 # 静的アセット
├── astro.config.mjs
└── package.json
```

## ローカル開発

```bash
npm install
npm run dev   # http://localhost:4321
npm run build # dist/ に静的ファイル出力
```

## 記事の追加

通常は `develop/scripts/post_article_via_claude.sh` が毎朝7時に自動で記事を作る。
手動で追加する場合は `src/content/posts/YYYY-MM-DD.md` を frontmatter付きで作成し、
`git push` するだけ。

frontmatter例:

```yaml
---
title: "今日の記事タイトル"
date: 2026-05-05
source: "Hacker News"
source_url: "https://example.com/article"
goal: "#130"
tags: ["rust", "embedded"]
summary: "80字の要約"
---
```

