# かまがや リサイクル大作戦！

**あつめて、わけて、学校をハッピーに！**

鎌ケ谷市PTAによる「有価物回収運動」の普及啓発を目的とした、子ども向けWebゲームです。
スマートフォンのタップ操作で、3〜5分で遊べます。

- 公開 URL: https://238sakurai.github.io/kamagaya-recycle-quest/ （GitHub Pages 公開後に有効）
- 本アプリは鎌ケ谷市および鎌ケ谷市PTAの公式事業ではない、個人制作の**非公式**の普及啓発ゲームです。

## 遊べること

| ステージ | 学べること |
| --- | --- |
| 1. 有価物を仕分けよう！ | 何を回収できるか、どう準備して出すか（つぶす・洗う・袋に入れる など） |
| 2. 黄色い旗を探せ！ | 回収場所の目印、回収日当日の**午前9時まで**、回収日以外は出さない、学区で回収日がちがう |
| 3. 学校をハッピーに！ | 回収 → 再利用 → PTAへの奨励金 → 図書・備品・芸術鑑賞会として子どもたちに還元されるしくみ |

クリア画面では、鎌ケ谷市公式の「回収ルール」「年間回収日程表」「町名別の回収場所一覧」へのリンクを案内します。

## データの出典と管理方針

出題内容は以下の鎌ケ谷市公式ページと照合しています（確認日 2026-10-16）。各出典の URL・ページ更新日・確認日は [`src/data/sources.ts`](src/data/sources.ts) に記録し、ゲーム内の「出典・このゲームについて」画面からも確認できます。詳細と利用条件は [`NOTICE.md`](NOTICE.md) を参照してください。

- [有価物回収運動にご協力をお願いします](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.html) — 対象品目・出し方・午前9時まで・奨励金のしくみ
- [有価物回収運動の回収場所一覧](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/kaishubasyo/index.html) — 黄色い旗・学区名（9校）
- [令和8年度 年間回収日程表（PDF）](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.files/R8yuuka.pdf) — リンクのみ。日付はゲーム内に表示しない
- [ごみの分け方・出し方](https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/dashikata/gomi.html) — 対象外品目（スプレー缶・割れたビン等）の補足

- 市の通常のごみ収集（市指定袋・ごみ集積所・朝8時まで）と、PTA主体の有価物回収運動（黄色い旗・午前9時まで）は別の制度として扱います。
- 公式ページの文章・画像・PDF は転載せず、要点を子ども向けに言い換えて出題しています。外部リンクは `target="_blank" rel="noopener noreferrer"` で新しいタブに開き、ゲームの状態を保ちます。
- 回収日の具体的な日付と回収場所の住所はゲーム内に持ち込みません。ステージ2の街は架空です。
- 小学校区の選択は任意で、学校から利用できる回収場所や日程を自動確定しません。公式情報と現地の黄色い旗で確認するよう案内します。
- ユニットテストで、全出典が公式ドメインで確認日を持つこと、出題データがルールの出典だけを参照すること、未検証の日付を含まないことを検査しています。

## キャラクター利用条件

- 鎌ケ谷市のごみ減量・リサイクル推進キャラクターは「むだなしくん」（むだナシくんカンパニー、所管: クリーン推進課）です。市の公式ページで「キャラクター等のデザインの無断使用・転載はできません」とされており、公開された申請手続きがないため、使用には市の承諾が必要と解釈しています（[`docs/mudanashikun-usage-notes.md`](docs/mudanashikun-usage-notes.md)）。
- 承諾を得るまで**公式画像は一切含めず**、案内役はオリジナルキャラクター「リサ丸」（[`src/components/Mascot.tsx`](src/components/Mascot.tsx)）を表示しています。むだなしくんに似せた造形は避けています。
- 承諾後は [`src/config/character.ts`](src/config/character.ts) の `imageSrc` と `officialImageApproved` を更新すると、案内役の画像と名前が切り替わります。
- 鎌ケ谷市マスコットキャラクター「かまたん」も使用申請が必要なため使用していません。

## 開発

```bash
npm ci
npm run dev        # http://localhost:5173/
```

## テスト

```bash
npm run typecheck  # tsc -b
npm test           # Vitest（出典・出題データ・採点・保存・ふりがな・画面）
npm run build      # 本番ビルド（dist/）
npm run e2e        # Playwright（ビルド後に preview で実行。Pixel 7 / Desktop Chrome）
```

