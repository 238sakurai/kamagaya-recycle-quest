/**
 * 品目アイコンに使っている「いらすとや」の素材一覧。
 * 画像は public/images/items/<key>.png（元画像を 240px に縮小）。
 * 利用規約: https://www.irasutoya.com/p/terms.html （確認日 2026-10-16）
 *  - 規約の範囲内であれば無料で利用でき、加工も可。著作権は作者（みふねたかし氏）が保有。
 *  - 素材を主体としたコンテンツの再配布・販売は禁止。この画像を素材として配布しないこと。
 *  - 21点以上の素材を使った「商用デザイン」は有償。本ゲームは無料・広告なしの非商用として扱う。
 *    商用利用する場合は点数（タイトル画像を含めて 34 点）に注意。
 */
export interface Illustration {
  /** 画像ファイル名（拡張子なし）。品目データの art と一致させる */
  key: string
  /** いらすとやでの素材名 */
  title: string
  /** 素材ページ */
  pageUrl: string
  note?: string
}

export const ILLUSTRATIONS_VERIFIED_AT = '2026-10-16'
export const IRASUTOYA_TERMS_URL = 'https://www.irasutoya.com/p/terms.html'

export const ILLUSTRATIONS: Illustration[] = [
  { key: 'newspaper', title: '古新聞のイラスト（ゴミ）', pageUrl: 'https://www.irasutoya.com/2014/01/blog-post_5.html' },
  { key: 'magazine', title: '古雑誌のイラスト（ゴミ）', pageUrl: 'https://www.irasutoya.com/2014/01/blog-post_6.html' },
  { key: 'cardboard', title: '潰された段ボールのイラスト（ゴミ）', pageUrl: 'https://www.irasutoya.com/2014/01/blog-post_4.html' },
  { key: 'clothes', title: 'ポロシャツのイラスト', pageUrl: 'https://www.irasutoya.com/2013/06/blog-post_3525.html' },
  { key: 'can', title: 'つぶした空き缶のイラスト（ゴミ出し）', pageUrl: 'https://www.irasutoya.com/2016/02/blog-post_94.html' },
  { key: 'bottle', title: 'いろいろな空き瓶のイラスト', pageUrl: 'https://www.irasutoya.com/2019/03/blog-post_228.html', note: '同ページの個別画像（青いビン）を使用' },
  { key: 'spray', title: 'スプレー缶のイラスト', pageUrl: 'https://www.irasutoya.com/2014/06/blog-post_5433.html' },
  { key: 'broken-glass', title: '割れたガラスのイラスト（強化ガラス）', pageUrl: 'https://www.irasutoya.com/2014/12/blog-post_8.html' },
  { key: 'cosmetic', title: '化粧水のイラスト', pageUrl: 'https://www.irasutoya.com/2015/11/blog-post_27.html' },
  { key: 'electric-blanket', title: '電気毛布のイラスト', pageUrl: 'https://www.irasutoya.com/2015/09/blog-post_45.html' },
  { key: 'blanket', title: '毛布のイラスト', pageUrl: 'https://www.irasutoya.com/2014/02/blog-post_8284.html' },
  { key: 'plush', title: 'クマのぬいぐるみのイラスト', pageUrl: 'https://www.irasutoya.com/2016/04/blog-post_665.html' },
  { key: 'pet-bottle', title: '空のペットボトルのイラスト', pageUrl: 'https://www.irasutoya.com/2018/06/blog-post_760.html' },
  { key: 'bulb', title: '電球のイラスト', pageUrl: 'https://www.irasutoya.com/2016/02/blog-post_58.html' },
  { key: 'mirror', title: '手鏡のイラスト', pageUrl: 'https://www.irasutoya.com/2014/07/blog-post_6059.html' },
  { key: 'curtain', title: 'カーテンと窓のイラスト', pageUrl: 'https://www.irasutoya.com/2013/06/blog-post_1758.html' },
  { key: 'tv', title: 'ブラウン管テレビのイラスト', pageUrl: 'https://www.irasutoya.com/2013/01/blog-post_9868.html' },
  { key: 'plate', title: '割れた食器のイラスト（ゴミ）', pageUrl: 'https://www.irasutoya.com/2014/01/blog-post_9.html' },
  { key: 'bicycle', title: 'ママチャリ・シティサイクルのイラスト（自転車）', pageUrl: 'https://www.irasutoya.com/2015/01/blog-post_177.html' },
  { key: 'e-bike', title: '電動アシスト自転車のイラスト', pageUrl: 'https://www.irasutoya.com/2015/09/blog-post_29.html' },
  { key: 'tricycle', title: '三輪車のイラスト', pageUrl: 'https://www.irasutoya.com/2012/12/blog-post_1438.html' },
  { key: 'stroller', title: 'ベビーカーのイラスト（赤ちゃん）', pageUrl: 'https://www.irasutoya.com/2012/12/blog-post_3296.html' },
  { key: 'dry-battery', title: '乾電池のイラスト', pageUrl: 'https://www.irasutoya.com/2013/04/blog-post_6707.html' },
  { key: 'kettle', title: '電気ケトルのイラスト', pageUrl: 'https://www.irasutoya.com/2015/10/blog-post_46.html' },
  { key: 'stove', title: '石油ストーブのイラスト', pageUrl: 'https://www.irasutoya.com/2015/03/blog-post_957.html' },
  { key: 'metal-kettle', title: 'やかんのイラスト・銀', pageUrl: 'https://www.irasutoya.com/2013/01/blog-post_6.html' },
  { key: 'pot', title: '鍋とフタのイラスト', pageUrl: 'https://www.irasutoya.com/2021/06/blog-post_04.html' },
  { key: 'big-can', title: '一斗缶のイラスト', pageUrl: 'https://www.irasutoya.com/2018/04/blog-post_258.html' },
  { key: 'oil-heater', title: 'オイルヒーターのイラスト', pageUrl: 'https://www.irasutoya.com/2021/09/blog-post_22.html' },
  { key: 'gas-cylinder', title: 'プロパンガス・LPガスのイラスト', pageUrl: 'https://www.irasutoya.com/2014/12/lp.html' },
  { key: 'tire', title: '車のタイヤとホイールのイラスト', pageUrl: 'https://www.irasutoya.com/2016/08/blog-post_962.html' },
  { key: 'battery', title: '古いバッテリーのイラスト', pageUrl: 'https://www.irasutoya.com/2019/11/blog-post_15.html' },
  { key: 'herbicide', title: '除草剤のイラスト', pageUrl: 'https://www.irasutoya.com/2019/09/blog-post_348.html' },
]

export const ILLUSTRATION_BY_KEY: Record<string, Illustration> = Object.fromEntries(ILLUSTRATIONS.map((i) => [i.key, i]))

/** 品目アイコンの画像パス（BASE_URL からの相対） */
export function itemImagePath(art: string): string {
  return `images/items/${art}.png`
}
