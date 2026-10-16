import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Feedback } from '../components/Feedback'
import { OptionList } from '../components/OptionList'
import { PointsBar } from '../components/PointsBar'
import { Ruby } from '../components/Ruby'
import { Screen } from '../components/Screen'
import { SPOTS, TownMap, type SpotId } from '../components/TownMap'
import { FLAG_QUIZZES } from '../data/quiz'
import { MAX_POINTS } from '../data/rewards'
import { SOURCES } from '../data/sources'
import { pointsForAnswer } from '../lib/score'
import type { SoundName } from '../lib/sound'

interface Stage2Props {
  points: number
  onGain: (points: number) => void
  onComplete: () => void
  playSound: (name: SoundName) => void
  onCelebrate: () => void
  animate: boolean
}

type Phase = 'find' | 'found' | 'quiz' | 'quiz-feedback' | 'info'

export function Stage2Flag({ points, onGain, onComplete, playSound, onCelebrate, animate }: Stage2Props) {
  const [phase, setPhase] = useState<Phase>('find')
  const [flagAttempts, setFlagAttempts] = useState(0)
  const [wrongSpots, setWrongSpots] = useState<SpotId[]>([])
  const [foundId, setFoundId] = useState<SpotId | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAttempts, setQuizAttempts] = useState(0)
  const [quizWrong, setQuizWrong] = useState<string[]>([])
  const [lastCorrect, setLastCorrect] = useState(false)
  const [gained, setGained] = useState(0)

  const quiz = FLAG_QUIZZES[quizIndex]

  const tapSpot = (id: SpotId) => {
    const spot = SPOTS.find((s) => s.id === id)
    if (!spot) return
    const attempts = flagAttempts + 1
    setFlagAttempts(attempts)
    if (spot.correct) {
      const g = pointsForAnswer(attempts)
      setGained(g)
      onGain(g)
      setFoundId(id)
      setHint(null)
      playSound('correct')
      onCelebrate()
      setPhase('found')
    } else {
      setWrongSpots([...wrongSpots, id])
      setHint(`それは${spot.label}だよ。有価物[ゆうかぶつ]の回収場所[かいしゅうばしょ]の目印[めじるし]は「黄色[きいろ]い旗[はた]」！`)
      playSound('wrong')
    }
  }

  const answerQuiz = (choice: string) => {
    const attempts = quizAttempts + 1
    const correct = choice === quiz.correctId
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
    if (quizIndex + 1 < FLAG_QUIZZES.length) {
      setQuizIndex(quizIndex + 1)
      setQuizAttempts(0)
      setQuizWrong([])
      setPhase('quiz')
    } else {
      setPhase('info')
    }
  }

  return (
    <Screen
      testId="screen-stage2"
      header={
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-black leading-tight">
            <Ruby text="ステージ2：黄色[きいろ]い旗[はた]を探[さが]せ！" />
          </h2>
          <PointsBar points={points} max={MAX_POINTS} />
        </div>
      }
    >
      {phase === 'find' || phase === 'found' ? (
        <>
          <p className="text-xl font-bold">
            <Ruby text="有価物[ゆうかぶつ]を出[だ]す場所[ばしょ]はどこかな？ 目印[めじるし]をタップしよう！" />
          </p>
          <TownMap onTap={tapSpot} disabled={phase !== 'find'} foundId={foundId} wrongIds={wrongSpots} animate={animate} />
          {hint && phase === 'find' ? (
            <p role="status" aria-live="polite" data-testid="flag-hint" className="rounded-2xl bg-eco-pink/25 p-3 text-base font-bold">
              <Ruby text={hint} />
            </p>
          ) : null}
          {phase === 'found' ? (
            <Feedback
              kind="correct"
              gained={gained}
              message="黄色[きいろ]い旗[はた]のある場所[ばしょ]が、有価物[ゆうかぶつ]の回収場所[かいしゅうばしょ]だよ。回収日[かいしゅうび]の朝[あさ]、ここに出[だ]すんだ。"
              onNext={() => setPhase('quiz')}
              nextLabel="ルールクイズへ ▶"
            />
          ) : null}
          <p className="text-xs text-eco-brown/60">
            <Ruby text="※この街[まち]はゲーム用[よう]の想像[そうぞう]の街[まち]です。本当[ほんとう]の回収場所[かいしゅうばしょ]は公式[こうしき]ページと現地[げんち]の黄色[きいろ]い旗[はた]で確認[かくにん]してね。" />
          </p>
        </>
      ) : null}

      {phase === 'quiz' || phase === 'quiz-feedback' ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-eco-brown/70">
              <Ruby text={`ルールクイズ ${quizIndex + 1} / ${FLAG_QUIZZES.length}`} />
            </p>
          </div>
          <Card tone="yellow">
            <p className="text-xl font-bold leading-relaxed" data-testid="quiz-question" data-quiz-id={quiz.id}>
              <Ruby text={quiz.question} />
            </p>
          </Card>
          {phase === 'quiz' ? <OptionList options={quiz.options} onSelect={answerQuiz} wrongIds={quizWrong} /> : null}
          {phase === 'quiz-feedback' ? (
            lastCorrect ? (
              <Feedback kind="correct" gained={gained} message={quiz.explanation} onNext={afterQuizFeedback} />
            ) : (
              <Feedback kind="wrong" message="もういちど考[かんが]えてみよう。ヒント：公式[こうしき]のルールは「回収日当日[かいしゅうびとうじつ]の朝[あさ]」がポイント！" onNext={afterQuizFeedback} />
            )
          ) : null}
        </>
      ) : null}

      {phase === 'info' ? (
        <>
          <Card tone="green" className="flex flex-col gap-3">
            <p className="text-2xl font-black">
              <Ruby text="📅 回収日[かいしゅうび]をチェック！" />
            </p>
            <p className="text-lg leading-relaxed">
              <Ruby text="回収日[かいしゅうび]は小学校[しょうがっこう]の学区[がっく]ごとにちがいます。日[ひ]にちは、鎌ケ谷市[かまがやし]の公式[こうしき]「年間回収日程表[ねんかんかいしゅうにっていひょう]」で確認[かくにん]してね。" />
            </p>
            <a
              href={SOURCES.schedule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-area rounded-blob bg-white px-4 py-3 text-center text-base font-bold underline underline-offset-4"
            >
              年間回収日程表（鎌ケ谷市公式・PDF）を開く
            </a>
            <p className="text-sm text-eco-brown/70">
              <Ruby text="毎月[まいつき]15日号[にちごう]の市[し]の広報紙[こうほうし]でもお知[し]らせされているよ。" />
            </p>
          </Card>
          <Card tone="sky">
            <p className="text-base leading-relaxed">
              <Ruby text="おぼえておこう：①黄色[きいろ]い旗[はた]の場所[ばしょ]に ②回収日[かいしゅうび]の午前[ごぜん]9時[じ]までに ③回収日以外[かいしゅうびいがい]には出[だ]さない！" />
            </p>
          </Card>
          <Button size="lg" onClick={onComplete} label="ステージ3へ ▶" data-testid="to-stage3" />
        </>
      ) : null}
    </Screen>
  )
}
