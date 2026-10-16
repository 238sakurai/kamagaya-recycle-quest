import { describe, expect, it } from 'vitest'
import { ROOMS } from '../data/rooms'
import { judgeRoom } from './roomJudge'

const room = ROOMS[0]
const accepted = room.objects.filter((o) => o.accepted).map((o) => o.id)
const rejected = room.objects.filter((o) => !o.accepted).map((o) => o.id)

describe('judgeRoom', () => {
  it('有価物だけに丸をつけると3つ星', () => {
    const r = judgeRoom(room.objects, new Set(accepted))
    expect(r.found).toHaveLength(accepted.length)
    expect(r.wrong).toHaveLength(0)
    expect(r.missed).toHaveLength(0)
    expect(r.total).toBe(accepted.length)
    expect(r.stars).toBe(3)
  })

  it('まちがいと見のがしが合わせて2つまでなら2つ星', () => {
    const marks = new Set(accepted.slice(1))
    marks.add(rejected[0])
    const r = judgeRoom(room.objects, marks)
    expect(r.missed.map((o) => o.id)).toEqual([accepted[0]])
    expect(r.wrong.map((o) => o.id)).toEqual([rejected[0]])
    expect(r.stars).toBe(2)
  })

  it('何も丸をつけなければ1つ星で、全部が見のがしになる', () => {
    const r = judgeRoom(room.objects, new Set())
    expect(r.missed).toHaveLength(accepted.length)
    expect(r.stars).toBe(1)
  })

  it('全部に丸をつけると、対象外がすべてまちがいになる', () => {
    const r = judgeRoom(room.objects, new Set(room.objects.map((o) => o.id)))
    expect(r.wrong).toHaveLength(rejected.length)
    expect(r.found).toHaveLength(accepted.length)
  })
})