### 技術スタック

Vite / React / TypeScript / Tailwind CSS v4 / インラインSVG / localStorage / Vitest / Playwright / GitHub Actions

### リンク共有用の画像（OGP）

```bash
npm run og:image   # public/og-image.png（1200×630）を生成
```

SNS やチャットでリンクを共有したときに表示されるアイキャッチ画像です。ゲームと同じ SVG（リサ丸・資源・黄色い旗）を Playwright の Chromium で描画します。文字はシステムフォント（ヒラギノ丸ゴ）で描くため macOS で生成します。公開 URL を変えたときは `index.html` の `og:url` / `og:image` も書き換えてください。

### 公開

`main` ブランチへの push で GitHub Actions が GitHub Pages にデプロイします（`.github/workflows/deploy.yml`）。
リポジトリの Settings → Pages で Source を「GitHub Actions」にしてください。
ビルド時に `GITHUB_PAGES=true` を渡すと `base` が `/kamagaya-recycle-quest/` になります。

## プライバシー

- 氏名・住所・学校名・位置情報などの個人情報は収集せず、入力も求めません。GPS・カメラ・マイク・センサーも使いません。
- 保存するのは設定（キー `krq:settings:v1`: 音・アニメーション）と進捗（キー `krq:progress:v1`: 最高ポイント・クリア回数・任意の学区選択）だけで、端末の localStorage にのみ保存し外部送信しません。
- アクセス解析ツールは導入していません。通信を伴うランキング、学校別・個人別ランキングは実装しません。
- 「出典・このゲームについて」画面から保存データを消去できます。

## 安全への配慮

- 重い物・ガラス・割れ物・危険物を子どもだけで運ばないこと、家庭での準備と回収場所への持ち出しは大人と一緒に行うことを、ステージ1とクリア画面で案内しています。
- 対象外の品目（スプレー缶・割れたビン等）は「さわらずに大人にまかせる」と説明し、市のごみ収集での扱いを補足します。
- ステージ3の演出（本・鑑賞会・備品）は制度のしくみを学ぶための例示で、実際の奨励金額や各PTAの予算配分を表すものではないことを明記しています。

## 省電力設計

- 描画はすべてインライン SVG と DOM。常時実行する描画ループ（requestAnimationFrame / setInterval）は持ちません。
- 演出は短い CSS アニメーションだけ。紙吹雪は 24 個・約 2 秒で DOM から消え、トラックの登場は 1 回だけ再生します。
- Page Visibility API でタブ非表示中はアニメーションを止め（`<html data-hidden>`）、Web Audio を一時停止します。
- 設定の「うごき OFF」で装飾アニメーションを停止（`<html data-animation="off">`）。`prefers-reduced-motion` も同じ扱いです。
- 音声ファイル・Web フォント・画像ファイルを同梱せず、効果音は Web Audio で合成、フォントは端末の丸ゴシックを使用します。
- 通信は初回のページ読み込みだけで、実行時に外部 API を呼びません。

## アクセシビリティ

- 漢字にはふりがな（`<ruby>`）を付け、小学校低学年でも読めるようにしています。
- タップ領域は 56px 以上、選択肢はボタンとして実装し、キーボード操作（Tab / Enter / Space）でも遊べます。
- 正解・不正解のフィードバックは `role="status"` / `aria-live` で読み上げ対象にしています。

## ディレクトリ

```
src/config/      案内役キャラクターの設定（公式画像の承諾状態）
src/data/        出典・出題データ・報酬・学区
src/lib/         ふりがな・採点・保存・効果音・シャッフル
src/components/  UI 部品・SVG イラスト（資源・街・学校・リサ丸）
src/screens/     タイトル・ステージ1〜3・クリア・出典
src/hooks/       設定・タブ非表示時の一時停止
e2e/             Playwright
docs/            キャラクター使用に関するメモ
```

## 今後の開発予定

- むだなしくん公式画像の使用承諾の相談と差し替え
- 対象品目の追加（自転車・ストーブ類など金属製品の出し方）
- 効果音・演出のバリエーション追加、実機でのアクセシビリティ確認

## ライセンス

アプリ本体は MIT License（[`LICENSE`](LICENSE)）。出典・キャラクター・素材の利用条件は [`NOTICE.md`](NOTICE.md) を参照してください。
