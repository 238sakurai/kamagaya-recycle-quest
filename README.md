# かまがや リサイクル大作戦！

**あつめて、わけて、学校をハッピーに！**

鎌ケ谷市PTAによる「有価物回収運動」の普及啓発を目的とした、子ども向けWebゲームです（非公式・ファンメイド）。
スマートフォンのタップ操作で、3〜5分で遊べます。

## 遊べること

| ステージ | 学べること |
| --- | --- |
| 1. 有価物を仕分けよう！ | 何を回収できるか、どう準備して出すか（つぶす・洗う・袋に入れる など） |
| 2. 黄色い旗を探せ！ | 回収場所の目印、回収日当日の**午前9時まで**、回収日以外は出さない、学区で回収日がちがう |
| 3. 学校をハッピーに！ | 回収 → 再利用 → PTAへの奨励金 → 図書・備品・芸術鑑賞会として子どもたちに還元されるしくみ |

クリア画面では、鎌ケ谷市公式の「回収ルール」「年間回収日程表」「町名別の回収場所一覧」へのリンクを案内します。

## 出典

出題内容は以下の鎌ケ谷市公式ページと照合しています。各出典のURLと確認日は [`src/data/sources.ts`](src/data/sources.ts) に記録し、ゲーム内の「出典・このゲームについて」画面からも確認できます。

- [有価物回収運動にご協力をお願いします](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.html)
- [有価物回収運動の回収場所一覧](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/kaishubasyo/index.html)
- [ごみの分け方・出し方](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/dashikata/gomi.html)

市の通常のごみ収集とPTA主体の有価物回収運動は別の制度です。ゲーム内の回収日は公式の日程表PDFへのリンクのみで、未検証の日付は表示しません。

## 開発

```bash
npm install
npm run dev        # 開発サーバー
npm run typecheck  # 型チェック
npm test           # ユニットテスト (Vitest)
npm run build      # 本番ビルド
npm run e2e        # E2E テスト (Playwright、事前に npm run build)
```

### 技術スタック

Vite / React / TypeScript / Tailwind CSS v4 / インラインSVG / localStorage / Vitest / Playwright / GitHub Actions

### 公開

`main` ブランチへの push で GitHub Actions が GitHub Pages にデプロイします（`.github/workflows/deploy.yml`）。
リポジトリの Settings → Pages で Source を「GitHub Actions」にしてください。
ビルド時に `GITHUB_PAGES=true` を渡すと `base` が `/kamagaya-recycle-quest/` になります。

## 設計方針

- **省電力**: 常時実行する描画ループを持たず、CSSアニメーションを必要なときだけ再生。タブが非表示になるとアニメーションと音を停止。画像はすべてインラインSVG。
- **プライバシー**: 個人情報を収集・入力要求しない。localStorage に保存するのは設定（音・アニメーション）と進捗（最高点・クリア回数・任意の学区選択）のみ。通信を伴うランキングは実装しない。
- **安全**: 重い物・割れ物は子どもだけで運ばない、家庭での準備は大人と一緒に、という案内をゲーム内に表示。
- **アクセシビリティ**: ふりがな（`<ruby>`）対応、大きなタップ領域、`prefers-reduced-motion` の尊重、キーボード操作可。
- **キャラクター**: 鎌ケ谷市マスコット「かまたん」は利用承認を得るまで使わず、オリジナルの「リサ丸」を使用。

## ライセンス

MIT
