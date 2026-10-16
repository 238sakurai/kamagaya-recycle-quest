import type { KeyboardEvent } from 'react'
import { OBJECT_HIT_RADIUS, ROOM_HEIGHT, ROOM_WIDTH, type Room, type RoomObject } from '../data/rooms'
import { stripFurigana } from '../lib/furigana'
import type { RoomResult } from '../lib/roomJudge'
import { ItemShape } from './ItemArt'

interface RoomSceneProps {
  room: Room
  marked: ReadonlySet<string>
  result: RoomResult | null
  onTap: (id: string) => void
  animate: boolean
}

const BROWN = '#453830'

/** 散らかった部屋のイラスト。オブジェクトをタップすると丸がつく。 */
export function RoomScene({ room, marked, result, onTap, animate }: RoomSceneProps) {
  const judging = result !== null
  const statusOf = (o: RoomObject): 'found' | 'wrong' | 'missed' | null => {
    if (!result) return null
    if (result.found.includes(o)) return 'found'
    if (result.wrong.includes(o)) return 'wrong'
    if (result.missed.includes(o)) return 'missed'
    return null
  }

  return (
    <svg viewBox={`0 0 ${ROOM_WIDTH} ${ROOM_HEIGHT}`} className="w-full rounded-blob ring-4 ring-white" role="group" aria-label={`${stripFurigana(room.name)}のイラスト`} data-testid="room-scene">
      {room.scene === 'kids' ? <KidsRoom /> : room.scene === 'living' ? <LivingRoom /> : room.scene === 'entrance' ? <Entrance /> : <Storage />}

      {room.objects.map((o) => {
        const scale = o.scale ?? 0.55
        const isMarked = marked.has(o.id)
        const status = statusOf(o)
        const label = `${stripFurigana(o.name)}${isMarked ? '（丸をつけた）' : ''}`
        const onKeyDown = (e: KeyboardEvent) => {
          if (judging) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onTap(o.id)
          }
        }
        return (
          <g
            key={o.id}
            transform={`translate(${o.x} ${o.y})`}
            role={judging ? undefined : 'button'}
            aria-pressed={judging ? undefined : isMarked}
            tabIndex={judging ? -1 : 0}
            aria-label={label}
            data-testid={`object-${o.id}`}
            data-marked={isMarked ? 'true' : 'false'}
            data-status={status ?? undefined}
            className={judging ? '' : 'tap-area outline-none'}
            onClick={() => !judging && onTap(o.id)}
            onKeyDown={onKeyDown}
          >
            <circle r={OBJECT_HIT_RADIUS} fill="transparent" />
            <g transform={`translate(${-60 * scale} ${-60 * scale}) scale(${scale})`}>
              <ItemShape art={o.art} />
            </g>
            <text
              y={60 * scale + 13}
              textAnchor="middle"
              fontSize={o.label.length >= 8 ? 10 : 11.5}
              fontWeight="700"
              fill={BROWN}
              stroke="#FFFDF7"
              strokeWidth="3.5"
              strokeLinejoin="round"
              style={{ paintOrder: 'stroke' }}
              aria-hidden="true"
            >
              {o.label}
            </text>
            {isMarked && !judging ? (
              <ellipse
                rx="36"
                ry="30"
                fill="none"
                stroke="#E8574B"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="150 14"
                transform="rotate(-8)"
                className={animate ? 'svg-anim animate-pop' : ''}
                aria-hidden="true"
              />
            ) : null}
            {status ? <StatusBadge status={status} animate={animate} /> : null}
          </g>
        )
      })}
    </svg>
  )
}

function StatusBadge({ status, animate }: { status: 'found' | 'wrong' | 'missed'; animate: boolean }) {
  const color = status === 'found' ? '#3EA973' : status === 'wrong' ? '#E8574B' : '#E6B800'
  return (
    <g className={animate ? 'svg-anim animate-pop' : ''} aria-hidden="true">
      <ellipse rx="36" ry="30" fill="none" stroke={color} strokeWidth="4" strokeDasharray={status === 'missed' ? '6 6' : undefined} />
      <circle cx="26" cy="-24" r="12" fill={color} stroke="#fff" strokeWidth="2" />
      <text x="26" y="-19" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
        {status === 'found' ? '○' : status === 'wrong' ? '✕' : '！'}
      </text>
    </g>
  )
}

function KidsRoom() {
  return (
    <g aria-hidden="true">
      <rect width={ROOM_WIDTH} height="260" fill="#FFF6C8" />
      <rect y="260" width={ROOM_WIDTH} height={ROOM_HEIGHT - 260} fill="#E8C994" />
      {[280, 320, 360, 400].map((y) => (
        <path key={y} d={`M0 ${y} H${ROOM_WIDTH}`} stroke="#D9B57C" strokeWidth="2" />
      ))}
      {/* 窓 */}
      <rect x="140" y="30" width="120" height="90" rx="6" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" />
      <path d="M200 30 V120 M140 75 H260" stroke={BROWN} strokeWidth="3" />
      <circle cx="235" cy="52" r="10" fill="#FFD85A" />
      {/* ベッド */}
      <rect x="18" y="110" width="118" height="110" rx="8" fill="#FF9FB2" stroke={BROWN} strokeWidth="3" />
      <rect x="18" y="100" width="118" height="22" rx="6" fill="#F27A94" stroke={BROWN} strokeWidth="3" />
      <rect x="28" y="124" width="40" height="22" rx="6" fill="#FFFDF7" stroke={BROWN} strokeWidth="2" />
      {/* 棚 */}
      <rect x="150" y="182" width="200" height="8" rx="3" fill="#C99A5B" stroke={BROWN} strokeWidth="2" />
      <rect x="250" y="92" width="100" height="8" rx="3" fill="#C99A5B" stroke={BROWN} strokeWidth="2" />
      {/* ラグ */}
      <ellipse cx="190" cy="330" rx="90" ry="34" fill="#A8E0B4" opacity="0.8" />
    </g>
  )
}

