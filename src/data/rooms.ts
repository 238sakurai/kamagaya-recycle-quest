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
  scene: 'kids' | 'living'
  objects: RoomObject[]
}

/** 部屋のイラストの大きさ（viewBox） */
export const ROOM_WIDTH = 360
export const ROOM_HEIGHT = 440
/** オブジェクトのタップ領域（viewBox 単位、中心からの半径） */
export const OBJECT_HIT_RADIUS = 34

export const ROOMS: Room[] = [
  {
    id: 'kids',
    name: 'こどもべや',
    scene: 'kids',
    objects: [
      { id: 'newspaper', name: '新聞[しんぶん]', art: 'newspaper', accepted: true, x: 60, y: 300, explanation: '新聞[しんぶん]は紙類[かみるい]の有価物[ゆうかぶつ]。雑誌[ざっし]と分[わ]けてヒモでしばろう。', sources: ['yukabutu'] },
      { id: 'magazine', name: 'マンガ雑誌[ざっし]', art: 'magazine', accepted: true, x: 300, y: 150, explanation: 'マンガも雑誌[ざっし]として出[だ]せるよ。新聞[しんぶん]とは分[わ]けてヒモでしばろう。', sources: ['yukabutu'] },
      { id: 'cardboard', name: 'ダンボール箱[ばこ]', art: 'cardboard', accepted: true, x: 290, y: 390, explanation: 'ダンボールは有価物[ゆうかぶつ]。つぶして平[たい]らにしてから出[だ]すよ。', sources: ['yukabutu'] },
      { id: 'can', name: 'ジュースの空[あ]き缶[かん]', art: 'can', accepted: true, x: 180, y: 240, explanation: '空[あ]き缶[かん]は金属類[きんぞくるい]の有価物[ゆうかぶつ]。中[なか]を水洗[みずあら]いして出[だ]そう。', sources: ['yukabutu'] },
      { id: 'clothes', name: '小[ちい]さくなったTシャツ', art: 'clothes', accepted: true, x: 110, y: 390, explanation: '古着[ふるぎ]はボロ布[ぬの]の有価物[ゆうかぶつ]。ぬれないようにポリ袋[ぶくろ]に入[い]れて出[だ]そう。', sources: ['yukabutu'] },
      { id: 'blanket', name: '古[ふる]い毛布[もうふ]', art: 'blanket', accepted: true, x: 60, y: 160, explanation: '毛布[もうふ]もボロ布[ぬの]として出[だ]せるよ。ポリ袋[ぶくろ]に入[い]れてね。電気毛布[でんきもうふ]は出[だ]せないので注意[ちゅうい]！', sources: ['yukabutu'] },
      { id: 'plush', name: 'ぬいぐるみ', art: 'plush', accepted: false, x: 200, y: 150, explanation: 'ぬいぐるみは有価物[ゆうかぶつ]ではないよ。市[し]のごみ収集[しゅうしゅう]では「燃[も]やさないごみ」になるんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'pet-bottle', name: 'ペットボトル', art: 'pet-bottle', accepted: false, x: 250, y: 290, explanation: 'ペットボトルは有価物回収[ゆうかぶつかいしゅう]の対象[たいしょう]ではないよ。市[し]のペットボトル収集[しゅうしゅう]に、キャップとラベルを外[はず]して出[だ]すんだ。', sources: ['yukabutu', 'gomi'] },
      { id: 'spray', name: 'スプレー缶[かん]', art: 'spray', accepted: false, x: 320, y: 250, explanation: 'スプレー缶[かん]は有価物回収[ゆうかぶつかいしゅう]の対象外[たいしょうがい]。市[し]のごみ収集[しゅうしゅう]では、中身[なかみ]を使[つか]い切[き]って「資源[しげん]になるもの」に出[だ]すよ。', sources: ['yukabutu', 'gomi'] },
      { id: 'bulb', name: '切[き]れた電球[でんきゅう]', art: 'bulb', accepted: false, x: 105, y: 225, explanation: '電球[でんきゅう]は出[だ]せないよ。ガラスや鏡[かがみ]、せとものも対象外[たいしょうがい]なんだ。', sources: ['yukabutu'] },
      { id: 'broken-glass', name: '割[わ]れたコップ', art: 'broken-bottle', accepted: false, x: 200, y: 380, explanation: '割[わ]れたガラスは出[だ]せないよ。あぶないのでさわらずに、大人[おとな]の人[ひと]にまかせよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'mirror', name: '手鏡[てかがみ]', art: 'mirror', accepted: false, x: 300, y: 60, explanation: '鏡[かがみ]は有価物回収[ゆうかぶつかいしゅう]に出[だ]せないよ。市[し]のごみ収集[しゅうしゅう]のルールで出[だ]してね。', sources: ['yukabutu'] },
    ],
  },
  {
    id: 'living',
    name: 'リビング・キッチン',
    scene: 'living',
    objects: [
      { id: 'newspaper', name: '新聞[しんぶん]の山[やま]', art: 'newspaper', accepted: true, x: 60, y: 390, explanation: 'たまった新聞[しんぶん]は紙類[かみるい]の有価物[ゆうかぶつ]。ヒモでしばって出[だ]そう。', sources: ['yukabutu'] },
      { id: 'bottle', name: 'ジュースの空[あ]きビン', art: 'bottle', accepted: true, x: 230, y: 150, explanation: '飲[の]み物[もの]の空[あ]きビンは有価物[ゆうかぶつ]。キャップを外[はず]して水洗[みずあら]いし、ビン回収袋[かいしゅうぶくろ]に入[い]れるよ。', sources: ['yukabutu'] },
      { id: 'can', name: '缶詰[かんづめ]の空[あ]き缶[かん]', art: 'can', accepted: true, x: 300, y: 390, explanation: '缶詰[かんづめ]の缶[かん]も空[あ]き缶[かん]。中[なか]を水洗[みずあら]いして出[だ]そう。', sources: ['yukabutu'] },
      { id: 'cardboard', name: '通販[つうはん]のダンボール', art: 'cardboard', accepted: true, x: 120, y: 290, explanation: 'ダンボールはつぶして出[だ]すよ。宛名[あてな]など個人情報[こじんじょうほう]の部分[ぶぶん]は取[と]りのぞいてね。', sources: ['yukabutu'] },
      { id: 'curtain', name: '古[ふる]いカーテン', art: 'curtain', accepted: true, x: 60, y: 130, explanation: 'カーテンもボロ布[ぬの]の有価物[ゆうかぶつ]。ぬれないようにポリ袋[ぶくろ]に入[い]れて出[だ]そう。', sources: ['yukabutu'] },
      { id: 'magazine', name: '読[よ]みおわった雑誌[ざっし]', art: 'magazine', accepted: true, x: 200, y: 290, explanation: '雑誌[ざっし]は紙類[かみるい]の有価物[ゆうかぶつ]。新聞[しんぶん]と分[わ]けてヒモでしばろう。', sources: ['yukabutu'] },
      { id: 'cosmetic', name: '化粧品[けしょうひん]のビン', art: 'cosmetic', accepted: false, x: 310, y: 150, explanation: '化粧[けしょう]ビンは口[くち]に入[い]れる物[もの]のビンじゃないので、有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。', sources: ['yukabutu'] },
      { id: 'spray', name: 'スプレー缶[かん]', art: 'spray', accepted: false, x: 150, y: 150, explanation: 'スプレー缶[かん]は対象外[たいしょうがい]。市[し]のごみ収集[しゅうしゅう]で、中身[なかみ]を使[つか]い切[き]ってから出[だ]すよ。', sources: ['yukabutu', 'gomi'] },
      { id: 'electric-blanket', name: '電気毛布[でんきもうふ]', art: 'electric-blanket', accepted: false, x: 300, y: 280, explanation: '電気毛布[でんきもうふ]は出[だ]せないよ。ふつうの毛布[もうふ]やシーツは出[だ]せるんだけどね。', sources: ['yukabutu'] },
      { id: 'tv', name: '古[ふる]いテレビ', art: 'tv', accepted: false, x: 60, y: 250, explanation: 'テレビは有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。市[し]のごみ収集[しゅうしゅう]でも「処理[しょり]できないごみ」なので、大人[おとな]の人[ひと]に相談[そうだん]しよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'plate', name: '割[わ]れたお皿[さら]', art: 'plate', accepted: false, x: 210, y: 390, explanation: 'せともののお皿[さら]は出[だ]せないよ。割[わ]れていたらあぶないので、さわらずに大人[おとな]にまかせよう。', sources: ['yukabutu', 'gomi'] },
      { id: 'pet-bottle', name: 'ペットボトル', art: 'pet-bottle', accepted: false, x: 310, y: 60, explanation: 'ペットボトルは有価物回収[ゆうかぶつかいしゅう]の対象[たいしょう]ではないよ。市[し]のペットボトル収集[しゅうしゅう]に出[だ]すんだ。', sources: ['yukabutu', 'gomi'] },
    ],
  },
]
