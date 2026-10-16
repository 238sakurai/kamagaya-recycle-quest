/**
 * ステージ3の還元演出。ポイントのしきい値に達するたびに、学校がハッピーになる。
 * これはしくみを学ぶためのゲーム上の例示で、実際の奨励金額や各PTAの予算配分を表すものではない。
 */
export interface Reward {
  id: string
  threshold: number
  title: string
  description: string
  art: 'books' | 'concert' | 'equipment'
}

export const REWARDS: Reward[] = [
  {
    id: 'books',
    threshold: 30,
    title: '図書室[としょしつ]に新[あたら]しい本[ほん]がふえた！',
    description: '奨励金[しょうれいきん]は図書[としょ]の購入[こうにゅう]などに使[つか]われるよ。',
    art: 'books',
  },
  {
    id: 'concert',
    threshold: 60,
    title: '芸術鑑賞会[げいじゅつかんしょうかい]がひらかれた！',
    description: '音楽[おんがく]や劇[げき]を見[み]る会[かい]の費用[ひよう]にもなるんだ。',
    art: 'concert',
  },
  {
    id: 'equipment',
    threshold: 85,
    title: '学校[がっこう]の備品[びひん]がふえた！',
    description: 'みんなが使[つか]う道具[どうぐ]もそろうよ。',
    art: 'equipment',
  },
]

/** 満点。1問5点 × 20問 */
export const MAX_POINTS = 100
