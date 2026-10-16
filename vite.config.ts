/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages ではリポジトリ名がパスの先頭に付くため、本番ビルドだけ base を変える。
const base = process.env.GITHUB_PAGES === 'true' ? '/kamagaya-recycle-quest/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
})
