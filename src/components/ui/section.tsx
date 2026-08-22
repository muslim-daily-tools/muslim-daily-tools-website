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
  card: 'bg-card/70 border-y border-border',
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
        'px-6 py-20 md:px-12 md:py-28',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <div className={cn('mx-auto', widthClasses[width])}>
        {hasHeader && (
          <FadeIn
            className={cn('mb-12 flex flex-col gap-5 md:mb-16', alignClasses)}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="font-display max-w-4xl text-4xl font-semibold leading-[1.02] text-balance text-foreground md:text-6xl rtl:leading-[1.35]">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
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
