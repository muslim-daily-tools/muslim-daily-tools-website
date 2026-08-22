import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { LuArrowRight, LuX } from 'react-icons/lu'
import { FaHandHoldingHeart } from 'react-icons/fa6'

const SHOW_AFTER_PX = 720

/**
 * Bottom sticky call to action.
 * Appears once the visitor scrolls past the hero, and can be dismissed.
 */
export function StickyCta(): React.JSX.Element {
  const { t } = useTranslation('home')
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isOpen = isVisible && !isDismissed
  const offscreen = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={offscreen}
          animate={{ opacity: 1, y: 0 }}
          exit={offscreen}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-x-4 bottom-4 z-40 md:inset-x-0 md:mx-auto md:w-fit print:hidden"
        >
          <div className="glass-surface flex flex-wrap items-center justify-center gap-3 rounded-2xl md:rounded-full px-4 py-3 md:ps-6 md:pe-3">
            <p className="text-sm font-medium text-foreground text-center md:text-start">
              {t('stickyCta.message')}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#tools"
                className="group inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gold text-ink text-sm font-semibold transition-transform duration-300 hover:scale-[1.04]"
              >
                {t('stickyCta.primary')}
                <LuArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href="#donate"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-hairline text-sm font-medium text-foreground transition-colors hover:text-gold"
              >
                <FaHandHoldingHeart className="w-3.5 h-3.5" />
                {t('stickyCta.secondary')}
              </a>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                aria-label={t('stickyCta.dismiss')}
                className="p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <LuX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
