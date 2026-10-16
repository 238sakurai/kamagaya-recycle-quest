import type { SourceId } from './sources'

export interface QuizOption {
  id: string
  label: string
}

export interface Quiz {
  id: string
  question: string
  options: QuizOption[]
  correctId: string
  explanation: string
  sources: SourceId[]
}

/** ステージ2「黄色い旗を探せ！」で、旗を見つけたあとに出すクイズ */
export const FLAG_QUIZZES: Quiz[] = [
  {
    id: 'deadline',
    question: '有価物回収[ゆうかぶつかいしゅう]は、回収日[かいしゅうび]の何時[なんじ]までに出[だ]す？',
    options: [
      { id: '8', label: '午前[ごぜん]8時[じ]' },
      { id: '9', label: '午前[ごぜん]9時[じ]' },
      { id: '15', label: '午後[ごご]3時[じ]' },
    ],
    correctId: '9',
    explanation:
      '回収日当日[かいしゅうびとうじつ]の午前[ごぜん]9時[じ]までに出[だ]します。それより後[あと]に出[だ]すと回収[かいしゅう]してもらえないよ。',
    sources: ['yukabutu', 'kaishubasyo'],
  },
  {
    id: 'other-day',
    question: '回収日[かいしゅうび]じゃない日[ひ]に、黄色[きいろ]い旗[はた]の場所[ばしょ]に出[だ]してもいい？',
    options: [
      { id: 'ok', label: 'いつでも出[だ]していい' },
      { id: 'no', label: '回収日[かいしゅうび]だけ出[だ]す' },
      { id: 'night', label: '前[まえ]の日[ひ]の夜[よる]なら出[だ]していい' },
    ],
    correctId: 'no',
    explanation:
      '出[だ]せるのは回収日[かいしゅうび]だけ。回収日以外[かいしゅうびいがい]に置[お]くと、ご近所[きんじょ]のめいわくになってしまうよ。',
    sources: ['yukabutu'],
  },
  {
    id: 'school-district',
    question: '回収日[かいしゅうび]は、鎌ケ谷市[かまがやし]のどこでも同[おな]じ日[ひ]？',
    options: [
      { id: 'same', label: '市内[しない]ぜんぶ同[おな]じ日[ひ]' },
      { id: 'district', label: '小学校[しょうがっこう]の学区[がっく]ごとにちがう' },
      { id: 'random', label: '毎回[まいかい]バラバラで決[き]まっていない' },
    ],
    correctId: 'district',
    explanation:
      '回収日[かいしゅうび]は小学校[しょうがっこう]の学区[がっく]ごとにちがうよ。市[し]の年間回収日程表[ねんかんかいしゅうにっていひょう]や、毎月[まいつき]15日号[にちごう]の広報紙[こうほうし]で確認[かくにん]しよう。',
    sources: ['yukabutu', 'kaishubasyo'],
  },
]

/** ステージ3「学校をハッピーに！」のしくみクイズ */
export const REWARD_QUIZ: Quiz = {
  id: 'reward',
  question: '集[あつ]めた有価物[ゆうかぶつ]は、そのあとどうなる？',
  options: [
    { id: 'burn', label: 'ぜんぶ燃[も]やしてすてる' },
    { id: 'recycle', label: 'リサイクルされて、PTAに奨励金[しょうれいきん]が届[とど]く' },
    { id: 'keep', label: '学校[がっこう]の倉庫[そうこ]にずっとしまっておく' },
  ],
  correctId: 'recycle',
  explanation:
    '集[あつ]めた有価物[ゆうかぶつ]は資源[しげん]として再利用[さいりよう]され、市[し]からPTAへ回収量[かいしゅうりょう]に応[おう]じた奨励金[しょうれいきん]が交付[こうふ]されるよ。奨励金[しょうれいきん]は芸術鑑賞会[げいじゅつかんしょうかい]や図書[としょ]・備品[びひん]の購入[こうにゅう]に使[つか]われて、子[こ]どもたちに還元[かんげん]されるんだ。',
  sources: ['yukabutu'],
}
