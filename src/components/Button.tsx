import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: undefined }
type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory'

const variants: Record<Variant, string> = {
  solid:
    'bg-terracotta text-ivory hover:bg-terracotta-deep shadow-md shadow-terracotta/25 hover:shadow-lg hover:-translate-y-0.5',
  outline:
    'border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory',
  ghost: 'text-charcoal underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
}

export function Button({ variant = 'solid', size = 'md', className = '', ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (props.href !== undefined) {
    const { href, ...rest } = props
    return (
      <a href={href} className={classes} {...rest}>
        {props.children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {props.children}
    </button>
  )
}
