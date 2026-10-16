/**
 * ステージ2の街のイラスト。黄色い旗（正解）と、まぎらわしい目印（不正解）をタップできる。
 * 旗の位置はゲーム用の架空のもので、実際の回収場所を表すものではない。
 */
export type SpotId = 'yellow-flag' | 'red-flag' | 'blue-banner' | 'mailbox' | 'bus-stop'

export interface Spot {
  id: SpotId
  label: string
  correct: boolean
}

export const SPOTS: Spot[] = [
  { id: 'red-flag', label: '赤[あか]い旗[はた]', correct: false },
  { id: 'yellow-flag', label: '黄色[きいろ]い旗[はた]', correct: true },
  { id: 'blue-banner', label: '青[あお]いのぼり', correct: false },
  { id: 'mailbox', label: 'ポスト', correct: false },
  { id: 'bus-stop', label: 'バス停[てい]', correct: false },
]

interface TownMapProps {
  onTap: (id: SpotId) => void
  disabled?: boolean
  foundId?: SpotId | null
  wrongIds?: SpotId[]
  animate: boolean
}

const BROWN = '#453830'

export function TownMap({ onTap, disabled, foundId, wrongIds = [], animate }: TownMapProps) {
  const spotClass = (id: SpotId) => {
    const base = 'tap-area outline-none'
    if (wrongIds.includes(id)) return `${base} opacity-40`
    return base
  }
  const spotProps = (id: SpotId, label: string) => ({
    role: 'button' as const,
    tabIndex: disabled ? -1 : 0,
    'aria-label': label,
    'data-testid': `spot-${id}`,
    className: spotClass(id),
    onClick: () => !disabled && onTap(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onTap(id)
      }
    },
  })

  return (
    <svg viewBox="0 0 360 300" className="w-full rounded-blob bg-eco-sky/60 ring-4 ring-white" role="group" aria-label="街の地図">
      {/* 空と太陽 */}
      <circle cx="320" cy="40" r="22" fill="#FFD85A" />
      <ellipse cx="70" cy="50" rx="30" ry="12" fill="#fff" opacity="0.9" />
      <ellipse cx="90" cy="44" rx="22" ry="12" fill="#fff" opacity="0.9" />
      {/* 地面と道路 */}
      <rect x="0" y="150" width="360" height="150" fill="#A8E0B4" />
      <path d="M0 230 H360" stroke="#8C8378" strokeWidth="34" />
      <path d="M0 230 H360" stroke="#fff" strokeWidth="3" strokeDasharray="16 14" />
      {/* 学校 */}
      <g>
        <rect x="20" y="96" width="120" height="70" rx="4" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
        <rect x="70" y="80" width="20" height="16" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
        <circle cx="80" cy="88" r="4" fill="#FFD85A" stroke={BROWN} strokeWidth="2" />
        {[32, 58, 84, 110].map((x) => (
          <rect key={x} x={x} y="108" width="16" height="16" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
        ))}
        <rect x="70" y="138" width="20" height="28" fill="#58C78E" stroke={BROWN} strokeWidth="2" />
        <text x="80" y="185" textAnchor="middle" fontSize="12" fontWeight="700" fill={BROWN}>
          しょうがっこう
        </text>
      </g>
      {/* 家 */}
      <g>
        <path d="M180 110 L215 80 L250 110 Z" fill="#FF9FB2" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
        <rect x="188" y="110" width="54" height="56" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
        <rect x="206" y="136" width="18" height="30" fill="#E0B87A" stroke={BROWN} strokeWidth="2" />
        <rect x="194" y="118" width="12" height="12" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
      </g>
      {/* 公園の木 */}
      <g>
        <rect x="300" y="130" width="10" height="36" fill="#9C6B3C" stroke={BROWN} strokeWidth="2" />
        <circle cx="305" cy="118" r="26" fill="#58C78E" stroke={BROWN} strokeWidth="3" />
        <circle cx="290" cy="128" r="16" fill="#3EA973" />
      </g>
      {/* 赤い旗（学校の運動会っぽい） */}
      <g {...spotProps('red-flag', '赤い旗')} transform="translate(150 112)">
        <rect x="-20" y="-10" width="64" height="70" fill="transparent" />
        <rect x="-2" y="0" width="4" height="54" fill={BROWN} />
        <path d="M2 2 L40 12 L2 24 Z" fill="#E8574B" stroke={BROWN} strokeWidth="2" />
      </g>
      {/* 黄色い旗（正解） */}
      <g {...spotProps('yellow-flag', '黄色い旗')} transform="translate(262 152)">
        <rect x="-24" y="-10" width="72" height="74" fill="transparent" />
        <rect x="-2" y="0" width="4" height="60" fill={BROWN} />
        <g className={animate && !foundId ? 'animate-flag-wave' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
          <path d="M2 2 L44 14 L2 28 Z" fill="#FFD85A" stroke={BROWN} strokeWidth="2" />
        </g>
        <rect x="-18" y="48" width="40" height="14" fill="#FFFDF7" stroke={BROWN} strokeWidth="1.5" />
        <circle cx="-10" cy="55" r="4" fill="#B8E4FF" />
        <rect x="0" y="51" width="10" height="8" fill="#E0B87A" />
        <rect x="12" y="51" width="7" height="8" fill="#DDD" />
      </g>
      {/* 青いのぼり（お店） */}
      <g {...spotProps('blue-banner', '青いのぼり')} transform="translate(60 180)">
        <rect x="-18" y="-8" width="48" height="66" fill="transparent" />
        <rect x="-2" y="0" width="4" height="50" fill={BROWN} />
        <rect x="2" y="2" width="14" height="36" fill="#4A90E2" stroke={BROWN} strokeWidth="2" />
      </g>
      {/* ポスト */}
      <g {...spotProps('mailbox', 'ポスト')} transform="translate(200 182)">
        <rect x="-24" y="-10" width="48" height="60" fill="transparent" />
        <rect x="-10" y="0" width="20" height="30" rx="4" fill="#E8574B" stroke={BROWN} strokeWidth="2" />
        <rect x="-7" y="8" width="14" height="4" fill={BROWN} />
        <rect x="-4" y="30" width="8" height="12" fill="#8C8378" />
      </g>
      {/* バス停 */}
      <g {...spotProps('bus-stop', 'バス停')} transform="translate(330 170)">
        <rect x="-24" y="-16" width="48" height="64" fill="transparent" />
        <rect x="-2" y="0" width="4" height="44" fill={BROWN} />
        <circle cx="0" cy="0" r="12" fill="#FFFDF7" stroke={BROWN} strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill={BROWN}>
          バス
        </text>
      </g>
      {foundId === 'yellow-flag' ? (
        <g aria-hidden="true">
          <circle cx="268" cy="176" r="40" fill="none" stroke="#FFD85A" strokeWidth="5" className={animate ? 'svg-anim animate-pop' : ''} />
          <circle cx="268" cy="176" r="40" fill="#FFD85A" opacity="0.2" />
        </g>
      ) : null}
    </svg>
  )
}
