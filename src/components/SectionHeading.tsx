import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="reveal flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-terracotta">
          <span className="h-px w-8 bg-terracotta/60" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`reveal font-serif text-4xl font-light leading-[1.08] tracking-tight text-balance md:text-5xl lg:text-[3.5rem] ${
          tone === 'dark' ? 'text-charcoal' : 'text-ivory'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`reveal max-w-xl text-base font-light leading-relaxed md:text-lg ${
            tone === 'dark' ? 'text-charcoal-soft' : 'text-ivory/75'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
