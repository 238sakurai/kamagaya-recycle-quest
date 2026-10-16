import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  tone?: 'white' | 'green' | 'yellow' | 'sky' | 'pink'
}

const TONE: Record<NonNullable<CardProps['tone']>, string> = {
  white: 'bg-white',
  green: 'bg-eco-green/15',
  yellow: 'bg-eco-yellow/35',
  sky: 'bg-eco-sky/50',
  pink: 'bg-eco-pink/25',
}

export function Card({ children, className = '', tone = 'white' }: CardProps) {
  return <div className={`rounded-blob p-5 shadow-sm ring-1 ring-eco-brown/5 ${TONE[tone]} ${className}`}>{children}</div>
}
