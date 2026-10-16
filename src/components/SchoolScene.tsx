import type { Reward } from '../data/rewards'

/**
 * ステージ3の学校イラスト。報酬が解放されるたびに、本・ステージ・備品が増える。
 */
interface SchoolSceneProps {
  unlocked: Set<Reward['art']>
  truckStage: 'idle' | 'arrive' | 'done'
  animate: boolean
}

const BROWN = '#453830'

export function SchoolScene({ unlocked, truckStage, animate }: SchoolSceneProps) {
  return (
    <svg viewBox="0 0 360 240" className="w-full rounded-blob bg-eco-sky/60 ring-4 ring-white" role="img" aria-label="学校のようす">
      <circle cx="40" cy="36" r="18" fill="#FFD85A" />
      <rect x="0" y="150" width="360" height="90" fill="#A8E0B4" />
      {/* 校舎 */}
      <rect x="110" y="70" width="190" height="86" rx="6" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
      <rect x="190" y="50" width="30" height="20" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
      <circle cx="205" cy="60" r="5" fill="#FFD85A" stroke={BROWN} strokeWidth="2" />
      {[124, 156, 188, 220, 252, 284 - 12].map((x) => (
        <rect key={x} x={x} y="84" width="18" height="18" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
      ))}
      <rect x="192" y="122" width="26" height="34" fill="#58C78E" stroke={BROWN} strokeWidth="2" />
      {/* 図書室の本 */}
      <g opacity={unlocked.has('books') ? 1 : 0.15} className={unlocked.has('books') && animate ? 'svg-anim animate-pop' : ''}>
        <rect x="124" y="118" width="48" height="30" rx="3" fill="#E0B87A" stroke={BROWN} strokeWidth="2" />
        {['#58C78E', '#FF9FB2', '#FFD85A', '#4A90E2'].map((c, i) => (
          <rect key={c} x={130 + i * 10} y="124" width="8" height="20" fill={c} stroke={BROWN} strokeWidth="1.5" />
        ))}
      </g>
      {/* 芸術鑑賞会のステージ */}
      <g opacity={unlocked.has('concert') ? 1 : 0.15} className={unlocked.has('concert') && animate ? 'svg-anim animate-pop' : ''}>
        <rect x="226" y="122" width="60" height="30" rx="3" fill="#FF9FB2" stroke={BROWN} strokeWidth="2" />
        <text x="256" y="142" textAnchor="middle" fontSize="16" fontWeight="700" fill={BROWN}>
          ♪♫
        </text>
      </g>
      {/* 備品（ボールと楽器） */}
      <g opacity={unlocked.has('equipment') ? 1 : 0.15} className={unlocked.has('equipment') && animate ? 'svg-anim animate-pop' : ''}>
        <circle cx="330" cy="140" r="14" fill="#FFD85A" stroke={BROWN} strokeWidth="2" />
        <path d="M322 130 q8 10 16 0 M322 150 q8 -10 16 0" stroke={BROWN} strokeWidth="2" fill="none" />
        <rect x="40" y="128" width="40" height="22" rx="4" fill="#4A90E2" stroke={BROWN} strokeWidth="2" />
        <text x="60" y="144" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
          びひん
        </text>
      </g>
      {/* 回収トラック */}
      {truckStage !== 'idle' ? (
        <g transform="translate(40 170)">
        <g className={truckStage === 'arrive' && animate ? 'svg-anim animate-drive' : ''}>
          <rect x="0" y="10" width="70" height="36" rx="4" fill="#58C78E" stroke={BROWN} strokeWidth="3" />
          <rect x="70" y="22" width="30" height="24" rx="4" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
          <rect x="76" y="26" width="14" height="10" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
          <circle cx="18" cy="48" r="8" fill={BROWN} />
          <circle cx="84" cy="48" r="8" fill={BROWN} />
          <circle cx="18" cy="48" r="3" fill="#fff" />
          <circle cx="84" cy="48" r="3" fill="#fff" />
          <text x="35" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
            ♻ PTA
          </text>
          {truckStage === 'arrive' ? (
            <g>
              <rect x="8" y="-6" width="16" height="16" fill="#E0B87A" stroke={BROWN} strokeWidth="2" />
              <rect x="28" y="-4" width="12" height="14" fill="#FFFDF7" stroke={BROWN} strokeWidth="2" />
              <rect x="46" y="-2" width="10" height="12" rx="3" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
            </g>
          ) : null}
        </g>
        </g>
      ) : null}
    </svg>
  )
}
