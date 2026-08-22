import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useRouterState } from '@tanstack/react-router'
import { AnimatePresence, m } from 'framer-motion'
import { LuMenu, LuX } from 'react-icons/lu'
import { FaHandHoldingHeart } from 'react-icons/fa6'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '@/lib/utils'

interface NavLink {
  href: string
  labelKey: string
  isRoute?: boolean
}

const navLinks: Array<NavLink> = [
  { href: '/#tools', labelKey: 'nav.tools' },
  { href: '/#testimonials', labelKey: 'nav.testimonials' },
  { href: '/#team', labelKey: 'nav.team' },
  { href: '/resources', labelKey: 'nav.resources', isRoute: true },
  { href: '/mind-maps', labelKey: 'nav.mindMaps', isRoute: true },
]

const linkBase =
  'relative text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground rtl:normal-case rtl:tracking-normal'

function NavItem({
  link,
  isActive,
  onClick,
  className,
}: {
  link: NavLink
  isActive: boolean
  onClick?: () => void
  className?: string
}): React.JSX.Element {
  const { t } = useTranslation('common')
  const classes = cn(linkBase, isActive && 'text-foreground', className)

  if (link.isRoute) {
    return (
      <Link to={link.href} className={classes} onClick={onClick}>
        {t(link.labelKey)}
        {isActive && (
          <span className="absolute -bottom-2 start-1/2 hidden h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-copper lg:block rtl:translate-x-1/2" />
        )}
      </Link>
    )
  }

  return (
    <a href={link.href} className={classes} onClick={onClick}>
      {t(link.labelKey)}
    </a>
  )
}

export function Navigation(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('common')
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const closeMenu = () => setIsOpen(false)
  const isActive = (link: NavLink) =>
    Boolean(link.isRoute) && pathname.startsWith(link.href)

  return (
    <>
      <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
        {navLinks.map((link) => (
          <NavItem key={link.href} link={link} isActive={isActive(link)} />
        ))}
      </nav>

      <div className="hidden items-center justify-end gap-3 lg:flex">
        <div className="flex h-9 items-center gap-4 border border-border px-3">
          <ThemeToggle />
          <span className="h-3 w-px bg-border" />
          <LanguageSwitcher />
        </div>
        <a
          href="/#donate"
          className="inline-flex h-9 items-center gap-2 bg-lapis px-4 text-xs font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-copper hover:text-[#102044]"
        >
          <FaHandHoldingHeart className="w-3.5 h-3.5" />
          {t('nav.support')}
        </a>
      </div>

      <button
        className="-me-2 border border-border p-2 text-foreground lg:hidden"
        aria-label={
          isOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')
        }
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-x-[-1.5rem] top-full border-b border-border bg-background shadow-[0_24px_48px_-24px_rgba(15,35,75,0.55)] lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-5">
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  isActive={isActive(link)}
                  onClick={closeMenu}
                  className="border-b border-border/60 py-3 text-sm"
                />
              ))}
              <div className="mt-3 flex items-center justify-between pt-3">
                <div className="flex items-center gap-5">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <a
                  href="/#donate"
                  className="inline-flex h-10 items-center gap-2 bg-lapis px-4 text-sm font-semibold text-white"
                  onClick={closeMenu}
                >
                  <FaHandHoldingHeart className="w-3.5 h-3.5" />
                  {t('nav.support')}
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
