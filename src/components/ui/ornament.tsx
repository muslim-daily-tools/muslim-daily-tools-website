import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Rub el Hizb - two squares at 45 degrees.
 * A calligraphic full stop. Decorative only, so it stays out of the a11y tree.
 */
export function StarOrnament({
  className,
  ...props
}: ComponentPropsWithoutRef<'svg'>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      className={cn('w-4 h-4 text-gold', className)}
      {...props}
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="1" />
      <rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="1"
        transform="rotate(45 12 12)"
      />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * A thin star divider between sections.
 * Both hairlines use the same symmetric gradient so RTL mirroring is safe.
 */
export function SectionDivider({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>): React.JSX.Element {
  const hairline =
    'h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--gold),transparent)] opacity-40'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'mx-auto flex max-w-3xl items-center gap-4 px-6 print:hidden',
        className,
      )}
      {...props}
    >
      <span className={hairline} />
      <StarOrnament className="w-5 h-5 shrink-0" />
      <span className={hairline} />
    </div>
  )
}
