import { useCallback, useEffect, useState } from 'react'
import { Confetti } from './components/Confetti'
import { useSettings } from './hooks/useSettings'
import { useVisibilityPause } from './hooks/useVisibilityPause'
import { clearAllData, DEFAULT_PROGRESS, loadProgress, recordClear, saveSchool, type Progress } from './lib/storage'
import { playSound as play, type SoundName } from './lib/sound'
import { ClearScreen } from './screens/ClearScreen'
import { SourcesScreen } from './screens/SourcesScreen'
import { Stage1Sort } from './screens/Stage1Sort'
import { Stage2Flag } from './screens/Stage2Flag'
import { Stage3Reward } from './screens/Stage3Reward'
import { TitleScreen } from './screens/TitleScreen'

type ScreenId = 'title' | 'stage1' | 'stage2' | 'stage3' | 'clear' | 'sources'

export default function App() {
  const { settings, toggle, reset: resetSettings } = useSettings()
  const hidden = useVisibilityPause()
  const [screen, setScreen] = useState<ScreenId>('title')
  const [returnTo, setReturnTo] = useState<ScreenId>('title')
  const [points, setPoints] = useState(0)
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [burst, setBurst] = useState(0)
  /** 同じゲームをもういちど遊ぶときに、ステージの内部状態をリセットするためのキー */
  const [run, setRun] = useState(0)

  const animate = settings.animation && !hidden

  const playSound = useCallback((name: SoundName) => play(name, settings.sound), [settings.sound])
  const celebrate = useCallback(() => setBurst((b) => b + 1), [])
  const gain = useCallback((p: number) => setPoints((prev) => prev + p), [])

  const start = () => {
    setPoints(0)
    setRun((r) => r + 1)
    playSound('tap')
    setScreen('stage1')
  }

  const finish = () => {
    setProgress(recordClear(points))
    playSound('fanfare')
    celebrate()
    setScreen('clear')
  }

  const showSources = (from: ScreenId) => {
    setReturnTo(from)
    setScreen('sources')
  }

  const clearData = () => {
    clearAllData()
    setProgress(DEFAULT_PROGRESS)
    resetSettings()
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen])

  return (
    <>
      <Confetti burstKey={burst} enabled={animate} />
      {screen === 'title' ? (
        <TitleScreen settings={settings} onToggle={toggle} progress={progress} onStart={start} onShowSources={() => showSources('title')} animate={animate} />
      ) : null}
      {screen === 'stage1' ? (
        <Stage1Sort key={`s1-${run}`} points={points} onGain={gain} onComplete={() => setScreen('stage2')} playSound={playSound} onCelebrate={celebrate} />
      ) : null}
      {screen === 'stage2' ? (
        <Stage2Flag key={`s2-${run}`} points={points} onGain={gain} onComplete={() => setScreen('stage3')} playSound={playSound} onCelebrate={celebrate} animate={animate} />
      ) : null}
      {screen === 'stage3' ? (
        <Stage3Reward key={`s3-${run}`} points={points} onComplete={finish} playSound={playSound} onCelebrate={celebrate} animate={animate} />
      ) : null}
      {screen === 'clear' ? (
        <ClearScreen
          points={points}
          progress={progress}
          onSelectSchool={(id) => setProgress(saveSchool(id))}
          onRestart={() => setScreen('title')}
          onShowSources={() => showSources('clear')}
          animate={animate}
        />
      ) : null}
      {screen === 'sources' ? <SourcesScreen onBack={() => setScreen(returnTo)} onClearData={clearData} /> : null}
    </>
  )
}
