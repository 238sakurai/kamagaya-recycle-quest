/**
 * 1問あたりの基本ポイント。
 * 採点する問題は全部で20問（ステージ1: 10品目の「出せる？」+ 6品目の「出し方」、
 * ステージ2: 黄色い旗 + ルールクイズ3問）なので、満点は 20 × 5 = 100点。
 */
export const POINTS_FIRST_TRY = 5
/** やり直して正解したときのポイント */
export const POINTS_RETRY = 3

/**
 * 正解したときに加算するポイント。
 * 最初の1回で正解なら満点、2回目以降の正解でも少しもらえる（再挑戦が楽しくなるように）。
 */
export function pointsForAnswer(attempts: number): number {
  if (attempts <= 1) return POINTS_FIRST_TRY
  return POINTS_RETRY
}

/** しきい値をまたいで新たに解放された報酬の index を返す */
export function newlyUnlocked(
  thresholds: number[],
  before: number,
  after: number,
): number[] {
  const unlocked: number[] = []
  thresholds.forEach((t, index) => {
    if (before < t && after >= t) unlocked.push(index)
  })
  return unlocked
}

export function clampPoints(points: number, max: number): number {
  return Math.max(0, Math.min(max, points))
}
