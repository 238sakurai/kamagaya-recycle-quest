/**
 * 出典となる鎌ケ谷市公式ページ。
 * 出題データは必ずここに登録した出典と確認日を参照する。
 * 確認日は、このページの内容をゲームの出題と照合した日付（YYYY-MM-DD）。
 */
export type SourceId = 'yukabutu' | 'kaishubasyo' | 'gomi' | 'schedule'

export interface Source {
  id: SourceId
  title: string
  url: string
  /** 公式ページに表示されていた更新日 */
  pageUpdatedAt: string
  /** ゲーム側で内容を確認した日 */
  verifiedAt: string
}

export const SOURCES: Record<SourceId, Source> = {
  yukabutu: {
    id: 'yukabutu',
    title: '有価物回収運動にご協力をお願いします（鎌ケ谷市）',
    url: 'https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.html',
    pageUpdatedAt: '2026-06-18',
    verifiedAt: '2026-10-16',
  },
  kaishubasyo: {
    id: 'kaishubasyo',
    title: '有価物回収運動の回収場所一覧（鎌ケ谷市）',
    url: 'https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/kaishubasyo/index.html',
    pageUpdatedAt: '2026-10-01',
    verifiedAt: '2026-10-16',
  },
  gomi: {
    id: 'gomi',
    title: 'ごみの分け方・出し方（鎌ケ谷市）',
    url: 'https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/dashikata/gomi.html',
    pageUpdatedAt: '2026-02-26',
    verifiedAt: '2026-10-16',
  },
  schedule: {
    id: 'schedule',
    title: '令和8年度 有価物回収 年間回収日程表（PDF）',
    url: 'https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/gomi/genryouka/yukabutu.files/R8yuuka.pdf',
    pageUpdatedAt: '2026-06-18',
    verifiedAt: '2026-10-16',
  },
}

export const SOURCE_LIST: Source[] = Object.values(SOURCES)

/** 公式ページに記載の問い合わせ先 */
export const CONTACT = {
  department: '鎌ケ谷市 市民生活部 クリーン推進課 業務係',
  tel: '047-445-1223',
}
