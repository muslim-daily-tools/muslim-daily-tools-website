import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Mock product frames drawn in CSS.
 * No product screenshots exist, so each tool is presented inside a
 * browser window or a phone body that holds its logo on a soft gradient.
 */

const dotClass = 'w-2.5 h-2.5 rounded-full bg-foreground/15'

export function BrowserFrame({
  label,
  children,
  className,
}: {
  /** Text shown in the fake address bar */
  label: string
  children: ReactNode
  className?: string
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'frame-shadow overflow-hidden rounded-2xl border border-border bg-card',
        className,
      )}
    >
      <div className="flex h-11 items-center gap-2 border-b border-border bg-background/60 px-4">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className={dotClass} />
          <span className={dotClass} />
          <span className={dotClass} />
        </span>
        <span className="mx-auto flex h-6 w-full max-w-[16rem] items-center justify-center truncate rounded-full bg-muted px-3 type-caption text-muted-foreground">
          {label}
        </span>
        <span aria-hidden="true" className="w-[3.25rem]" />
      </div>
      <div className="frame-screen flex aspect-[16/10] items-center justify-center p-6 md:p-10">
        {children}
      </div>
    </div>
  )
}

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'frame-shadow mx-auto w-[15rem] rounded-[2.75rem] border border-border bg-card p-2.5',
        className,
      )}
    >
      <div className="frame-screen relative flex aspect-[9/18] items-center justify-center overflow-hidden rounded-[2.25rem] p-6">
        <span
          aria-hidden="true"
          className="absolute top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/85"
        />
        {children}
      </div>
    </div>
  )
}
