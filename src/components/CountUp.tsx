import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { formatStat, parseStat } from '@/lib/count-up'

interface CountUpProps {
  /** Display value such as "50,000+" or "1M+" */
  value: string
  className?: string
  duration?: number
}

/**
 * Renders the final value on the server. On the client it resets to zero after
 * mount and counts up once the element scrolls into view.
 */
export function CountUp({
  value,
  className,
  duration = 1.6,
}: CountUpProps): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduceMotion = useReducedMotion()
  const parsed = useMemo(() => parseStat(value), [value])
  const [text, setText] = useState(value)

  useEffect(() => {
    if (!parsed || reduceMotion) return
    setText(formatStat(parsed, 0))
  }, [parsed, reduceMotion])

  useEffect(() => {
    if (!parsed || !inView || reduceMotion) return
    const controls = animate(0, parsed.value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setText(formatStat(parsed, latest)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, parsed, duration])

  return (
    <span ref={ref} className={className} aria-label={value}>
      {text}
    </span>
  )
}
