/**
 * リンク共有用のアイキャッチ画像（OGP 画像, 1200x630）を生成する。
 *
 *   node scripts/build-og-image.mjs
 *
 * ゲームと同じ配色・SVG で描いた HTML を Playwright の Chromium でスクリーンショットし、
 * public/og-image.png に書き出す。文字はシステムフォント（macOS のヒラギノ丸ゴ）で描くため、
 * macOS で実行する想定。むだなしくんの公式画像は承諾を得ていないため描かない
 * （docs/mudanashikun-usage-notes.md）。案内役はオリジナルの「リサ丸」。
 */
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const root = fileURLToPath(new URL('..', import.meta.url))
const BROWN = '#453830'

/** リサ丸（src/components/Mascot.tsx と同じ造形） */
const mascot = `
<svg viewBox="0 0 120 120" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="62" r="46" fill="#58C78E" stroke="${BROWN}" stroke-width="3" />
  <g fill="none" stroke="#FFFDF7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M46 44 l8 -12 l8 12" />
    <path d="M78 58 l-2 14 l-14 -2" />
    <path d="M38 72 l14 -2 l-2 14" />
  </g>
  <circle cx="46" cy="58" r="4" fill="${BROWN}" />
  <circle cx="74" cy="58" r="4" fill="${BROWN}" />
  <circle cx="47.5" cy="56.5" r="1.4" fill="#fff" />
  <circle cx="75.5" cy="56.5" r="1.4" fill="#fff" />
  <path d="M50 72 q10 12 20 0 q-10 6 -20 0" stroke="${BROWN}" stroke-width="3" fill="#FF9FB2" stroke-linecap="round" />
  <circle cx="34" cy="68" r="5" fill="#FF9FB2" opacity="0.7" />
  <circle cx="86" cy="68" r="5" fill="#FF9FB2" opacity="0.7" />
  <path d="M14 30 l6 -6 M20 40 l-8 -2 M106 30 l-6 -6 M100 40 l8 -2" stroke="#FFD85A" stroke-width="4" stroke-linecap="round" />
  <path d="M60 16 q10 -14 22 -6 q-8 12 -22 6" fill="#3EA973" stroke="${BROWN}" stroke-width="2.5" />
</svg>`

/** 資源のイラスト（src/components/ItemArt.tsx の縮小版） */
const face = (x, y) => `
  <circle cx="${x - 9}" cy="${y}" r="2.6" fill="${BROWN}" />
  <circle cx="${x + 9}" cy="${y}" r="2.6" fill="${BROWN}" />
  <path d="M${x - 6} ${y + 8} q6 5 12 0" stroke="${BROWN}" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <circle cx="${x - 15}" cy="${y + 6}" r="3" fill="#FF9FB2" opacity="0.7" />
  <circle cx="${x + 15}" cy="${y + 6}" r="3" fill="#FF9FB2" opacity="0.7" />`

const items = {
  newspaper: `
    <rect x="22" y="28" width="76" height="64" rx="6" fill="#FFFDF7" stroke="${BROWN}" stroke-width="3" />
    <rect x="30" y="36" width="60" height="8" rx="2" fill="${BROWN}" />
    <rect x="30" y="50" width="44" height="3" rx="1.5" fill="#B8B0A6" />
    <rect x="30" y="58" width="60" height="3" rx="1.5" fill="#B8B0A6" />
    <rect x="30" y="82" width="60" height="3" rx="1.5" fill="#B8B0A6" />
    ${face(60, 66)}`,
  cardboard: `
    <rect x="20" y="40" width="80" height="56" rx="4" fill="#E0B87A" stroke="${BROWN}" stroke-width="3" />
    <path d="M20 40 L40 24 H100 L80 40 Z" fill="#C99A5B" stroke="${BROWN}" stroke-width="3" stroke-linejoin="round" />
    <path d="M60 40 V96" stroke="${BROWN}" stroke-width="2" stroke-dasharray="4 4" />
    ${face(60, 66)}`,
  can: `
    <rect x="36" y="24" width="48" height="76" rx="10" fill="#58C78E" stroke="${BROWN}" stroke-width="3" />
    <ellipse cx="60" cy="24" rx="24" ry="7" fill="#DDD" stroke="${BROWN}" stroke-width="3" />
    <ellipse cx="60" cy="24" rx="8" ry="2.5" fill="${BROWN}" />
    <rect x="44" y="40" width="32" height="8" rx="4" fill="#FFD85A" />
    ${face(60, 70)}`,
  bottle: `
    <rect x="50" y="14" width="20" height="12" rx="3" fill="#FFD85A" stroke="${BROWN}" stroke-width="3" />
    <path d="M50 26 V36 Q38 44 38 56 V96 Q38 102 44 102 H76 Q82 102 82 96 V56 Q82 44 70 36 V26 Z" fill="#B8E4FF" stroke="${BROWN}" stroke-width="3" stroke-linejoin="round" />
    <rect x="46" y="60" width="28" height="18" rx="4" fill="#FFFDF7" opacity="0.8" />
    ${face(60, 72)}`,
  clothes: `
    <path d="M40 26 L52 20 Q60 28 68 20 L80 26 L96 42 L84 52 L84 96 H36 V52 L24 42 Z" fill="#FF9FB2" stroke="${BROWN}" stroke-width="3" stroke-linejoin="round" />
    <circle cx="60" cy="50" r="6" fill="#FFFDF7" />
    ${face(60, 70)}`,
}
const item = (name, size) => `<svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${items[name]}</svg>`

