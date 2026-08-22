import { Eyebrow } from './eyebrow'
import { SectionDivider } from './ornament'
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
  /** Thin 8-point star divider above the header. */
  ornament?: boolean
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
  ornament = false,
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
      {ornament && <SectionDivider className="mb-16 md:mb-20" />}
      <div className={cn('mx-auto', widthClasses[width])}>
        {hasHeader && (
          <FadeIn
            className={cn('flex flex-col gap-5 mb-12 md:mb-16', alignClasses)}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="font-display text-[2.5rem] md:text-6xl font-semibold text-foreground leading-[1.08] text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
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
