import type { SourceId } from './sources'

/**
 * ステージ1「有価物を仕分けよう！」の出題データ。
 *
 * verdict:
 *  - 'prep' … 有価物回収に出せるが、準備（つぶす・洗う等）が必要
 *  - 'no'   … 有価物回収運動の対象外
 *
 * 公式ページ（yukabutu）では、対象品目すべてに出し方の決まりがあるため、
 * 「そのまま出せる」が正解になる品目は存在しない。
 */
export type Verdict = 'prep' | 'no'

export interface PrepOption {
  id: string
  /** ふりがな記法: 漢字[よみ] */
  label: string
}

export interface SortItem {
  id: string
  /** ふりがな記法: 漢字[よみ] */
  name: string
  /** イラストの種類（Illustration コンポーネントが解釈） */
  art: string
  verdict: Verdict
  /** 正解時に表示する解説（ふりがな記法） */
  explanation: string
  /** verdict が 'prep' のときの出し方クイズ */
  prep?: {
    question: string
    options: PrepOption[]
    correctId: string
  }
  /** 対象外のとき、代わりにどこへ出すか（公式ページ gomi より） */
  instead?: string
  sources: SourceId[]
}

export const SORT_ITEMS: SortItem[] = [
  {
    id: 'newspaper',
    name: '新聞[しんぶん]',
    art: 'newspaper',
    verdict: 'prep',
    explanation:
      '新聞[しんぶん]は紙類[かみるい]の有価物[ゆうかぶつ]。雑誌[ざっし]とは分[わ]けて、ヒモでしばって出[だ]すよ。',
    prep: {
      question: '新聞[しんぶん]は、どうやって出[だ]す？',
      options: [
        { id: 'tie', label: '雑誌[ざっし]と分[わ]けてヒモでしばる' },
        { id: 'bag', label: 'ビニール袋[ぶくろ]に入[い]れる' },
        { id: 'wet', label: '水[みず]でぬらしてまとめる' },
      ],
      correctId: 'tie',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'magazine',
    name: '雑誌[ざっし]',
    art: 'magazine',
    verdict: 'prep',
    explanation:
      '雑誌[ざっし]も紙類[かみるい]の有価物[ゆうかぶつ]。新聞[しんぶん]とまぜないで、ヒモでしばろう。',
    prep: {
      question: '雑誌[ざっし]は、どうやって出[だ]す？',
      options: [
        { id: 'mix', label: '新聞[しんぶん]といっしょにまとめる' },
        { id: 'tie', label: '新聞[しんぶん]と分[わ]けてヒモでしばる' },
        { id: 'tear', label: 'ページをバラバラにちぎる' },
      ],
      correctId: 'tie',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'cardboard',
    name: 'ダンボール',
    art: 'cardboard',
    verdict: 'prep',
    explanation:
      'ダンボールは有価物[ゆうかぶつ]。かならずつぶして、平[たい]らにしてから出[だ]すよ。',
    prep: {
      question: 'ダンボールは、どうやって出[だ]す？',
      options: [
        { id: 'box', label: '箱[はこ]のかたちのまま出[だ]す' },
        { id: 'flat', label: 'つぶして平[たい]らにする' },
        { id: 'cut', label: '小[ちい]さくちぎって袋[ふくろ]に入[い]れる' },
      ],
      correctId: 'flat',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'clothes',
    name: '古着[ふるぎ]',
    art: 'clothes',
    verdict: 'prep',
    explanation:
      '古着[ふるぎ]やカーテン、シーツ、毛布[もうふ]はボロ布[ぬの]の有価物[ゆうかぶつ]。ぬれないようにポリ袋[ぶくろ]に入[い]れて出[だ]そう。',
    prep: {
      question: '古着[ふるぎ]は、どうやって出[だ]す？',
      options: [
        { id: 'bag', label: 'ぬれないようにポリ袋[ぶくろ]に入[い]れる' },
        { id: 'tie', label: 'ヒモでしばってそのまま置[お]く' },
        { id: 'wash', label: '水[みず]でぬらしてから出[だ]す' },
      ],
      correctId: 'bag',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'can',
    name: '空[あ]き缶[かん]',
    art: 'can',
    verdict: 'prep',
    explanation:
      '空[あ]き缶[かん]は金属類[きんぞくるい]の有価物[ゆうかぶつ]。中[なか]を水洗[みずあら]いして出[だ]そう。大[おお]きな缶[かん]はつぶしてね。',
    prep: {
      question: '空[あ]き缶[かん]は、どうやって出[だ]す？',
      options: [
        { id: 'asis', label: '中身[なかみ]がのこっていてもそのまま' },
        { id: 'wash', label: '中[なか]を水洗[みずあら]いする' },
        { id: 'paper', label: '新聞紙[しんぶんし]でつつむ' },
      ],
      correctId: 'wash',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'bottle',
    name: '空[あ]きビン',
    art: 'bottle',
    verdict: 'prep',
    explanation:
      'ジュースやお酒[さけ]など、口[くち]に入[い]れる物[もの]が入[はい]っていた空[あ]きビンは有価物[ゆうかぶつ]。キャップを外[はず]して水洗[みずあら]いし、ビン回収袋[かいしゅうぶくろ]（ない場所[ばしょ]はポリ袋[ぶくろ]）に入[い]れるよ。',
    prep: {
      question: '空[あ]きビンは、どうやって出[だ]す？',
      options: [
        { id: 'cap', label: 'キャップをつけたまま出[だ]す' },
        { id: 'break', label: 'わって小[ちい]さくする' },
        { id: 'wash', label: 'キャップを外[はず]して水洗[みずあら]いする' },
      ],
      correctId: 'wash',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'blanket',
    name: '毛布[もうふ]',
    art: 'blanket',
    verdict: 'prep',
    explanation:
      '毛布[もうふ]もボロ布[ぬの]として出[だ]せるよ。ぬれないようにポリ袋[ぶくろ]に入[い]れよう。電気毛布[でんきもうふ]やキルティングの物[もの]は出[だ]せないので注意[ちゅうい]！',
    prep: {
      question: '毛布[もうふ]は、どうやって出[だ]す？',
      options: [
        { id: 'bag', label: 'ぬれないようにポリ袋[ぶくろ]に入[い]れる' },
        { id: 'fold', label: 'たたんで地面[じめん]に置[お]く' },
        { id: 'cut', label: '小[ちい]さく切[き]る' },
      ],
      correctId: 'bag',
    },
    sources: ['yukabutu'],
  },
  {
    id: 'spray',
    name: 'スプレー缶[かん]',
    art: 'spray',
    verdict: 'no',
    explanation:
      'スプレー缶[かん]は有価物回収運動[ゆうかぶつかいしゅううんどう]の対象外[たいしょうがい]。PTAの回収[かいしゅう]には出[だ]せないよ。',
    instead:
      '市[し]のごみ収集[しゅうしゅう]では「資源[しげん]になるもの」として、中身[なかみ]を完全[かんぜん]に使[つか]い切[き]ってから出[だ]します。おうちの人[ひと]にまかせてね。',
    sources: ['yukabutu', 'gomi'],
  },
  {
    id: 'broken-bottle',
    name: '割[わ]れたビン',
    art: 'broken-bottle',
    verdict: 'no',
    explanation:
      '割[わ]れたビンは出[だ]せません。鏡[かがみ]・ガラス・電球[でんきゅう]・せとものも有価物回収[ゆうかぶつかいしゅう]の対象外[たいしょうがい]だよ。',
    instead:
      '割[わ]れた物[もの]はあぶないので、さわらずに大人[おとな]の人[ひと]にまかせよう。市[し]のごみ収集[しゅうしゅう]では、新聞[しんぶん]などでつつんで「危険[きけん]」と書[か]いて出[だ]します。',
    sources: ['yukabutu', 'gomi'],
  },
  {
    id: 'cosmetic-bottle',
    name: '化粧[けしょう]ビン',
    art: 'cosmetic',
    verdict: 'no',
    explanation:
      '化粧品[けしょうひん]のビンや農薬[のうやく]のビンは、口[くち]に入[い]れる物[もの]が入[はい]っていたビンではないので、有価物回収[ゆうかぶつかいしゅう]には出[だ]せないよ。',
    instead:
      '市[し]のごみ収集[しゅうしゅう]のルールにしたがって出[だ]します。おうちの人[ひと]と分別一覧表[ぶんべついちらんひょう]を確認[かくにん]してね。',
    sources: ['yukabutu', 'gomi'],
  },
]

export const PREP_ITEM_COUNT = SORT_ITEMS.filter((i) => i.verdict === 'prep').length
