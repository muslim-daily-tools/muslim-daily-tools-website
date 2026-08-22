import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>): React.JSX.Element {
  return (
    <span
      className={cn(
        'coordinate-label inline-flex items-center gap-2 text-copper',
        'before:h-1.5 before:w-1.5 before:rotate-45 before:border before:border-copper',
        className,
      )}
      {...props}
    />
  )
}
