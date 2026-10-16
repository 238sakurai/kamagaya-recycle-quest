import { useMemo, useState } from 'react'
import { Card } from '../components/Card'
import { Feedback } from '../components/Feedback'
import { ItemArt } from '../components/ItemArt'
import { OptionList } from '../components/OptionList'
import { PointsBar } from '../components/PointsBar'
import { Ruby } from '../components/Ruby'
import { Screen } from '../components/Screen'
import { SORT_ITEMS, type SortItem, type Verdict } from '../data/items'
import { MAX_POINTS } from '../data/rewards'
import { pointsForAnswer } from '../lib/score'
import { shuffleNoAdjacent } from '../lib/shuffle'
import type { SoundName } from '../lib/sound'

interface Stage1Props {
  points: number
  onGain: (points: number) => void
  onComplete: () => void
  playSound: (name: SoundName) => void
  onCelebrate: () => void
}

type VerdictChoice = Verdict | 'asis'

const VERDICT_OPTIONS: { id: VerdictChoice; label: string }[] = [
  { id: 'asis', label: 'そのまま出[だ]せる' },
  { id: 'prep', label: 'じゅんびしてから出[だ]せる' },
  { id: 'no', label: '出[だ]せない' },
]

const VERDICT_HINT: Record<VerdictChoice, string> = {
  asis: '有価物[ゆうかぶつ]は、出[だ]す前[まえ]にかならず「じゅんび」がいるよ。もういちど考[かんが]えてみよう！',
  prep: 'これは有価物回収[ゆうかぶつかいしゅう]には出[だ]せないものだよ。',
  no: 'じつは有価物回収[ゆうかぶつかいしゅう]に出[だ]せるよ。どうやって出[だ]すか考[かんが]えてみよう！',
}

type Phase = 'verdict' | 'verdict-feedback' | 'prep' | 'prep-feedback'

interface AnswerState {
  attempts: number
  wrongIds: string[]
  lastCorrect: boolean
  gained: number
}

const EMPTY: AnswerState = { attempts: 0, wrongIds: [], lastCorrect: false, gained: 0 }

