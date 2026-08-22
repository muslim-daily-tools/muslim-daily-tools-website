import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold',
        'before:h-px before:w-6 before:bg-gold',
        className,
      )}
      {...props}
    />
  )
}