/** 黄色い旗 */
const flag = `
<svg viewBox="-30 -10 80 90" width="150" height="170" xmlns="http://www.w3.org/2000/svg">
  <rect x="-2" y="0" width="4" height="66" fill="${BROWN}" />
  <path d="M2 2 L46 15 L2 30 Z" fill="#FFD85A" stroke="${BROWN}" stroke-width="2" />
  <rect x="-22" y="54" width="48" height="14" fill="#FFFDF7" stroke="${BROWN}" stroke-width="1.5" />
  <circle cx="-13" cy="61" r="4" fill="#B8E4FF" />
  <rect x="-2" y="57" width="10" height="8" fill="#E0B87A" />
  <rect x="12" y="57" width="7" height="8" fill="#DDD" />
</svg>`

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    font-family: 'Hiragino Maru Gothic ProN', 'Hiragino Maru Gothic Pro', 'BIZ UDPGothic', 'Noto Sans JP', sans-serif;
    color: ${BROWN};
    background: linear-gradient(180deg, #B8E4FF 0%, #FFFDF7 60%);
  }
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 150px; background: #A8E0B4; }
  .frame { position: absolute; inset: 24px; border: 6px solid #58C78E; border-radius: 40px; }
  .text { position: absolute; left: 76px; top: 92px; white-space: nowrap; }
  .badge {
    display: inline-flex; align-items: center; gap: 12px;
    background: #FFD85A; color: ${BROWN}; font-size: 28px; font-weight: 700;
    padding: 10px 26px; border-radius: 999px;
  }
  h1 { margin-top: 26px; font-size: 84px; line-height: 1.12; font-weight: 700; letter-spacing: 0.01em; }
  h1 .small { display: block; font-size: 56px; }
  h1 .accent { color: #3EA973; }
  .lead { margin-top: 22px; font-size: 36px; font-weight: 700; color: #6b5a4e; }
  .items { position: absolute; left: 76px; bottom: 48px; display: flex; gap: 10px; align-items: flex-end; }
  .item { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 22px; font-weight: 700; }
  .mascot { position: absolute; right: 120px; top: 110px; }
  .flag { position: absolute; right: 70px; bottom: 56px; }
  .sun { position: absolute; right: 90px; top: 50px; width: 70px; height: 70px; border-radius: 50%; background: #FFD85A; }
</style>
</head>
<body>
  <div class="ground"></div>
  <div class="frame"></div>
  <div class="sun"></div>
  <div class="text">
    <div class="badge">♻ 鎌ケ谷市PTA 有価物回収運動を学ぶゲーム</div>
    <h1><span class="small">かまがや</span>リサイクル<span class="accent">大作戦！</span></h1>
    <p class="lead">あつめて、わけて、学校をハッピーに！</p>
  </div>
  <div class="items">
    <div class="item">${item('newspaper', 120)}<span>新聞</span></div>
    <div class="item">${item('cardboard', 120)}<span>ダンボール</span></div>
    <div class="item">${item('can', 120)}<span>空き缶</span></div>
    <div class="item">${item('bottle', 120)}<span>空きビン</span></div>
    <div class="item">${item('clothes', 120)}<span>古着</span></div>
  </div>
  <div class="mascot">${mascot}</div>
  <div class="flag">${flag}</div>
</body>
</html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(html)
  await page.screenshot({ path: `${root}public/og-image.png`, type: 'png' })
} finally {
  await browser.close()
}
console.log('public/og-image.png を書き出しました')
