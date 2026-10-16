/**
 * 案内役キャラクターとタイトル画像の設定。
 *
 * 鎌ケ谷市のごみ減量・リサイクル推進キャラクター「むだなしくん」は、
 * 市の公式ページで「デザインの無断使用・転載はできません」とされています。
 *   - 市のキャラクター: https://www.city.kamagaya.chiba.jp/sesakumidashi/shigaiyou_menu/character.html
 *   - むだなしファミリー大集合！: https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/kankyo/kankyo-kouza/kamagaya_kkonline/112011301110a2.html
 * 市の承諾が得られるまでは imageSrc を null のままにし、いらすとやのイラストを表示します。
 * 承諾後は public/images/ に提供された画像を加工せずに置き、imageSrc にそのパスを設定してください。
 * 手順は docs/mudanashikun-usage-notes.md を参照。
 */
export const CHARACTER = {
  official: {
    /** 市のキャラクターの名前 */
    name: 'むだなしくん',
    description: 'むだナシくんカンパニーの一員で、所管は鎌ケ谷市クリーン推進課',
    infoUrl: 'https://www.city.kamagaya.chiba.jp/sesakumidashi/shigaiyou_menu/character.html',
    /** 承諾済みの公式画像のパス（BASE_URL からの相対）。未承諾のため null */
    imageSrc: null as string | null,
    /** 公式画像の使用承諾を得ているか。true にするのは市の承諾を受け取ったあと */
    officialImageApproved: false,
    /** 承諾時に求められた場合のクレジット表記 */
    credit: '鎌ケ谷市ごみ減量・リサイクル推進キャラクター むだなしくん',
  },
  /**
   * 承諾を得るまでタイトル・クリア画面に表示するイラスト（いらすとや）。
   * いらすとやの利用規約（https://www.irasutoya.com/p/terms.html）の範囲で使用。
   * 素材の再配布・販売は禁止されているため、このリポジトリの画像を素材として配布しないこと。
   */
  placeholder: {
    name: 'リサイクルのイメージのイラスト',
    author: 'いらすとや',
    pageUrl: 'https://www.irasutoya.com/2013/09/blog-post_7776.html',
    termsUrl: 'https://www.irasutoya.com/p/terms.html',
    /** 元画像（610×587px）を 400px に縮小したもの。BASE_URL からの相対 */
    imageSrc: 'images/irasutoya-recycle.png',
    description: 'リサイクルマークのまわりに本・缶・ペットボトル・服が描かれたイラスト',
    verifiedAt: '2026-10-16',
  },
} as const

/** 公式画像を表示できる状態か */
export function isOfficialMascotAvailable(): boolean {
  return CHARACTER.official.officialImageApproved && CHARACTER.official.imageSrc !== null
}

/** 画面に表示する画像の説明（alt） */
export function mascotName(): string {
  return isOfficialMascotAvailable() ? CHARACTER.official.name : `${CHARACTER.placeholder.name}（${CHARACTER.placeholder.author}）`
}
