import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Ruby } from './Ruby'

type Variant = 'primary' | 'secondary' | 'yellow' | 'ghost' | 'danger'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: Variant
  /** ふりがな記法のラベル */
  label?: string
  children?: ReactNode
  size?: 'md' | 'lg'
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'bg-eco-green text-white shadow-[0_6px_0_#3ea973] active:shadow-[0_2px_0_#3ea973] active:translate-y-1',
  secondary: 'bg-white text-eco-brown border-2 border-eco-brown/15 shadow-[0_6px_0_#e5e0d6] active:shadow-[0_2px_0_#e5e0d6] active:translate-y-1',
  yellow: 'bg-eco-yellow text-eco-brown shadow-[0_6px_0_#e6b800] active:shadow-[0_2px_0_#e6b800] active:translate-y-1',
  ghost: 'bg-transparent text-eco-brown underline-offset-4 hover:underline',
  danger: 'bg-eco-pink text-eco-brown shadow-[0_6px_0_#e07a90] active:shadow-[0_2px_0_#e07a90] active:translate-y-1',
}

export function Button({ variant = 'primary', label, children, size = 'md', className = '', ...rest }: ButtonProps) {
  const sizeClass = size === 'lg' ? 'text-xl px-6 py-4 min-h-16' : 'text-lg px-5 py-3 min-h-14'
  return (
    <button
      type="button"
      className={`tap-area rounded-blob font-bold leading-snug transition-transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 ${sizeClass} ${VARIANT_CLASS[variant]} ${className}`}
      {...rest}
    >
      {label ? <Ruby text={label} /> : children}
    </button>
  )
}
