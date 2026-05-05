# yuna セットアップ手順

初回のみ実行する手順をまとめる。

## 1. ローカル依存のインストール

### Node.js
[mise](https://mise.jdx.dev/) や `nodebrew` などで Node.js v20+ を入れる。

```bash
node --version  # v20.x or later
cd ~/develop/yuna
npm install
npm run build   # 動作確認
```

### Claude Code
記事生成には Claude Code の headless モードを使う。インストール済み・課金済みであることを確認:

```bash
which claude       # /Users/t.toshiki/.local/bin/claude など
claude --version   # 2.x
```

> **API key は不要**。post_article_via_claude.sh が `claude -p` を呼ぶことで Claude Code subscription 経由で記事生成する。

## 2. Cloudflare Pages との連携

### 2-1. プロジェクト作成

1. [https://dash.cloudflare.com/](https://dash.cloudflare.com/) にログイン
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. GitHub と認証 → `takahasitoshiki/yuna` を選択
4. ビルド設定:
   - **Project name**: `yuna`（→ 公開URLは `https://yuna.pages.dev`）
   - **Production branch**: `main`
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **環境変数**: `NODE_VERSION=20` を追加

5. **Save and Deploy**

数分でデプロイ完了。`https://yuna.pages.dev` で確認。

### 2-2. 動作確認

```bash
# 手動で1本生成 → push してみる
bash ~/develop/scripts/post_article_via_claude.sh
```

push されると Cloudflare Pages が検知し、1〜2分でデプロイされる。

### 2-3. 独自ドメインを使う場合（任意）

Cloudflare Pages の管理画面 → 該当プロジェクト → **Custom domains** → ドメインを入力。
DNS は自動設定される（ドメインが Cloudflare 管理下なら）。

## 3. 毎朝7時の自動投稿（launchd）

`develop/scripts/launchd/README.md` の手順で `morning.sh` を登録すると、毎朝7時に
記事取得 → daily issue 作成 → 記事投稿、まで自動実行される。

## 4. トラブルシュート

### push できない
リポジトリ所有者が `takahasitoshiki` なので、`gh auth status` で `takahasitoshiki` がログイン済みか確認。
post_article_via_claude.sh は実行のたびに `gh auth switch --user takahasitoshiki` → push → `gh auth switch --user toshikidev821` で戻す動作。

### Cloudflare Pages のビルドが失敗する
`Node.js version` を 20 以上に明示してるか確認。`NODE_VERSION=20` を Pages の環境変数に入れる。

### Claude Code が見つからない
launchd は最小PATHで起動するので、`com.toshiki.morning.plist` の `EnvironmentVariables.PATH` に
`/Users/t.toshiki/.local/bin` が含まれているか確認。
