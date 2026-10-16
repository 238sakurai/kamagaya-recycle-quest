import { CHARACTER, isOfficialMascotAvailable, mascotName } from '../config/character'

/**
 * 案内役キャラクター。
 * 市のごみ減量・リサイクル推進キャラクター「むだなしくん」の画像は、市の承諾を得るまで使わない。
 * 承諾前はオリジナルキャラクター「リサ丸（りさまる）」を表示する。
 * リサ丸はリサイクルマークをモチーフにした緑のまんまるキャラクターで、むだなしくんには似せていない。
 */
interface MascotProps {
  mood?: 'happy' | 'think' | 'cheer'
  className?: string
}

export function Mascot({ mood = 'happy', className = 'size-32' }: MascotProps) {
  if (isOfficialMascotAvailable()) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${CHARACTER.official.imageSrc}`}
        alt={CHARACTER.official.name}
        className={`${className} object-contain`}
        decoding="async"
      />
    )
  }
  return <RisamaruArt mood={mood} className={className} />
}

function RisamaruArt({ mood, className }: Required<MascotProps>) {
  const mouth =
    mood === 'cheer' ? 'M50 72 q10 12 20 0 q-10 6 -20 0' : mood === 'think' ? 'M52 74 q8 -2 16 2' : 'M50 72 q10 8 20 0'
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={mascotName()}>
      <circle cx="60" cy="62" r="46" fill="#58C78E" stroke="#453830" strokeWidth="3" />
      {/* リサイクルの三つ矢 */}
      <g fill="none" stroke="#FFFDF7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46 44 l8 -12 l8 12" />
        <path d="M78 58 l-2 14 l-14 -2" />
        <path d="M38 72 l14 -2 l-2 14" />
      </g>
      <circle cx="46" cy="58" r="4" fill="#453830" />
      <circle cx="74" cy="58" r="4" fill="#453830" />
      <circle cx="47.5" cy="56.5" r="1.4" fill="#fff" />
      <circle cx="75.5" cy="56.5" r="1.4" fill="#fff" />
      <path d={mouth} stroke="#453830" strokeWidth="3" fill={mood === 'cheer' ? '#FF9FB2' : 'none'} strokeLinecap="round" />
      <circle cx="34" cy="68" r="5" fill="#FF9FB2" opacity="0.7" />
      <circle cx="86" cy="68" r="5" fill="#FF9FB2" opacity="0.7" />
      {mood === 'cheer' ? (
        <g>
          <path d="M14 30 l6 -6 M20 40 l-8 -2 M106 30 l-6 -6 M100 40 l8 -2" stroke="#FFD85A" strokeWidth="4" strokeLinecap="round" />
        </g>
      ) : null}
      {/* 葉っぱ */}
      <path d="M60 16 q10 -14 22 -6 q-8 12 -22 6" fill="#3EA973" stroke="#453830" strokeWidth="2.5" />
    </svg>
  )
}
