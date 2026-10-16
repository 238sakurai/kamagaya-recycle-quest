import type { ReactNode } from 'react'

interface ScreenProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  testId?: string
}

/** スマートフォン幅を基準にした1画面レイアウト */
export function Screen({ children, header, footer, testId }: ScreenProps) {
  return (
    <main data-testid={testId} className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
      {header ? <header className="mb-3">{header}</header> : null}
      <div className="flex flex-1 flex-col gap-4">{children}</div>
      {footer ? <footer className="mt-4">{footer}</footer> : null}
    </main>
  )
}
