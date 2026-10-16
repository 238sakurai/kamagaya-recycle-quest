# 出典・利用条件

本アプリ「かまがや リサイクル大作戦！」は、鎌ケ谷市および鎌ケ谷市PTAの公式事業ではない、個人制作の**非公式**の普及啓発ゲームです。

## 有価物回収運動のルール・回収場所・日程

出題内容は以下の鎌ケ谷市公式ページと照合しています。各出典の URL・ページ更新日・確認日は `src/data/sources.ts` に記録し、ゲーム内の「出典・このゲームについて」画面からもリンクしています。

- 有価物回収運動にご協力をお願いします（鎌ケ谷市 クリーン推進課）
  https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.html
- 有価物回収運動の回収場所一覧（町名別）
  https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/kaishubasyo/index.html
- 令和8年度 年間回収日程表（PDF）
  https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.files/R8yuuka.pdf
- ごみの分け方・出し方（市の通常のごみ収集。対象外品目の補足に使用）
  https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/dashikata/gomi.html

取り扱い方針:

- 公式ページの文章・画像・PDF は転載せず、ルールの要点を子ども向けに言い換えて出題しています。ゲーム内には公式ページへのリンクだけを置いています。
- 回収日（具体的な日付）はゲーム内に表示しません。公式の年間回収日程表 PDF へのリンクで案内します。
- 回収場所の住所・地図はゲーム内に持ち込みません。ステージ2の街は架空のものです。
- 小学校区名（9校）は回収場所一覧ページの「学区名」から作成しました。学校を選んでも、利用できる回収場所や回収日を自動で確定することはしません。
- 市の通常のごみ収集（市指定袋・ごみ集積所・朝8時まで）と、PTA主体の有価物回収運動（黄色い旗・午前9時まで）は別の制度として扱っています。
- ルールは変更されることがあります。確認日は 2026-10-16 です。

## キャラクター

### むだなしくん（鎌ケ谷市 ごみ減量・リサイクル推進キャラクター）

- 「むだなしくん」は、1997年に鎌ケ谷市のごみ減量とリサイクル推進のために生まれた市のキャラクターで、「むだナシくんカンパニー」の一員です（所管: クリーン推進課）。
  - 市のキャラクター: https://www.city.kamagaya.chiba.jp/sesakumidashi/shigaiyou_menu/character.html
  - むだなしファミリー大集合！: https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/kankyo/kankyo-kouza/kamagaya_kkonline/112011301110a2.html
- 市の公式ページには「キャラクター等のデザインの無断使用・転載はできません」と明記されています。公開されている申請手続きがないため、使用には市（クリーン推進課）への相談と承諾が必要と解釈しています。
- そのため本アプリには**むだなしくんの公式画像を一切含めていません**。承諾を得るまでは、リサイクルマークをモチーフにしたオリジナルキャラクター「リサ丸」を案内役にしています。むだなしくんに似せたキャラクターも描いていません。
- 手続きと差し替え方法は `docs/mudanashikun-usage-notes.md` を参照してください。

### かまたん（鎌ケ谷市マスコットキャラクター）

- 「かまたん」のデザイン使用には市の承認申請が必要です（https://www.city.kamagaya.chiba.jp/kamatan/request/index.html）。本アプリでは使用していません。

### リサ丸（オリジナル）

- 本アプリのために描いたオリジナルキャラクターで、`src/components/Mascot.tsx` のインライン SVG です。アプリ本体と同じ MIT License で提供します。

## イラスト・アイコン

- 資源のイラスト、街、学校、トラック、紙吹雪は、すべて本アプリのために描いたインライン SVG です（`src/components/`）。外部の画像素材は使用していません。
- 絵文字はテキストとして使用し、端末のフォントで表示します。

## フォント

- Web フォントは同梱していません。端末にインストールされた丸ゴシック系フォント（ヒラギノ丸ゴ / BIZ UDPゴシック / Noto Sans JP など）で表示します。

## 効果音

- すべて Web Audio API で合成した自作音です（`src/lib/sound.ts`）。音声素材は使用していません。

## アプリケーション本体

- ライセンス: MIT（`LICENSE` を参照）
- 依存ライブラリ（React、Vite、Tailwind CSS など）のライセンスは `package.json` と各パッケージの配布物を参照してください。
