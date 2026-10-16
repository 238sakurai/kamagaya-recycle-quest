import type { RoomObject } from '../data/rooms'

export interface RoomResult {
  /** 有価物に正しく丸をつけた */
  found: RoomObject[]
  /** 有価物ではないのに丸をつけた */
  wrong: RoomObject[]
  /** 有価物なのに丸をつけなかった */
  missed: RoomObject[]
  /** 有価物の総数 */
  total: number
  /** 1〜3 */
  stars: 1 | 2 | 3
}

/** 丸をつけたオブジェクトの集合から答え合わせをする（純粋関数） */
export function judgeRoom(objects: readonly RoomObject[], markedIds: ReadonlySet<string>): RoomResult {
  const found: RoomObject[] = []
  const wrong: RoomObject[] = []
  const missed: RoomObject[] = []
  for (const o of objects) {
    const marked = markedIds.has(o.id)
    if (o.accepted && marked) found.push(o)
    else if (!o.accepted && marked) wrong.push(o)
    else if (o.accepted && !marked) missed.push(o)
  }
  const total = objects.filter((o) => o.accepted).length
  const mistakes = wrong.length + missed.length
  const stars: RoomResult['stars'] = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1
  return { found, wrong, missed, total, stars }
}