function LivingRoom() {
  return (
    <g aria-hidden="true">
      <rect width={ROOM_WIDTH} height="240" fill="#E8F6FF" />
      <rect y="240" width={ROOM_WIDTH} height={ROOM_HEIGHT - 240} fill="#D9D1C4" />
      {[270, 310, 350, 390, 430].map((y) => (
        <path key={y} d={`M0 ${y} H${ROOM_WIDTH}`} stroke="#C9C0B2" strokeWidth="2" />
      ))}
      {/* 窓 */}
      <rect x="20" y="30" width="110" height="80" rx="6" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" />
      <path d="M75 30 V110 M20 70 H130" stroke={BROWN} strokeWidth="3" />
      {/* キッチンカウンター */}
      <rect x="120" y="176" width="230" height="30" rx="6" fill="#FFFDF7" stroke={BROWN} strokeWidth="3" />
      <rect x="120" y="206" width="230" height="40" fill="#C99A5B" stroke={BROWN} strokeWidth="3" />
      <rect x="130" y="212" width="60" height="28" rx="4" fill="#E0B87A" stroke={BROWN} strokeWidth="2" />
      <rect x="200" y="212" width="60" height="28" rx="4" fill="#E0B87A" stroke={BROWN} strokeWidth="2" />
      <rect x="250" y="92" width="100" height="8" rx="3" fill="#C99A5B" stroke={BROWN} strokeWidth="2" />
      {/* ソファ */}
      <rect x="250" y="300" width="100" height="36" rx="10" fill="#58C78E" stroke={BROWN} strokeWidth="3" />
      <rect x="244" y="326" width="112" height="22" rx="8" fill="#3EA973" stroke={BROWN} strokeWidth="3" />
      {/* ラグ */}
      <ellipse cx="150" cy="340" rx="90" ry="30" fill="#FFD85A" opacity="0.5" />
    </g>
  )
}

function Entrance() {
  return (
    <g aria-hidden="true">
      <rect width={ROOM_WIDTH} height="250" fill="#F3E9D8" />
      <rect y="250" width={ROOM_WIDTH} height={ROOM_HEIGHT - 250} fill="#C9C0B2" />
      {[0, 60, 120, 180, 240, 300].map((x) => (
        <path key={x} d={`M${x} 250 V${ROOM_HEIGHT}`} stroke="#B8B0A6" strokeWidth="2" />
      ))}
      {[310, 370, 430].map((y) => (
        <path key={y} d={`M0 ${y} H${ROOM_WIDTH}`} stroke="#B8B0A6" strokeWidth="2" />
      ))}
      {/* ドア */}
      <rect x="130" y="20" width="110" height="230" rx="4" fill="#C99A5B" stroke={BROWN} strokeWidth="3" />
      <rect x="146" y="40" width="78" height="80" rx="3" fill="#B8E4FF" stroke={BROWN} strokeWidth="2" />
      <circle cx="226" cy="150" r="5" fill="#FFD85A" stroke={BROWN} strokeWidth="2" />
      {/* 靴箱 */}
      <rect x="20" y="90" width="90" height="90" rx="4" fill="#E0B87A" stroke={BROWN} strokeWidth="3" />
      <path d="M20 120 H110 M20 150 H110" stroke={BROWN} strokeWidth="2" />
      {/* 玄関マット */}
      <rect x="130" y="262" width="120" height="40" rx="6" fill="#58C78E" opacity="0.7" />
    </g>
  )
}

function Storage() {
  return (
    <g aria-hidden="true">
      <rect width={ROOM_WIDTH} height="250" fill="#D9C2A0" />
      {[40, 80, 120, 160, 200, 240].map((y) => (
        <path key={y} d={`M0 ${y} H${ROOM_WIDTH}`} stroke="#C9A97F" strokeWidth="3" />
      ))}
      <rect y="250" width={ROOM_WIDTH} height={ROOM_HEIGHT - 250} fill="#A8A29A" />
      {/* 棚板 */}
      <rect x="160" y="96" width="190" height="8" rx="3" fill="#8C6B45" stroke={BROWN} strokeWidth="2" />
      <rect x="160" y="196" width="190" height="8" rx="3" fill="#8C6B45" stroke={BROWN} strokeWidth="2" />
      {/* 小窓 */}
      <rect x="40" y="30" width="80" height="50" rx="4" fill="#B8E4FF" stroke={BROWN} strokeWidth="3" />
      <path d="M80 30 V80" stroke={BROWN} strokeWidth="2" />
      {/* 工具 */}
      <rect x="20" y="214" width="110" height="10" rx="3" fill="#8C6B45" stroke={BROWN} strokeWidth="2" />
    </g>
  )
}
