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
  'relative type-caption font-normal text-muted-foreground transition-colors hover:text-foreground'

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
  const classes = cn(
    linkBase,
    isActive && 'text-foreground font-medium',
    className,
  )

  if (link.isRoute) {
    return (
      <Link to={link.href} className={classes} onClick={onClick}>
        {t(link.labelKey)}
        {isActive && (
          <span className="hidden md:block absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
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
      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center justify-center gap-8">
        {navLinks.map((link) => (
          <NavItem key={link.href} link={link} isActive={isActive(link)} />
        ))}
      </nav>

      {/* Desktop actions */}
      <div className="hidden md:flex items-center justify-end gap-5">
        <ThemeToggle />
        <LanguageSwitcher />
        <a
          href="/#donate"
          className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-foreground text-background type-caption transition-opacity hover:opacity-85"
        >
          <FaHandHoldingHeart className="w-3.5 h-3.5" />
          {t('nav.support')}
        </a>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 -me-2 text-foreground"
        aria-label={
          isOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')
        }
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
      </button>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full inset-x-[-1.5rem] md:hidden bg-background border-b border-border shadow-lg shadow-black/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  isActive={isActive(link)}
                  onClick={closeMenu}
                  className="py-3 text-base"
                />
              ))}
              <div className="mt-2 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <a
                  href="/#donate"
                  className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-foreground text-background type-caption"
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
