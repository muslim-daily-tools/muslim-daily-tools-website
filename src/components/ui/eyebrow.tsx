import { StarOrnament } from './ornament'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'span'>): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold',
        className,
      )}
      {...props}
    >
      <StarOrnament className="w-3.5 h-3.5 shrink-0" />
      {children}
    </span>
  )
}
