/**
 * ステージ1の資源イラスト。すべてインライン SVG（軽量・省電力）。
 */
interface ItemArtProps {
  art: string
  className?: string
}

const BROWN = '#453830'

export function ItemArt({ art, className = 'size-40' }: ItemArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-hidden="true">
      <ItemShape art={art} />
    </svg>
  )
}

/** 120×120 の座標系で描く形だけ（部屋のイラストなど、別の SVG の中に置くとき用） */
export function ItemShape({ art }: { art: string }) {
  return <Art art={art} />
}

function Face({ x = 60, y = 66 }: { x?: number; y?: number }) {
  return (
    <g>
      <circle cx={x - 9} cy={y} r="2.6" fill={BROWN} />
      <circle cx={x + 9} cy={y} r="2.6" fill={BROWN} />
      <path d={`M${x - 6} ${y + 8} q6 5 12 0`} stroke={BROWN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx={x - 15} cy={y + 6} r="3" fill="#FF9FB2" opacity="0.7" />
      <circle cx={x + 15} cy={y + 6} r="3" fill="#FF9FB2" opacity="0.7" />
    </g>
  )
}

function Art({ art }: { art: string }) {
  switch (art) {
    case 'newspaper':
      return (
        <g>
          <rect x="22" y="28" width="76" height="64" rx="6" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
          <rect x="30" y="36" width="60" height="8" rx="2" fill={BROWN} />
          {[50, 58, 66, 74, 82].map((y) => (
            <rect key={y} x="30" y={y} width={y % 16 === 2 ? 44 : 60} height="3" rx="1.5" fill="#B8B0A6" />
          ))}
          <Face x={60} y={62} />
        </g>
      )
    case 'magazine':
      return (
        <g>
          <rect x="30" y="22" width="60" height="78" rx="6" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" />
          <rect x="38" y="30" width="44" height="12" rx="3" fill="#58C78E" />
          <circle cx="60" cy="66" r="18" fill="#FFD85A" />
          <Face x={60} y={64} />
        </g>
      )
    case 'cardboard':
      return (
        <g>
          <rect x="20" y="40" width="80" height="56" rx="4" fill="#E0B87A" stroke={BROWN} strokeWidth="3" />
          <path d="M20 40 L40 24 H100 L80 40 Z" fill="#C99A5B" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <path d="M60 40 V96" stroke={BROWN} strokeWidth="2" strokeDasharray="4 4" />
          <Face x={60} y={66} />
        </g>
      )
    case 'clothes':
      return (
        <g>
          <path d="M40 26 L52 20 Q60 28 68 20 L80 26 L96 42 L84 52 L84 96 H36 V52 L24 42 Z" fill="#FF9FB2" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="60" cy="50" r="6" fill="#FFFDF7" />
          <Face x={60} y={70} />
        </g>
      )
    case 'electric-blanket':
      return (
        <g>
          <rect x="20" y="30" width="80" height="56" rx="12" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" />
          <path d="M20 46 H100 M20 62 H100" stroke="#FFFDF7" strokeWidth="6" />
          <rect x="44" y="76" width="32" height="12" rx="4" fill="#DDD" stroke={BROWN} strokeWidth="2" />
          <path d="M60 88 q0 12 12 12 h10" stroke={BROWN} strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="82" y="94" width="14" height="12" rx="3" fill="#FFD85A" stroke={BROWN} strokeWidth="2" />
          <path d="M96 97 h6 M96 103 h6" stroke={BROWN} strokeWidth="2.5" strokeLinecap="round" />
          <Face x={60} y={56} />
        </g>
      )
    case 'can':
      return (
        <g>
          <rect x="36" y="24" width="48" height="76" rx="10" fill="#58C78E" stroke={BROWN} strokeWidth="3" />
          <ellipse cx="60" cy="24" rx="24" ry="7" fill="#DDD" stroke={BROWN} strokeWidth="3" />
          <ellipse cx="60" cy="24" rx="8" ry="2.5" fill={BROWN} />
          <rect x="44" y="40" width="32" height="8" rx="4" fill="#FFD85A" />
          <Face x={60} y={70} />
        </g>
      )
    case 'bottle':
      return (
        <g>
          <rect x="50" y="14" width="20" height="12" rx="3" fill="#FFD85A" stroke={BROWN} strokeWidth="3" />
          <path d="M50 26 V36 Q38 44 38 56 V96 Q38 102 44 102 H76 Q82 102 82 96 V56 Q82 44 70 36 V26 Z" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <rect x="46" y="60" width="28" height="18" rx="4" fill="#FFFDF7" opacity="0.8" />
          <Face x={60} y={72} />
        </g>
      )
    case 'spray':
      return (
        <g>
          <rect x="40" y="36" width="40" height="66" rx="8" fill="#DDD" stroke={BROWN} strokeWidth="3" />
          <rect x="50" y="20" width="20" height="16" rx="3" fill="#B8B0A6" stroke={BROWN} strokeWidth="3" />
          <rect x="54" y="14" width="12" height="6" rx="2" fill={BROWN} />
          <path d="M70 18 l10 -6 M72 22 l12 -1 M70 26 l10 5" stroke="#B8E4FF" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="46" y="48" width="28" height="12" rx="3" fill="#FF9FB2" />
          <circle cx="51" cy="78" r="2.6" fill={BROWN} />
          <circle cx="69" cy="78" r="2.6" fill={BROWN} />
          <path d="M54 90 q6 -5 12 0" stroke={BROWN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'broken-bottle':
      return (
        <g>
          <path d="M50 26 V36 Q38 44 38 56 V70 L50 64 L58 76 L68 66 L82 72 V56 Q82 44 70 36 V26 Z" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <rect x="50" y="14" width="20" height="12" rx="3" fill="#FFD85A" stroke={BROWN} strokeWidth="3" />
          <path d="M30 96 L40 84 L48 98 Z M70 100 L80 86 L90 100 Z" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="51" cy="50" r="2.6" fill={BROWN} />
          <circle cx="69" cy="50" r="2.6" fill={BROWN} />
          <path d="M54 62 q6 -5 12 0" stroke={BROWN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M18 60 l6 -6 M20 70 l-6 -2 M100 60 l6 6" stroke="#FF9FB2" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'cosmetic':
      return (
        <g>
          <rect x="38" y="40" width="44" height="60" rx="14" fill="#FF9FB2" stroke={BROWN} strokeWidth="3" />
          <rect x="48" y="22" width="24" height="18" rx="4" fill="#FFD85A" stroke={BROWN} strokeWidth="3" />
          <rect x="46" y="54" width="28" height="14" rx="4" fill="#FFFDF7" />
          <circle cx="51" cy="78" r="2.6" fill={BROWN} />
          <circle cx="69" cy="78" r="2.6" fill={BROWN} />
          <path d="M54 88 q6 3 12 0" stroke={BROWN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'blanket':
      return (
        <g>
          <rect x="20" y="34" width="80" height="56" rx="12" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" />
          <path d="M20 50 H100 M20 66 H100" stroke="#FFFDF7" strokeWidth="6" />
          <Face x={60} y={60} />
        </g>
      )
    case 'plush':
      return (
        <g>
          <circle cx="38" cy="36" r="12" fill="#E0B87A" stroke={BROWN} strokeWidth="3" />
          <circle cx="82" cy="36" r="12" fill="#E0B87A" stroke={BROWN} strokeWidth="3" />
          <circle cx="60" cy="52" r="26" fill="#E0B87A" stroke={BROWN} strokeWidth="3" />
          <ellipse cx="60" cy="90" rx="30" ry="22" fill="#E0B87A" stroke={BROWN} strokeWidth="3" />
          <ellipse cx="60" cy="92" rx="16" ry="12" fill="#FFFDF7" />
          <circle cx="50" cy="48" r="3" fill={BROWN} />
          <circle cx="70" cy="48" r="3" fill={BROWN} />
          <ellipse cx="60" cy="58" rx="5" ry="3.5" fill={BROWN} />
          <path d="M55 64 q5 4 10 0" stroke={BROWN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'pet-bottle':
      return (
        <g>
          <rect x="50" y="12" width="20" height="10" rx="3" fill="#4A90E2" stroke={BROWN} strokeWidth="3" />
          <path d="M50 22 V30 Q40 38 40 50 V98 Q40 104 46 104 H74 Q80 104 80 98 V50 Q80 38 70 30 V22 Z" fill="#E8F6FF" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <rect x="40" y="56" width="40" height="22" fill="#B8E4FF" opacity="0.9" />
          <path d="M42 62 l6 6 M50 60 l10 10 M62 60 l10 10" stroke="#fff" strokeWidth="2" />
          <text x="60" y="94" textAnchor="middle" fontSize="11" fontWeight="700" fill={BROWN}>
            PET
          </text>
        </g>
      )
    case 'bulb':
      return (
        <g>
          <circle cx="60" cy="48" r="30" fill="#FFF6C8" stroke={BROWN} strokeWidth="3" />
          <path d="M48 70 h24 v12 a6 6 0 0 1 -6 6 h-12 a6 6 0 0 1 -6 -6 z" fill="#B8B0A6" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <path d="M50 88 h20 M52 96 h16" stroke={BROWN} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 40 l8 12 l4 -8 l8 12" stroke="#B8B0A6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M26 20 l-6 -6 M94 20 l6 -6" stroke="#B8B0A6" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'mirror':
      return (
        <g>
          <circle cx="60" cy="50" r="32" fill="#FF9FB2" stroke={BROWN} strokeWidth="3" />
          <circle cx="60" cy="50" r="22" fill="#E8F6FF" stroke={BROWN} strokeWidth="2" />
          <path d="M48 40 l12 -4 M46 50 l6 -8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <rect x="54" y="80" width="12" height="28" rx="6" fill="#FF9FB2" stroke={BROWN} strokeWidth="3" />
        </g>
      )
    case 'curtain':
      return (
        <g>
          <rect x="18" y="16" width="84" height="8" rx="4" fill="#B8B0A6" stroke={BROWN} strokeWidth="2.5" />
          <path d="M24 24 H96 V96 Q84 104 72 96 Q60 104 48 96 Q36 104 24 96 Z" fill="#FFD85A" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <path d="M42 24 V98 M60 24 V98 M78 24 V98" stroke="#E6B800" strokeWidth="3" />
          <Face x={60} y={60} />
        </g>
      )
    case 'tv':
      return (
        <g>
          <rect x="16" y="28" width="88" height="64" rx="8" fill="#8C8378" stroke={BROWN} strokeWidth="3" />
          <rect x="24" y="36" width="72" height="48" rx="4" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
          <path d="M30 42 l10 8 M34 60 l14 -10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <rect x="36" y="92" width="48" height="8" rx="3" fill={BROWN} />
          <path d="M52 100 v10 M68 100 v10" stroke={BROWN} strokeWidth="4" strokeLinecap="round" />
        </g>
      )
    case 'plate':
      return (
        <g>
          <path d="M18 58 a42 18 0 0 1 84 0 l-10 4 l-14 -8 l-10 10 l-12 -6 l-14 8 l-14 -4 z" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" />
          <path d="M18 58 l10 -4 l14 8 l10 -10 l12 6 l14 -8 l14 4 a42 18 0 0 1 -74 4 z" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" strokeLinejoin="round" transform="translate(0 8)" />
          <ellipse cx="60" cy="56" rx="22" ry="8" fill="#B8E4FF" opacity="0.7" />
          <path d="M22 40 l-6 -6 M98 40 l6 -6" stroke="#FF9FB2" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    default:
      return <circle cx="60" cy="60" r="40" fill="#DDD" />
  }
}
