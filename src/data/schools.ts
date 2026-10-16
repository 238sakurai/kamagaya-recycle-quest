/**
 * 鎌ケ谷市立小学校（学区名）。
 * 市の回収場所一覧ページに「学区名」として掲載されている名称から作成（確認日 2026-10-16）。
 * ゲーム内では「任意の選択」にのみ使い、学校から回収場所や日程を自動で確定することはしない。
 */
export interface School {
  id: string
  name: string
}

export const SCHOOLS: School[] = [
  { id: 'kamagaya', name: '鎌ケ谷小' },
  { id: 'tobu', name: '東部小' },
  { id: 'hokubu', name: '北部小' },
  { id: 'nanbu', name: '南部小' },
  { id: 'seibu', name: '西部小' },
  { id: 'chubu', name: '中部小' },
  { id: 'hatsutomi', name: '初富小' },
  { id: 'michinobe', name: '道野辺小' },
  { id: 'gohonmatsu', name: '五本松小' },
]
