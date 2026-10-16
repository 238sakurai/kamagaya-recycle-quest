/**
 * 案内役キャラクターの設定。
 *
 * 鎌ケ谷市のごみ減量・リサイクル推進キャラクター「むだなしくん」は、
 * 市の公式ページで「デザインの無断使用・転載はできません」とされています。
 *   - 市のキャラクター: https://www.city.kamagaya.chiba.jp/sesakumidashi/shigaiyou_menu/character.html
 *   - むだなしファミリー大集合！: https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/kankyo/kankyo-kouza/kamagaya_kkonline/112011301110a2.html
 * 市の承諾が得られるまでは imageSrc を null のままにし、オリジナルキャラクター「リサ丸」を表示します。
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
  placeholder: {
    /** 承諾を得るまで表示するオリジナルキャラクター */
    name: 'リサ丸',
    description: 'リサイクルマークをモチーフにしたオリジナルキャラクター',
  },
} as const

/** 公式画像を表示できる状態か */
export function isOfficialMascotAvailable(): boolean {
  return CHARACTER.official.officialImageApproved && CHARACTER.official.imageSrc !== null
}

/** 画面に表示する案内役の名前 */
export function mascotName(): string {
  return isOfficialMascotAvailable() ? CHARACTER.official.name : CHARACTER.placeholder.name
}
