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
- そのため本アプリには**むだなしくんの公式画像を一切含めていません**。承諾を得るまでは、いらすとやの「リサイクルのイメージのイラスト」をタイトル・クリア画面に表示しています（下記）。むだなしくんに似せたキャラクターも描いていません。
- 手続きと差し替え方法は `docs/mudanashikun-usage-notes.md` を参照してください。

### かまたん（鎌ケ谷市マスコットキャラクター）

- 「かまたん」のデザイン使用には市の承認申請が必要です（https://www.city.kamagaya.chiba.jp/kamatan/request/index.html）。本アプリでは使用していません。

### いらすとや「リサイクルのイメージのイラスト」

- 作者: いらすとや（みふねたかし）
  https://www.irasutoya.com/2013/09/blog-post_7776.html
- 利用規約: https://www.irasutoya.com/p/terms.html （確認日 2026-10-16）
  - 規約の範囲内であれば商用・非商用を問わず無料で利用でき、編集・加工も可能。本アプリで使用しているいらすとやの素材は 1 点。
  - 著作権は作者が保有し、**素材を主体としたコンテンツの再配布・販売は禁止**。
- 本アプリでの使用: `public/images/irasutoya-recycle.png`（元画像 610×587px を 400px に縮小）。タイトル・クリア画面・リンク共有用の `public/og-image.png` に使用。
- このリポジトリは MIT License ですが、**この画像ファイルはいらすとやの利用規約に従い、MIT License の対象外**です。素材として取り出して配布しないでください。

### いらすとや 品目アイコン（33 点）

ステージ1の資源と「おへやで有価物さがし」の品目のアイコンに、以下の素材を使用しています（`public/images/items/<key>.png`、元画像を 240px に縮小。一覧は `src/data/illustrations.ts`、確認日 2026-10-16）。
タイトル画像と合わせて 34 点で、いらすとやの規約では「21点以上の素材を使った商用デザイン」は有償となるため、**本アプリは無料・広告なしの非商用として扱います**。商用利用（有料配布・広告掲載など）に転用する場合は、いらすとやへの有償対応の相談が必要です。
これらの画像ファイルと、それを含む `public/og-image.png` も MIT License の対象外です。

| key | 素材名 | 素材ページ |
| --- | --- | --- |
| `newspaper` | 古新聞のイラスト（ゴミ） | https://www.irasutoya.com/2014/01/blog-post_5.html |
| `magazine` | 古雑誌のイラスト（ゴミ） | https://www.irasutoya.com/2014/01/blog-post_6.html |
| `cardboard` | 潰された段ボールのイラスト（ゴミ） | https://www.irasutoya.com/2014/01/blog-post_4.html |
| `clothes` | ポロシャツのイラスト | https://www.irasutoya.com/2013/06/blog-post_3525.html |
| `can` | つぶした空き缶のイラスト（ゴミ出し） | https://www.irasutoya.com/2016/02/blog-post_94.html |
| `bottle` | いろいろな空き瓶のイラスト（同ページの個別画像（青いビン）を使用） | https://www.irasutoya.com/2019/03/blog-post_228.html |
| `spray` | スプレー缶のイラスト | https://www.irasutoya.com/2014/06/blog-post_5433.html |
| `broken-glass` | 割れたガラスのイラスト（強化ガラス） | https://www.irasutoya.com/2014/12/blog-post_8.html |
| `cosmetic` | 化粧水のイラスト | https://www.irasutoya.com/2015/11/blog-post_27.html |
| `electric-blanket` | 電気毛布のイラスト | https://www.irasutoya.com/2015/09/blog-post_45.html |
| `blanket` | 毛布のイラスト | https://www.irasutoya.com/2014/02/blog-post_8284.html |
| `plush` | クマのぬいぐるみのイラスト | https://www.irasutoya.com/2016/04/blog-post_665.html |
| `pet-bottle` | 空のペットボトルのイラスト | https://www.irasutoya.com/2018/06/blog-post_760.html |
| `bulb` | 電球のイラスト | https://www.irasutoya.com/2016/02/blog-post_58.html |
| `mirror` | 手鏡のイラスト | https://www.irasutoya.com/2014/07/blog-post_6059.html |
| `curtain` | カーテンと窓のイラスト | https://www.irasutoya.com/2013/06/blog-post_1758.html |
| `tv` | ブラウン管テレビのイラスト | https://www.irasutoya.com/2013/01/blog-post_9868.html |
| `plate` | 割れた食器のイラスト（ゴミ） | https://www.irasutoya.com/2014/01/blog-post_9.html |
| `bicycle` | ママチャリ・シティサイクルのイラスト（自転車） | https://www.irasutoya.com/2015/01/blog-post_177.html |
| `e-bike` | 電動アシスト自転車のイラスト | https://www.irasutoya.com/2015/09/blog-post_29.html |
| `tricycle` | 三輪車のイラスト | https://www.irasutoya.com/2012/12/blog-post_1438.html |
| `stroller` | ベビーカーのイラスト（赤ちゃん） | https://www.irasutoya.com/2012/12/blog-post_3296.html |
| `dry-battery` | 乾電池のイラスト | https://www.irasutoya.com/2013/04/blog-post_6707.html |
| `kettle` | 電気ケトルのイラスト | https://www.irasutoya.com/2015/10/blog-post_46.html |
| `stove` | 石油ストーブのイラスト | https://www.irasutoya.com/2015/03/blog-post_957.html |
| `metal-kettle` | やかんのイラスト・銀 | https://www.irasutoya.com/2013/01/blog-post_6.html |
| `pot` | 鍋とフタのイラスト | https://www.irasutoya.com/2021/06/blog-post_04.html |
| `big-can` | 一斗缶のイラスト | https://www.irasutoya.com/2018/04/blog-post_258.html |
| `oil-heater` | オイルヒーターのイラスト | https://www.irasutoya.com/2021/09/blog-post_22.html |
| `gas-cylinder` | プロパンガス・LPガスのイラスト | https://www.irasutoya.com/2014/12/lp.html |
| `tire` | 車のタイヤとホイールのイラスト | https://www.irasutoya.com/2016/08/blog-post_962.html |
| `battery` | 古いバッテリーのイラスト | https://www.irasutoya.com/2019/11/blog-post_15.html |
| `herbicide` | 除草剤のイラスト | https://www.irasutoya.com/2019/09/blog-post_348.html |

## イラスト・アイコン

- 街、学校、部屋の背景、トラック、黄色い旗、紙吹雪は、本アプリのために描いたインライン SVG です（`src/components/`）。
- 外部の画像素材は、上記のいらすとやのイラスト（タイトル画像 1 点＋品目アイコン 33 点）のみです。
- 絵文字はテキストとして使用し、端末のフォントで表示します。

## フォント

- Web フォントは同梱していません。端末にインストールされた丸ゴシック系フォント（ヒラギノ丸ゴ / BIZ UDPゴシック / Noto Sans JP など）で表示します。

## 効果音

- すべて Web Audio API で合成した自作音です（`src/lib/sound.ts`）。音声素材は使用していません。

## アプリケーション本体

- ライセンス: MIT（`LICENSE` を参照）。ただし `public/images/` 以下のいらすとやの画像と、それを含む `public/og-image.png` は上記のとおりいらすとやの利用規約に従います。
- 依存ライブラリ（React、Vite、Tailwind CSS など）のライセンスは `package.json` と各パッケージの配布物を参照してください。
