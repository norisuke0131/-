<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1I5S0modLbSwVGiwnq40GXRu5DKpGWYFq

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 魔界騎士（MAKAI KNIGHT）— おまけゲーム

ファミコン時代の横スクロール・アクションへのオマージュとして作った、ブラウザで遊べるゲームです。画像・音楽はすべてオリジナルです。

- ファイル：`public/makai/index.html`（1ファイル完結。ビルドは不要）
- 遊び方：`npm run dev` を実行して `http://localhost:3000/makai/` を開くか、ファイルをそのままブラウザで開く
- 操作：←→ 移動 / ↑↓ はしご・しゃがむ / X・SPACE ジャンプ / Z 攻撃 / ENTER スタート・ポーズ / M 音のON・OFF（スマホでは画面下のボタンで操作）
- ルール：鎧は1発で砕け、パンツ一丁でもう1発受けると骨になる。墓場・沼・魔の森を越え、門を守る単眼巨人を倒して鍵を取ればクリア（クリアするたびに敵が強くなる）
