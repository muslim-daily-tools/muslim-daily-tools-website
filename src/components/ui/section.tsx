import { Eyebrow } from './eyebrow'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FadeIn } from '@/lib/animations'

type SectionTone = 'default' | 'card' | 'pattern'

interface SectionProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'title'
> {
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  tone?: SectionTone
  align?: 'center' | 'start'
  width?: 'narrow' | 'default' | 'wide'
}

const toneClasses: Record<SectionTone, string> = {
  default: '',
  card: 'bg-card',
  pattern: 'geo-pattern',
}

const widthClasses = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-7xl',
}

export function Section({
  eyebrow,
  title,
  description,
  tone = 'default',
  align = 'center',
  width = 'default',
  className,
  children,
  ...props
}: SectionProps): React.JSX.Element {
  const hasHeader = eyebrow || title || description
  const alignClasses =
    align === 'center' ? 'text-center items-center' : 'text-start items-start'

  return (
    <section
      className={cn(
        'py-20 md:py-28 px-6 md:px-12',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <div className={cn('mx-auto', widthClasses[width])}>
        {hasHeader && (
          <FadeIn
            className={cn('flex flex-col gap-4 mb-12 md:mb-16', alignClasses)}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.05] text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                {description}
              </p>
            )}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  )
}
