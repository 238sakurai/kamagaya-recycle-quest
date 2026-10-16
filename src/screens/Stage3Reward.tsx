import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Feedback } from '../components/Feedback'
import { OptionList } from '../components/OptionList'
import { PointsBar } from '../components/PointsBar'
import { Ruby } from '../components/Ruby'
import { SchoolScene } from '../components/SchoolScene'
import { Screen } from '../components/Screen'
import { REWARD_QUIZ } from '../data/quiz'
import { MAX_POINTS, REWARDS, type Reward } from '../data/rewards'
import { newlyUnlocked, pointsForAnswer } from '../lib/score'
import type { SoundName } from '../lib/sound'

interface Stage3Props {
  points: number
  onGain: (points: number) => void
  onComplete: () => void
  playSound: (name: SoundName) => void
  onCelebrate: () => void
  animate: boolean
}

type Phase = 'intro' | 'quiz' | 'quiz-feedback' | 'deliver' | 'done'

const DELIVERIES = [
  { id: 'paper', label: '📰 紙類[かみるい]を回収[かいしゅう]！' },
  { id: 'metal', label: '🥫 缶[かん]・ビンを回収[かいしゅう]！' },
  { id: 'cloth', label: '👕 布類[ぬのるい]を回収[かいしゅう]！' },
]

