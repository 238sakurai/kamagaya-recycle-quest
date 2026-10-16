import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { RoomScene } from '../components/RoomScene'
import { Ruby } from '../components/Ruby'
import { Screen } from '../components/Screen'
import { ROOMS, type RoomObject } from '../data/rooms'
import { judgeRoom, type RoomResult } from '../lib/roomJudge'
import type { SoundName } from '../lib/sound'

interface RoomHuntScreenProps {
  /** 部屋ごとの最高の星の数 */
  bestStars: Record<string, number>
  onResult: (roomId: string, stars: number) => void
  onExit: () => void
  playSound: (name: SoundName) => void
  onCelebrate: () => void
  animate: boolean
}

type Phase = 'mark' | 'result'

/** ボーナスモード「おへやで有価物さがし」 */
export function RoomHuntScreen({ bestStars, onResult, onExit, playSound, onCelebrate, animate }: RoomHuntScreenProps) {
  const [roomIndex, setRoomIndex] = useState(0)
  const [marked, setMarked] = useState<ReadonlySet<string>>(() => new Set())
  const [phase, setPhase] = useState<Phase>('mark')
  const [result, setResult] = useState<RoomResult | null>(null)

  const room = ROOMS[roomIndex]
  const tabListRef = useRef<HTMLDivElement>(null)

  // 選んだ部屋のタブが見える位置までスクロールする
  useEffect(() => {
    const tab = tabListRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')
    tab?.scrollIntoView?.({ inline: 'center', block: 'nearest' })
  }, [roomIndex])
  const acceptedCount = useMemo(() => room.objects.filter((o) => o.accepted).length, [room])
  const hasNext = roomIndex + 1 < ROOMS.length

  const toggle = (id: string) => {
    const next = new Set(marked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setMarked(next)
    playSound('tap')
  }

  const check = () => {
    const r = judgeRoom(room.objects, marked)
    setResult(r)
    setPhase('result')
    onResult(room.id, r.stars)
    if (r.stars === 3) {
      playSound('fanfare')
      onCelebrate()
    } else {
      playSound('correct')
    }
  }

  const restart = (index: number) => {
    setRoomIndex(index)
    setMarked(new Set())
    setResult(null)
    setPhase('mark')
    playSound('tap')
  }

  return (
    <Screen
      testId="screen-room"
      header={
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-black leading-tight">
              <Ruby text="おへやで有価物[ゆうかぶつ]さがし" />
            </h2>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-bold" data-testid="room-progress">
              {roomIndex + 1} / {ROOMS.length}
            </span>
          </div>
          <div ref={tabListRef} className="flex gap-1.5 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="部屋をえらぶ">
            {ROOMS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={i === roomIndex}
                data-testid={`room-tab-${r.id}`}
                onClick={() => i !== roomIndex && restart(i)}
                className={`tap-area shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold ring-2 ${
                  i === roomIndex ? 'bg-eco-green text-white ring-eco-green' : 'bg-white text-eco-brown ring-eco-brown/10'
                }`}
              >
                <Ruby text={r.name} />
                {bestStars[r.id] ? <span className="ml-1 text-xs">{'★'.repeat(bestStars[r.id])}</span> : null}
              </button>
            ))}
          </div>
        </div>
      }
    >
      {phase === 'mark' ? (
        <p className="text-lg font-bold leading-snug">
          <Ruby text={`PTAの有価物回収[ゆうかぶつかいしゅう]に出[だ]せるものをタップして、丸[まる]をつけよう！（出[だ]せるものは ${acceptedCount}こ）`} />
        </p>
      ) : null}

      <RoomScene room={room} marked={marked} result={result} onTap={toggle} animate={animate} />

      {phase === 'mark' ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-bold" data-testid="mark-count">
              <Ruby text={`丸[まる]をつけた：${marked.size}こ`} />
            </p>
            <Button variant="ghost" onClick={() => setMarked(new Set())} label="ぜんぶ消[け]す" disabled={marked.size === 0} />
          </div>
          <Button size="lg" variant="yellow" onClick={check} label="できた！ 答[こた]え合[あ]わせ ▶" disabled={marked.size === 0} data-testid="check" />
          <p className="text-xs leading-relaxed text-eco-brown/60">
            <Ruby text="※ もういちどタップすると丸[まる]が消[き]えるよ。本当[ほんとう]のおうちで片[かた]づけるときは、大人[おとな]の人[ひと]といっしょにね。" />
          </p>
        </>
      ) : null}

      {phase === 'result' && result ? (
        <>
          <Card tone={result.stars === 3 ? 'green' : 'yellow'} className="flex flex-col items-center gap-1 text-center" >
            <p className="text-3xl" data-testid="stars" data-stars={result.stars}>
              {'★'.repeat(result.stars)}
              <span className="text-eco-brown/30">{'★'.repeat(3 - result.stars)}</span>
            </p>
            <p className="text-xl font-black">
              <Ruby
                text={
                  result.stars === 3
                    ? 'パーフェクト！ ぜんぶ見[み]つけた！'
                    : result.stars === 2
                      ? 'おしい！ あとすこし！'
                      : 'もういちど さがしてみよう！'
                }
              />
            </p>
            <p className="text-base" data-testid="result-summary">
              <Ruby text={`見[み]つけた有価物[ゆうかぶつ] ${result.found.length} / ${result.total}こ ・ まちがい ${result.wrong.length}こ ・ 見[み]のがし ${result.missed.length}こ`} />
            </p>
          </Card>

          <ResultList title="⭕ 正解[せいかい]！ 出[だ]せるもの" tone="green" objects={result.found} testId="result-found" />
          <ResultList title="❌ これは出[だ]せないよ" tone="pink" objects={result.wrong} testId="result-wrong" />
          <ResultList title="❗ 見[み]のがした有価物[ゆうかぶつ]" tone="yellow" objects={result.missed} testId="result-missed" />

          {room.tips && room.tips.length > 0 ? (
            <Card tone="sky" className="flex flex-col gap-2" >
              <p className="text-base font-black">
                <Ruby text="💡 出[だ]し方[かた]のポイント" />
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed" data-testid="room-tips">
                {room.tips.map((tip) => (
                  <li key={tip}>
                    <Ruby text={tip} />
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          <div className="flex flex-col gap-2">
            {hasNext ? <Button size="lg" onClick={() => restart(roomIndex + 1)} label="つぎの部屋[へや]へ ▶" data-testid="next-room" /> : null}
            <Button variant={hasNext ? 'secondary' : 'primary'} size={hasNext ? 'md' : 'lg'} onClick={() => restart(roomIndex)} label="🔁 この部屋[へや]をもういちど" data-testid="retry-room" />
            {!hasNext && roomIndex > 0 ? <Button variant="secondary" onClick={() => restart(0)} label="さいしょの部屋[へや]から" /> : null}
            <Button variant="ghost" onClick={onExit} label="タイトルへもどる" data-testid="room-exit" />
          </div>
        </>
      ) : null}

      {phase === 'mark' ? (
        <Button variant="ghost" onClick={onExit} label="タイトルへもどる" data-testid="room-exit" className="mt-auto" />
      ) : null}
    </Screen>
  )
}

function ResultList({ title, tone, objects, testId }: { title: string; tone: 'green' | 'pink' | 'yellow'; objects: RoomObject[]; testId: string }) {
  if (objects.length === 0) return null
  return (
    <Card tone={tone} className="flex flex-col gap-2" >
      <p className="text-base font-black">
        <Ruby text={title} />
      </p>
      <ul className="flex flex-col gap-2" data-testid={testId}>
        {objects.map((o) => (
          <li key={o.id} className="rounded-2xl bg-white/70 p-3 text-sm leading-relaxed">
            <p className="font-bold">
              <Ruby text={o.name} />
            </p>
            <p>
              <Ruby text={o.explanation} />
            </p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
