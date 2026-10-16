import type { SourceId } from './sources'

/**
 * ボーナスモード「おへやで有価物さがし」の部屋データ。
 * 散らかった部屋のイラストの中から、有価物回収に出せるものに丸をつける。
 *
 * accepted: true  … 有価物回収運動に出せる（準備をしてから）
 * accepted: false … 有価物回収運動の対象外（市のごみ収集のルールに従う）
 * 判定は公式ページ（yukabutu / gomi）と照合している。
 */
export interface RoomObject {
  id: string
  /** ふりがな記法 */
  name: string
  /** イラストの下に表示する短い名前（ひらがな・カタカナ、9文字以内） */
  label: string
  /** イラストの種類（ItemArt が解釈） */
  art: string
  accepted: boolean
  /** 答え合わせで表示する解説（ふりがな記法） */
  explanation: string
  /** 部屋の viewBox 上の位置（オブジェクトの中心） */
  x: number
  y: number
  /** イラストの拡大率（既定 0.55 → 約66px） */
  scale?: number
  sources: SourceId[]
}

export interface Room {
  id: string
  /** ふりがな記法 */
  name: string
  /** 背景の種類（RoomScene が解釈） */
  scene: 'kids' | 'living' | 'entrance' | 'storage'
  objects: RoomObject[]
  /** 答え合わせのあとに表示する、この部屋で学ぶ出し方のポイント（ふりがな記法） */
  tips?: string[]
}

/** 部屋のイラストの大きさ（viewBox） */
export const ROOM_WIDTH = 360
export const ROOM_HEIGHT = 464
/** オブジェクトのタップ領域（viewBox 単位、中心からの半径） */
export const OBJECT_HIT_RADIUS = 34