export function Stage3Reward({ points, onGain, onComplete, playSound, onCelebrate, animate }: Stage3Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [truck, setTruck] = useState<'idle' | 'arrive' | 'done'>('idle')
  const [quizAttempts, setQuizAttempts] = useState(0)
  const [quizWrong, setQuizWrong] = useState<string[]>([])
  const [lastCorrect, setLastCorrect] = useState(false)
  const [gained, setGained] = useState(0)
  const [delivered, setDelivered] = useState(0)
  const [deliveredPoints, setDeliveredPoints] = useState(0)
  const [unlocked, setUnlocked] = useState<Reward[]>([])
  const [latest, setLatest] = useState<Reward | null>(null)

  // トラックの登場演出。アニメーションOFFなら即座に到着済みにする。
  useEffect(() => {
    if (phase !== 'intro') return
    if (!animate) {
      setTruck('done')
      return
    }
    setTruck('arrive')
    const timer = window.setTimeout(() => setTruck('done'), 1900)
    return () => window.clearTimeout(timer)
  }, [phase, animate])

  const thresholds = useMemo(() => REWARDS.map((r) => r.threshold), [])
  const unlockedArts = useMemo(() => new Set(unlocked.map((r) => r.art)), [unlocked])

  const answerQuiz = (choice: string) => {
    const attempts = quizAttempts + 1
    const correct = choice === REWARD_QUIZ.correctId
    setQuizAttempts(attempts)
    setLastCorrect(correct)
    if (correct) {
      const g = pointsForAnswer(attempts)
      setGained(g)
      onGain(g)
      playSound('correct')
      onCelebrate()
    } else {
      setQuizWrong([...quizWrong, choice])
      playSound('wrong')
    }
    setPhase('quiz-feedback')
  }

  const afterQuizFeedback = () => {
    if (!lastCorrect) {
      setPhase('quiz')
      return
    }
    setPhase('deliver')
  }

  /** 1回タップするごとに、集めたポイントの1/3ずつを学校に届ける */
  const deliver = () => {
    const step = delivered + 1
    const next = step >= DELIVERIES.length ? points : Math.round((points * step) / DELIVERIES.length)
    const indexes = newlyUnlocked(thresholds, deliveredPoints, next)
    const newRewards = indexes.map((i) => REWARDS[i])
    setDelivered(step)
    setDeliveredPoints(next)
    if (newRewards.length > 0) {
      setUnlocked([...unlocked, ...newRewards])
      setLatest(newRewards[newRewards.length - 1])
      playSound('unlock')
      onCelebrate()
    } else {
      setLatest(null)
      playSound('tap')
    }
    if (step >= DELIVERIES.length) setPhase('done')
  }

  return (
    <Screen
      testId="screen-stage3"
      header={
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-black leading-tight">
            <Ruby text="ステージ3：学校[がっこう]をハッピーに！" />
          </h2>
          <PointsBar points={points} max={MAX_POINTS} />
        </div>
      }
    >
      <SchoolScene unlocked={unlockedArts} truckStage={truck} animate={animate} />

      {phase === 'intro' ? (
        <>
          <Card tone="green">
            <p className="text-lg leading-relaxed">
              <Ruby text="きみが正[ただ]しく仕分[しわ]けた有価物[ゆうかぶつ]を、PTAの回収[かいしゅう]トラックが集[あつ]めに来[き]たよ！" />
            </p>
          </Card>
          <Button size="lg" onClick={() => setPhase('quiz')} label="集[あつ]めた有価物[ゆうかぶつ]はどうなる？ ▶" disabled={truck !== 'done'} data-testid="to-reward-quiz" />
        </>
      ) : null}

      {phase === 'quiz' || phase === 'quiz-feedback' ? (
        <>
          <Card tone="yellow">
            <p className="text-xl font-bold leading-relaxed" data-testid="quiz-question" data-quiz-id={REWARD_QUIZ.id}>
              <Ruby text={REWARD_QUIZ.question} />
            </p>
          </Card>
          {phase === 'quiz' ? <OptionList options={REWARD_QUIZ.options} onSelect={answerQuiz} wrongIds={quizWrong} /> : null}
          {phase === 'quiz-feedback' ? (
            lastCorrect ? (
              <Feedback kind="correct" gained={gained} message={REWARD_QUIZ.explanation} onNext={afterQuizFeedback} nextLabel="学校[がっこう]に届[とど]けよう ▶" />
            ) : (
              <Feedback kind="wrong" message="有価物[ゆうかぶつ]は「ごみ」じゃなくて「資源[しげん]」。もういちど考[かんが]えてみよう！" onNext={afterQuizFeedback} />
            )
          ) : null}
        </>
      ) : null}

      {phase === 'deliver' || phase === 'done' ? (
        <>
          <Card tone="sky" className="flex flex-col gap-2">
            <p className="text-lg font-bold">
              <Ruby text="リサイクルポイントを学校[がっこう]に届[とど]けよう！" />
            </p>
            <p className="text-sm">
              <Ruby text={`届[とど]けたポイント：${deliveredPoints} / ${points}`} />
            </p>
            <div className="h-4 overflow-hidden rounded-full bg-white ring-2 ring-eco-brown/10">
              <div className="h-full rounded-full bg-eco-yellow-dark transition-[width] duration-500" style={{ width: `${points ? (deliveredPoints / points) * 100 : 0}%` }} />
            </div>
          </Card>

          {latest ? (
            <div role="status" aria-live="polite" data-testid="reward-unlocked" className={`rounded-blob bg-eco-yellow/50 p-4 ring-4 ring-eco-yellow ${animate ? 'animate-pop' : ''}`}>
              <p className="text-xl font-black">
                🎉 <Ruby text={latest.title} />
              </p>
              <p className="mt-1 text-base">
                <Ruby text={latest.description} />
              </p>
            </div>
          ) : null}

          {phase === 'deliver' ? (
            <Button size="lg" variant="yellow" onClick={deliver} label={DELIVERIES[delivered].label} data-testid="deliver" />
          ) : null}

          {phase === 'done' ? (
            <>
              <Card tone="green" className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  <Ruby text="有価物[ゆうかぶつ]のしくみ" />
                </p>
                <ol className="list-decimal space-y-1 pl-6 text-base leading-relaxed">
                  <li>
                    <Ruby text="みんなが分[わ]けて出[だ]した有価物[ゆうかぶつ]を、PTAが集[あつ]める" />
                  </li>
                  <li>
                    <Ruby text="資源[しげん]として再利用[さいりよう]され、ごみがへる" />
                  </li>
                  <li>
                    <Ruby text="市[し]からPTAへ、回収量[かいしゅうりょう]に応[おう]じた奨励金[しょうれいきん]が交付[こうふ]される" />
                  </li>
                  <li>
                    <Ruby text="図書[としょ]・備品[びひん]・芸術鑑賞会[げいじゅつかんしょうかい]などで、子[こ]どもたちに還元[かんげん]される" />
                  </li>
                </ol>
              </Card>
              <p className="text-xs leading-relaxed text-eco-brown/70">
                ※ 本・鑑賞会・備品の演出は、しくみを学ぶためのゲーム上の例です。実際の奨励金の金額や、各PTAの予算の使い道を表すものではありません。
              </p>
              <Button size="lg" onClick={onComplete} label="クリア！ ▶" data-testid="to-clear" />
            </>
          ) : null}
        </>
      ) : null}
    </Screen>
  )
}
