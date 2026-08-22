import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>): React.JSX.Element {
  return (
    <span
      className={cn(
        'type-caption font-semibold uppercase tracking-[0.14em] text-gold',
        className,
      )}
      {...props}
    />
  )
}
