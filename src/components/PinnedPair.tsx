import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

interface PinnedPairProps {
  first: ReactNode
  second: ReactNode
  className?: string
}

/**
 * On large screens the pair pins while the page scrolls and the two cards
 * settle into place one after the other. Smaller screens and reduced-motion
 * users get the plain grid.
 */
export function PinnedPair({
  first,
  second,
  className,
}: PinnedPairProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isLarge = useMinWidth(1024)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end end'],
  })

  const firstY = useTransform(scrollYProgress, [0, 0.35], [48, 0])
  const firstScale = useTransform(scrollYProgress, [0, 0.35], [0.96, 1])
  const secondY = useTransform(scrollYProgress, [0.2, 0.7], [160, 0])
  const secondOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const secondScale = useTransform(scrollYProgress, [0.2, 0.7], [0.94, 1])

  const animated = isLarge && !reduceMotion

  return (
    <div ref={ref} className={animated ? 'lg:h-[150vh]' : undefined}>
      <div className={animated ? 'lg:sticky lg:top-28' : undefined}>
        <div className={className}>
          <m.div
            className="h-full"
            style={animated ? { y: firstY, scale: firstScale } : undefined}
          >
            {first}
          </m.div>
          <m.div
            className="h-full"
            style={
              animated
                ? { y: secondY, scale: secondScale, opacity: secondOpacity }
                : undefined
            }
          >
            {second}
          </m.div>
        </div>
      </div>
    </div>
  )
}

function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${px}px)`)
    const update = (): void => setMatches(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [px])

  return matches
}
