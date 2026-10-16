/**
 * 出典となる鎌ケ谷市公式ページ。
 * 出題データは必ずここに登録した出典と確認日を参照する。
 * 確認日は、このページの内容をゲームの出題と照合した日付（YYYY-MM-DD）。
 */
export type SourceId = 'yukabutu' | 'kaishubasyo' | 'gomi' | 'schedule' | 'character' | 'mudanashiFamily'

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
  character: {
    id: 'character',
    title: '市のキャラクター（鎌ケ谷市）',
    url: 'https://www.city.kamagaya.chiba.jp/sesakumidashi/shigaiyou_menu/character.html',
    pageUpdatedAt: '2024-11-15',
    verifiedAt: '2026-10-16',
  },
  mudanashiFamily: {
    id: 'mudanashiFamily',
    title: 'むだなしファミリー大集合！（鎌ケ谷市 KAMAGAYA環境キッズページ）',
    url: 'https://www.city.kamagaya.chiba.jp/kurashi-tetsuzuki/kankyo/kankyo-kouza/kamagaya_kkonline/112011301110a2.html',
    pageUpdatedAt: '2023-05-01',
    verifiedAt: '2026-10-16',
  },
}

/** 出題（ルール）の根拠となる出典。キャラクターの出典は含めない */
export const RULE_SOURCE_IDS: SourceId[] = ['yukabutu', 'kaishubasyo', 'schedule', 'gomi']
/** キャラクターに関する出典 */
export const CHARACTER_SOURCE_IDS: SourceId[] = ['character', 'mudanashiFamily']

export const SOURCE_LIST: Source[] = Object.values(SOURCES)

/** 公式ページに記載の問い合わせ先 */
export const CONTACT = {
  /** 有価物回収運動の担当 */
  department: '鎌ケ谷市 市民生活部 クリーン推進課 業務係',
  tel: '047-445-1223',
  /** キャラクター「むだなしくん」の所管 */
  characterDepartment: '鎌ケ谷市 市民生活部 クリーン推進課 計画管理係',
  characterTel: '047-445-1222',
}
