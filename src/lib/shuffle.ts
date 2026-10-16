/** 配列をシャッフルした新しい配列を返す（Fisher–Yates）。random は差し替え可能（テスト用）。 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * シャッフルしたうえで、同じグループ（keyOf の値が同じ要素）が隣り合わないように並べ替える。
 * 例: 紙類・布類・ビン類の品目が連続して出題されないようにする。
 * 同じグループが多すぎて隣接を避けられない場合は、避けられる範囲で並べる。
 */
export function shuffleNoAdjacent<T>(items: readonly T[], keyOf: (item: T) => string, random: () => number = Math.random): T[] {
  const pool = shuffle(items, random)
  const remaining = new Map<string, number>()
  for (const item of pool) remaining.set(keyOf(item), (remaining.get(keyOf(item)) ?? 0) + 1)

  const result: T[] = []
  while (pool.length > 0) {
    const prevKey = result.length > 0 ? keyOf(result[result.length - 1]) : null
    // 直前と違うグループのうち、残りが最も多いグループから選ぶ（後で隣接を避けられなくなるのを防ぐ）。
    // 同数のときはシャッフル順の先頭を使うので、並びはランダムになる。
    let index = -1
    let best = -1
    pool.forEach((item, i) => {
      const key = keyOf(item)
      if (key === prevKey) return
      const count = remaining.get(key) ?? 0
      if (count > best) {
        best = count
        index = i
      }
    })
    // 残りがすべて同じグループなら、やむを得ず先頭を使う
    const [next] = pool.splice(index === -1 ? 0 : index, 1)
    remaining.set(keyOf(next), (remaining.get(keyOf(next)) ?? 1) - 1)
    result.push(next)
  }
  return result
}