export const ROOMS: Room[] = [
  {
    id: 'kids',
    name: 'こどもべや',
    scene: 'kids',
    objects: [
      { id: 'newspaper', name: '新聞[しんぶん]', label: 'しんぶん', art: 'newspaper', accepted: true, x: 60, y: 300, explanation: '新聞[しんぶん]は紙類[かみるい]の有価物[ゆうかぶつ]。雑誌[ざっし]と分[わ]けてヒモでしばろう。', sources: ['yukabutu'] },
      { id: 'magazine', name: 'マンガ雑誌[ざっし]', label: 'ざっし', art: 'magazine', accepted: true, x: 300, y: 150, explanation: 'マンガも雑誌[ざっし]として出[だ]せるよ。新聞[しんぶん]とは分[わ]けてヒモでしばろう。', sources: ['yukabutu'] },
      { id: 'cardboard', name: 'ダンボール箱[ばこ]', label: 'ダンボール', art: 'cardboard', accepted: true, x: 290, y: 390, explanation: 'ダンボールは有価物[ゆうかぶつ]。つぶして平[たい]らにしてから出[だ]すよ。', sources: ['yukabutu'] },
      { id: 'can', name: 'ジュースの空[あ]き缶[かん]', label: 'あきかん', art: 'can', accepted: true, x: 180, y: 240, explanation: '空[あ]き缶[かん]は金属類[きんぞくるい]の有価物[ゆうかぶつ]。中[なか]を水洗[みずあら]いして出[だ]そう。', sources: ['yukabutu'] },
      { id: 'clothes', name: '小[ちい]さくなったTシャツ', label: 'Tシャツ', art: 'clothes', accepted: true, x: 110, y: 390, explanation: '古着[ふるぎ]はボロ布[ぬの]の有価物[ゆうかぶつ]。ぬれないようにポリ袋[ぶくろ]に入[い]れて出[だ]そう。', sources: ['yukabutu'] },
      { id: 'blanket', name: '古[ふる]い毛布[もうふ]', label: 'もうふ', art: 'blanket', accepted: true, x: 60, y: 160, explanation: '毛布[もうふ]もボロ布[ぬの]として出[だ]せるよ。ポリ袋[ぶくろ]に入[い]れてね。電気毛布[でんきもうふ]は出[だ]せないので注意[ちゅうい]！', sources: ['yukabutu'] },
      { id: 'plush', name: 'ぬいぐるみ', label: 'ぬいぐるみ', art: 'plush', accepted: false, x: 200, y: 150, explanation: 'ぬいぐるみは有価物[ゆうかぶつ]ではないよ。市[し]のごみ収集[しゅうしゅう]では「燃[も]やさないごみ」になるんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'pet-bottle', name: 'ペットボトル', label: 'ペットボトル', art: 'pet-bottle', accepted: false, x: 250, y: 290, explanation: 'ペットボトルは有価物回収[ゆうかぶつかいしゅう]の対象[たいしょう]ではないよ。市[し]のペットボトル収集[しゅうしゅう]に、キャップとラベルを外[はず]して出[だ]すんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'spray', name: 'スプレー缶[かん]', label: 'スプレーかん', art: 'spray', accepted: false, x: 320, y: 250, explanation: 'スプレー缶[かん]は有価物回収[ゆうかぶつかいしゅう]の対象外[たいしょうがい]。市[し]のごみ収集[しゅうしゅう]では、中身[なかみ]を使[つか]い切[き]って「資源[しげん]になるもの」に出[だ]すよ。', sources: ['yukabutu', 'gomi'] },
      { id: 'bulb', name: '切[き]れた電球[でんきゅう]', label: 'でんきゅう', art: 'bulb', accepted: false, x: 105, y: 225, explanation: '電球[でんきゅう]は出[だ]せないよ。ガラスや鏡[かがみ]、せとものも対象外[たいしょうがい]なんだ。', sources: ['yukabutu'] },
      { id: 'broken-glass', name: '割[わ]れたガラス', label: 'われたガラス', art: 'broken-glass', accepted: false, x: 200, y: 380, explanation: '割[わ]れたガラスは出[だ]せないよ。あぶないのでさわらずに、大人[おとな]の人[ひと]にまかせよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'mirror', name: '手鏡[てかがみ]', label: 'てかがみ', art: 'mirror', accepted: false, x: 300, y: 60, explanation: '鏡[かがみ]は有価物回収[ゆうかぶつかいしゅう]に出[だ]せないよ。市[し]のごみ収集[しゅうしゅう]のルールで出[だ]してね。', sources: ['yukabutu'] },
    ],
  },
  {
    id: 'living',
    name: 'リビング・キッチン',
    scene: 'living',
    objects: [
      { id: 'newspaper', name: '新聞[しんぶん]の山[やま]', label: 'しんぶん', art: 'newspaper', accepted: true, x: 60, y: 390, explanation: 'たまった新聞[しんぶん]は紙類[かみるい]の有価物[ゆうかぶつ]。ヒモでしばって出[だ]そう。', sources: ['yukabutu'] },
      { id: 'bottle', name: 'ジュースの空[あ]きビン', label: 'あきビン', art: 'bottle', accepted: true, x: 230, y: 150, explanation: '飲[の]み物[もの]の空[あ]きビンは有価物[ゆうかぶつ]。キャップを外[はず]して水洗[みずあら]いし、ビン回収袋[かいしゅうぶくろ]に入[い]れるよ。', sources: ['yukabutu'] },
      { id: 'can', name: '缶詰[かんづめ]の空[あ]き缶[かん]', label: 'あきかん', art: 'can', accepted: true, x: 300, y: 390, explanation: '缶詰[かんづめ]の缶[かん]も空[あ]き缶[かん]。中[なか]を水洗[みずあら]いして出[だ]そう。', sources: ['yukabutu'] },
      { id: 'cardboard', name: '通販[つうはん]のダンボール', label: 'ダンボール', art: 'cardboard', accepted: true, x: 120, y: 290, explanation: 'ダンボールはつぶして出[だ]すよ。宛名[あてな]など個人情報[こじんじょうほう]の部分[ぶぶん]は取[と]りのぞいてね。', sources: ['yukabutu'] },
      { id: 'curtain', name: '古[ふる]いカーテン', label: 'カーテン', art: 'curtain', accepted: true, x: 60, y: 130, explanation: 'カーテンもボロ布[ぬの]の有価物[ゆうかぶつ]。ぬれないようにポリ袋[ぶくろ]に入[い]れて出[だ]そう。', sources: ['yukabutu'] },
      { id: 'magazine', name: '読[よ]みおわった雑誌[ざっし]', label: 'ざっし', art: 'magazine', accepted: true, x: 200, y: 290, explanation: '雑誌[ざっし]は紙類[かみるい]の有価物[ゆうかぶつ]。新聞[しんぶん]と分[わ]けてヒモでしばろう。', sources: ['yukabutu'] },
      { id: 'cosmetic', name: '化粧品[けしょうひん]のビン', label: 'けしょうビン', art: 'cosmetic', accepted: false, x: 310, y: 150, explanation: '化粧[けしょう]ビンは口[くち]に入[い]れる物[もの]のビンじゃないので、有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。', sources: ['yukabutu'] },
      { id: 'spray', name: 'スプレー缶[かん]', label: 'スプレーかん', art: 'spray', accepted: false, x: 150, y: 150, explanation: 'スプレー缶[かん]は対象外[たいしょうがい]。市[し]のごみ収集[しゅうしゅう]で、中身[なかみ]を使[つか]い切[き]ってから出[だ]すよ。', sources: ['yukabutu', 'gomi'] },
      { id: 'electric-blanket', name: '電気毛布[でんきもうふ]', label: 'でんきもうふ', art: 'electric-blanket', accepted: false, x: 300, y: 280, explanation: '電気毛布[でんきもうふ]は出[だ]せないよ。ふつうの毛布[もうふ]やシーツは出[だ]せるんだけどね。', sources: ['yukabutu'] },
      { id: 'tv', name: '古[ふる]いテレビ', label: 'テレビ', art: 'tv', accepted: false, x: 60, y: 250, explanation: 'テレビは有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。市[し]のごみ収集[しゅうしゅう]でも「処理[しょり]できないごみ」なので、大人[おとな]の人[ひと]に相談[そうだん]しよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'plate', name: '割[わ]れたお皿[さら]', label: 'われたおさら', art: 'plate', accepted: false, x: 210, y: 390, explanation: 'せともののお皿[さら]は出[だ]せないよ。割[わ]れていたらあぶないので、さわらずに大人[おとな]にまかせよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'pet-bottle', name: 'ペットボトル', label: 'ペットボトル', art: 'pet-bottle', accepted: false, x: 310, y: 60, explanation: 'ペットボトルは有価物回収[ゆうかぶつかいしゅう]の対象[たいしょう]ではないよ。市[し]のペットボトル収集[しゅうしゅう]に出[だ]すんだ。', sources: ['yukabutu', 'gomi'] },
    ],
  },
  {
    id: 'entrance',
    name: '玄関[げんかん]',
    scene: 'entrance',
    tips: [
      '自転車[じてんしゃ]・三輪車[さんりんしゃ]・ベビーカー（金属[きんぞく]の部分[ぶぶん]が半分[はんぶん]以上[いじょう]）は、「有価物[ゆうかぶつ]」と書[か]いた紙[かみ]をかならず貼[は]って出[だ]すよ。',
      'チャイルドシートが付[つ]いた自転車[じてんしゃ]は、回収[かいしゅう]できないことがあるよ。',
      '重[おも]いものは、子[こ]どもだけで運[はこ]ばないで。おうちの人[ひと]といっしょに出[だ]そう。',
    ],
    objects: [
      { id: 'bicycle', name: '乗[の]らなくなった自転車[じてんしゃ]', label: 'じてんしゃ', art: 'bicycle', accepted: true, scale: 0.7, x: 110, y: 330, explanation: '自転車[じてんしゃ]は金属製品[きんぞくせいひん]の有価物[ゆうかぶつ]。「有価物[ゆうかぶつ]」と書[か]いた紙[かみ]をかならず貼[は]って、おうちの人[ひと]といっしょに出[だ]そう。', sources: ['yukabutu'] },
      { id: 'tricycle', name: '小[ちい]さいころの三輪車[さんりんしゃ]', label: 'さんりんしゃ', art: 'tricycle', accepted: true, scale: 0.65, x: 280, y: 330, explanation: '三輪車[さんりんしゃ]も金属製品[きんぞくせいひん]として出[だ]せるよ。自転車[じてんしゃ]と同[おな]じく「有価物[ゆうかぶつ]」の貼[は]り紙[がみ]をしてね。', sources: ['yukabutu'] },
      { id: 'stroller', name: '使[つか]わなくなったベビーカー', label: 'ベビーカー', art: 'stroller', accepted: true, scale: 0.65, x: 60, y: 210, explanation: '金属[きんぞく]の部分[ぶぶん]が半分[はんぶん]以上[いじょう]のベビーカーは出[だ]せるよ。「有価物[ゆうかぶつ]」と書[か]いた紙[かみ]をかならず貼[は]ろう。', sources: ['yukabutu'] },
      { id: 'cardboard', name: '届[とど]いた荷物[にもつ]のダンボール', label: 'ダンボール', art: 'cardboard', accepted: true, x: 200, y: 400, explanation: 'ダンボールはつぶして出[だ]すよ。宛名[あてな]のシールははがして「燃[も]やすごみ」へ。', sources: ['yukabutu'] },
      { id: 'newspaper', name: '玄関[げんかん]にたまった新聞[しんぶん]', label: 'しんぶん', art: 'newspaper', accepted: true, x: 60, y: 400, explanation: '新聞[しんぶん]はヒモでしばって出[だ]すよ。雑誌[ざっし]とはまぜないでね。', sources: ['yukabutu'] },
      { id: 'can', name: '洗[あら]ってある空[あ]き缶[かん]', label: 'あきかん', art: 'can', accepted: true, x: 200, y: 240, explanation: '空[あ]き缶[かん]は水洗[みずあら]いして出[だ]すよ。大[おお]きな缶[かん]はつぶしてね。', sources: ['yukabutu'] },
      { id: 'spray', name: '虫[むし]よけスプレーの缶[かん]', label: 'スプレーかん', art: 'spray', accepted: false, x: 300, y: 230, explanation: 'スプレー缶[かん]は対象外[たいしょうがい]。市[し]のごみ収集[しゅうしゅう]で、中身[なかみ]を使[つか]い切[き]ってから出[だ]すよ。', sources: ['yukabutu', 'gomi'] },
      { id: 'pet-bottle', name: 'ペットボトル', label: 'ペットボトル', art: 'pet-bottle', accepted: false, x: 320, y: 400, explanation: 'ペットボトルは有価物回収[ゆうかぶつかいしゅう]の対象[たいしょう]ではないよ。市[し]のペットボトル収集[しゅうしゅう]に出[だ]すんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'dry-battery', name: '使[つか]い終[お]わった乾電池[かんでんち]', label: 'かんでんち', art: 'dry-battery', accepted: false, x: 130, y: 150, explanation: '乾電池[かんでんち]は有価物[ゆうかぶつ]ではないよ。市[し]のごみ収集[しゅうしゅう]では「燃[も]やさないごみ」の日[ひ]に、別[べつ]の袋[ふくろ]に入[い]れて出[だ]すんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'kettle', name: 'こわれた電気[でんき]ケトル', label: 'でんきケトル', art: 'kettle', accepted: false, x: 230, y: 150, explanation: '電気[でんき]ケトルのような小型[こがた]の電気製品[でんきせいひん]は、市[し]の「燃[も]やさないごみ」。有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。', sources: ['yukabutu', 'gomi'] },
      { id: 'mirror', name: '玄関[げんかん]の鏡[かがみ]', label: 'かがみ', art: 'mirror', accepted: false, x: 320, y: 70, explanation: '鏡[かがみ]は有価物回収[ゆうかぶつかいしゅう]に出[だ]せないよ。', sources: ['yukabutu'] },
      { id: 'plush', name: 'ぬいぐるみ', label: 'ぬいぐるみ', art: 'plush', accepted: false, x: 300, y: 150, explanation: 'ぬいぐるみは有価物[ゆうかぶつ]ではないよ。市[し]のごみ収集[しゅうしゅう]では「燃[も]やさないごみ」になるんだ。', sources: ['yukabutu', 'gomi'] },
    ],
  },
  {
    id: 'storage',
    name: '物置[ものお]き',
    scene: 'storage',
    tips: [
      '金属製品[きんぞくせいひん]は、長[なが]さ2メートル以内[いない]・重[おも]さ20キログラム以内[いない]・金属[きんぞく]が半分[はんぶん]以上[いじょう]のものが対象[たいしょう]だよ。',
      'ストーブ類[るい]はかならず灯油[とうゆ]を抜[ぬ]いて、電動[でんどう]アシスト自転車[じてんしゃ]はバッテリーを外[はず]してから出[だ]すよ。',
      'パネルヒーターは「パネルヒーター」と書[か]いた紙[かみ]を貼[は]って出[だ]す。オイルヒーターは中[なか]のオイルが抜[ぬ]けないので出[だ]せないよ。やかんや鍋[なべ]など金属[きんぞく]が半分[はんぶん]以上[いじょう]の物[もの]も金属製品[きんぞくせいひん]だよ。',
      '重[おも]いもの・灯油[とうゆ]・ガスは、かならず大人[おとな]の人[ひと]にまかせてね。',
    ],
    objects: [
      { id: 'stove', name: '古[ふる]い石油[せきゆ]ストーブ', label: 'ストーブ', art: 'stove', accepted: true, scale: 0.65, x: 60, y: 160, explanation: 'ストーブ類[るい]は金属製品[きんぞくせいひん]として出[だ]せるよ。かならず灯油[とうゆ]を抜[ぬ]いてから。灯油[とうゆ]は大人[おとな]の人[ひと]にまかせてね。', sources: ['yukabutu'] },
      { id: 'metal-kettle', name: '古[ふる]いやかん', label: 'やかん', art: 'metal-kettle', accepted: true, x: 290, y: 150, explanation: 'やかんのように金属[きんぞく]が半分[はんぶん]以上[いじょう]の製品[せいひん]は、金属製品[きんぞくせいひん]として出[だ]せるよ。中[なか]を空[から]にしてね。', sources: ['yukabutu'] },
      { id: 'pot', name: '使[つか]わなくなった鍋[なべ]', label: 'なべ', art: 'pot', accepted: true, x: 180, y: 160, explanation: '金属[きんぞく]の鍋[なべ]も金属製品[きんぞくせいひん]として出[だ]せるよ。長[なが]さ2メートル以内[いない]・重[おも]さ20キログラム以内[いない]・金属[きんぞく]が半分[はんぶん]以上[いじょう]が決[き]まりだよ。', sources: ['yukabutu'] },
      { id: 'big-can', name: '空[あ]っぽの一斗缶[いっとかん]', label: 'いっとかん', art: 'big-can', accepted: true, x: 60, y: 290, explanation: '大[おお]きな缶[かん]も空[あ]き缶[かん]として出[だ]せるよ。かならずつぶしてね。', sources: ['yukabutu'] },
      { id: 'e-bike', name: '電動[でんどう]アシスト自転車[じてんしゃ]', label: 'でんどうじてんしゃ', art: 'e-bike', accepted: true, scale: 0.7, x: 250, y: 300, explanation: '電動[でんどう]アシスト自転車[じてんしゃ]も出[だ]せるけど、バッテリーをかならず外[はず]して、「有価物[ゆうかぶつ]」の貼[は]り紙[がみ]をしてね。', sources: ['yukabutu'] },
      { id: 'cardboard', name: 'たたんだダンボール', label: 'ダンボール', art: 'cardboard', accepted: true, x: 300, y: 400, explanation: 'つぶしたダンボールは、そのまま有価物[ゆうかぶつ]に出[だ]せるよ。', sources: ['yukabutu'] },
      { id: 'oil-heater', name: 'オイルヒーター', label: 'オイルヒーター', art: 'oil-heater', accepted: false, scale: 0.65, x: 60, y: 400, explanation: 'オイルヒーターは中[なか]のオイルが抜[ぬ]けないので、有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。', sources: ['yukabutu'] },
      { id: 'gas-cylinder', name: 'プロパンガスのボンベ', label: 'ガスボンベ', art: 'gas-cylinder', accepted: false, scale: 0.65, x: 180, y: 400, explanation: 'ガスボンベは有価物[ゆうかぶつ]ではなく、市[し]のごみ収集[しゅうしゅう]でも「処理[しょり]できないごみ」。さわらずに大人[おとな]の人[ひと]にまかせよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'tire', name: '古[ふる]いタイヤ', label: 'タイヤ', art: 'tire', accepted: false, x: 150, y: 290, explanation: 'タイヤは有価物[ゆうかぶつ]ではなく、市[し]のごみ収集[しゅうしゅう]でも「処理[しょり]できないごみ」なんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'battery', name: '古[ふる]いバッテリー', label: 'バッテリー', art: 'battery', accepted: false, x: 320, y: 260, explanation: 'バッテリー（充電池[じゅうでんち]）は有価物回収[ゆうかぶつかいしゅう]に出[だ]せないよ。電動[でんどう]アシスト自転車[じてんしゃ]のバッテリーも外[はず]して、市[し]の案内[あんない]にしたがって処分[しょぶん]してね。', sources: ['yukabutu'] },
      { id: 'herbicide', name: '除草剤[じょそうざい]のボトル', label: 'じょそうざい', art: 'herbicide', accepted: false, x: 320, y: 60, explanation: '除草剤[じょそうざい]や農薬[のうやく]の容器[ようき]は出[だ]せないよ。口[くち]に入[い]れる物[もの]が入[はい]っていた空[あ]きビンだけが有価物[ゆうかぶつ]なんだ。', sources: ['yukabutu'] },
      { id: 'spray', name: 'さびどめスプレーの缶[かん]', label: 'スプレーかん', art: 'spray', accepted: false, x: 220, y: 60, explanation: 'スプレー缶[かん]は対象外[たいしょうがい]。市[し]のごみ収集[しゅうしゅう]で、中身[なかみ]を使[つか]い切[き]ってから出[だ]すよ。', sources: ['yukabutu', 'gomi'] },
    ],
  },
]
