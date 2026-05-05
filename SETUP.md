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

### Python（記事生成スクリプト用）

```bash
pip3 install --user anthropic
```

Python 3.9 (macOS デフォルト) で動く。

## 2. Anthropic API キーの設定

[https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) でAPIキーを作成（最初に $5 ほどクレジットを入れれば、毎日1リクエストなら数年持つ）。

```bash
mkdir -p ~/.config/yuna
chmod 700 ~/.config/yuna
cat > ~/.config/yuna/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-...
EOF
chmod 600 ~/.config/yuna/.env
```

`post_article.py` がここから読み込む。`.env` はリポジトリに含まれない。

> 将来、もっとセキュアにしたければ macOS Keychain に保存して `security find-generic-password` で取り出す方式に切り替え可能。

## 3. Cloudflare Pages との連携

### 3-1. プロジェクト作成

1. [https://dash.cloudflare.com/](https://dash.cloudflare.com/) にログイン
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. GitHub と認証 → `takahasitoshiki/yuna` を選択
4. ビルド設定:
   - **Project name**: `yuna`（→ デプロイURLは `https://yuna.pages.dev`）
   - **Production branch**: `main`
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 環境変数 `NODE_VERSION=20` を追加

5. **Save and Deploy**

数分でデプロイ完了。`https://yuna.pages.dev` で確認。

### 3-2. 動作確認

```bash
# 手動で記事を1本生成 → push してみる
python3 ~/develop/scripts/post_article.py
```

push されると Cloudflare Pages が検知し、1〜2分でデプロイされる。

### 3-3. 独自ドメインを使う場合（任意）

Cloudflare Pages の管理画面 → 該当プロジェクト → **Custom domains** → ドメインを入力。
DNS は自動設定される（ドメインが Cloudflare 管理下なら）。

## 4. 毎朝7時の自動投稿（launchd）

`develop/scripts/launchd/README.md` の手順で `morning.sh` を登録すると、毎朝7時に
記事取得 → daily issue 作成 → 記事投稿、まで自動実行される。

## 5. トラブルシュート

### push できない
リポジトリ所有者が `takahasitoshiki` なので、`gh auth status` で `takahasitoshiki` がログイン済みか確認。
`gh auth switch --user takahasitoshiki` で切り替え可。

### Cloudflare Pages のビルドが失敗する
`Node.js version` を 20 以上に明示してるか確認。`NODE_VERSION=20` を Pages の環境変数に入れる。

### Claude API が429エラー
レート制限。1日1リクエストなら通常出ない。クレジット残高も確認。
