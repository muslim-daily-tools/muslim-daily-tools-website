import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

const navLinks = [
  { href: '#testimonials', labelKey: 'nav.testimonials' },
  { href: '#team', labelKey: 'nav.team' },
  { href: '#tools', labelKey: 'nav.tools' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('common')

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t(link.labelKey)}
          </a>
        ))}
        <LanguageSwitcher />
        <ThemeToggle />
        <a
          href="https://donate.example.com"
          className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          {t('nav.donate')}
        </a>
      </nav>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-foreground"
        aria-label={isOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="glass-panel absolute top-full left-0 right-0 md:hidden">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMenu}
              >
                {t(link.labelKey)}
              </a>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('nav.theme')}
              </span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between py-2">
              <LanguageSwitcher />
            </div>
            <a
              href="https://donate.example.com"
              className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-center"
              onClick={closeMenu}
            >
              {t('nav.donate')}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