export function Stage1Sort({ points, onGain, onComplete, playSound, onCelebrate }: Stage1Props) {
  // 同じ種類（紙類・布類・缶・ビン）の品目が続けて出ないように並べる
  const items = useMemo(() => shuffleNoAdjacent(SORT_ITEMS, (i) => i.category), [])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('verdict')
  const [verdictState, setVerdictState] = useState<AnswerState>(EMPTY)
  const [prepState, setPrepState] = useState<AnswerState>(EMPTY)
  const [shake, setShake] = useState(false)

  const item: SortItem = items[index]
  const total = items.length

  const wrongShake = () => {
    setShake(true)
    window.setTimeout(() => setShake(false), 500)
  }

  const answerVerdict = (choice: string) => {
    const attempts = verdictState.attempts + 1
    const correct = choice === item.verdict
    const gained = correct ? pointsForAnswer(attempts) : 0
    setVerdictState({ attempts, wrongIds: correct ? verdictState.wrongIds : [...verdictState.wrongIds, choice], lastCorrect: correct, gained })
    if (correct) {
      onGain(gained)
      playSound('correct')
      onCelebrate()
    } else {
      playSound('wrong')
      wrongShake()
    }
    setPhase('verdict-feedback')
  }

  const answerPrep = (choice: string) => {
    if (!item.prep) return
    const attempts = prepState.attempts + 1
    const correct = choice === item.prep.correctId
    const gained = correct ? pointsForAnswer(attempts) : 0
    setPrepState({ attempts, wrongIds: correct ? prepState.wrongIds : [...prepState.wrongIds, choice], lastCorrect: correct, gained })
    if (correct) {
      onGain(gained)
      playSound('correct')
      onCelebrate()
    } else {
      playSound('wrong')
      wrongShake()
    }
    setPhase('prep-feedback')
  }

  const goNextItem = () => {
    if (index + 1 >= total) {
      onComplete()
      return
    }
    setIndex(index + 1)
    setPhase('verdict')
    setVerdictState(EMPTY)
    setPrepState(EMPTY)
  }

  const afterVerdictFeedback = () => {
    if (!verdictState.lastCorrect) {
      setPhase('verdict')
      return
    }
    if (item.verdict === 'prep' && item.prep) {
      setPhase('prep')
    } else {
      goNextItem()
    }
  }

  const afterPrepFeedback = () => {
    if (!prepState.lastCorrect) {
      setPhase('prep')
      return
    }
    goNextItem()
  }

  const lastWrongVerdict = verdictState.wrongIds[verdictState.wrongIds.length - 1] as VerdictChoice | undefined
  const isPrepStep = phase === 'prep' || phase === 'prep-feedback'

  return (
    <Screen
      testId="screen-stage1"
      header={
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black leading-tight">
              <Ruby text="ステージ1：有価物[ゆうかぶつ]を仕分[しわ]けよう！" />
            </h2>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-bold tabular-nums" data-testid="stage1-progress">
              {index + 1} / {total}
            </span>
          </div>
          <PointsBar points={points} max={MAX_POINTS} />
        </div>
      }
    >
      <Card className={`relative flex flex-col items-center gap-2 ${shake ? 'animate-wiggle' : ''}`} tone={isPrepStep ? 'yellow' : 'sky'}>
        <span
          data-testid="step-badge"
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black ${isPrepStep ? 'bg-eco-yellow-dark text-white' : 'bg-white text-eco-brown'}`}
        >
          <Ruby text={isPrepStep ? 'ステップ2：出[だ]し方[かた]' : 'ステップ1：出[だ]せる？'} />
        </span>
        <ItemArt art={item.art} className="size-36" />
        <p className="text-3xl font-black" data-testid="item-name" data-item-id={item.id}>
          <Ruby text={item.name} />
        </p>
        {isPrepStep ? (
          <p className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-eco-green-dark">
            <Ruby text="⭕ 出[だ]せる → つぎは出[だ]し方[かた]！" />
          </p>
        ) : null}
      </Card>

      {phase === 'verdict' ? (
        <section className="flex flex-col gap-3" aria-labelledby="q-verdict">
          <p id="q-verdict" className="text-xl font-bold">
            <Ruby text="これは、PTAの有価物回収[ゆうかぶつかいしゅう]に出[だ]せる？" />
          </p>
          <OptionList options={VERDICT_OPTIONS} onSelect={answerVerdict} wrongIds={verdictState.wrongIds} />
        </section>
      ) : null}

      {phase === 'verdict-feedback' ? (
        verdictState.lastCorrect ? (
          <Feedback
            kind="correct"
            message={item.explanation}
            extra={item.verdict === 'no' ? item.instead : undefined}
            gained={verdictState.gained}
            onNext={afterVerdictFeedback}
            nextLabel={item.verdict === 'prep' ? 'ステップ2：出[だ]し方[かた]へ ▶' : 'つぎの品目[ひんもく]へ ▶'}
          />
        ) : (
          <Feedback kind="wrong" message={VERDICT_HINT[lastWrongVerdict ?? 'asis']} onNext={afterVerdictFeedback} />
        )
      ) : null}

      {phase === 'prep' && item.prep ? (
        <section className="flex flex-col gap-3" aria-labelledby="q-prep">
          <p id="q-prep" className="text-xl font-bold">
            <Ruby text={item.prep.question} />
          </p>
          <OptionList options={item.prep.options} onSelect={answerPrep} wrongIds={prepState.wrongIds} />
        </section>
      ) : null}

      {phase === 'prep-feedback' && item.prep ? (
        prepState.lastCorrect ? (
          <Feedback kind="correct" message={item.explanation} gained={prepState.gained} onNext={afterPrepFeedback} nextLabel="つぎの品目[ひんもく]へ ▶" />
        ) : (
          <Feedback kind="wrong" message="そのやり方[かた]だと回収[かいしゅう]してもらえないかも。公式[こうしき]のルールを思[おも]い出[だ]してみよう！" onNext={afterPrepFeedback} />
        )
      ) : null}

      <p className="mt-auto text-center text-xs text-eco-brown/60">
        <Ruby text="おうちで実際[じっさい]に用意[ようい]するときは、大人[おとな]の人[ひと]といっしょにね。" />
      </p>
    </Screen>
  )
}
