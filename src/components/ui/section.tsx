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
  wide: 'max-w-6xl',
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
        'py-24 md:py-36 px-6 md:px-10',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <div className={cn('mx-auto', widthClasses[width])}>
        {hasHeader && (
          <FadeIn
            className={cn(
              'flex flex-col gap-4 mb-16 md:mb-24',
              alignClasses,
              align === 'center' && 'mx-auto max-w-3xl',
            )}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="type-headline text-foreground text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="type-body text-muted-foreground max-w-2xl text-pretty">
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
