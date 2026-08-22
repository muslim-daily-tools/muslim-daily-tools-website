import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Logo } from './Logo'

const toolLinks = [
  { label: 'Quran Tab', href: '/#tools', accent: 'oklch(0.66 0.16 255)' },
  {
    label: 'Quran Station',
    href: 'https://quran-station.com/',
    accent: 'oklch(0.72 0.13 185)',
  },
  { label: 'Ayah Flow', href: '/#tools', accent: 'oklch(0.78 0.15 70)' },
  {
    label: 'Pray On Time',
    href: 'https://prayontime.today',
    accent: 'oklch(0.63 0.19 295)',
  },
  {
    label: 'Nawaya',
    href: 'https://nawaya.life',
    accent: 'oklch(0.62 0.2 20)',
  },
]

const socials = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@FathyAndAbusrea',
    Icon: FaYoutube,
  },
  { label: 'X', href: 'https://x.com/mohamed_abusrea', Icon: FaXTwitter },
  {
    label: 'GitHub',
    href: 'https://github.com/mohamedabusrea',
    Icon: FaGithub,
  },
]

const linkClass =
  'text-sm text-muted-foreground hover:text-foreground transition-colors'

export function Footer(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <footer className="relative w-full border-t border-hairline bg-card/40">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4 mt-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-4">
              {t('footer.tools')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {toolLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${linkClass} inline-flex items-center gap-2`}
                  >
                    <span
                      aria-hidden
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: link.accent }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-4">
              {t('footer.company')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="/#team" className={linkClass}>
                  {t('nav.team')}
                </a>
              </li>
              <li>
                <Link to="/resources" className={linkClass}>
                  {t('nav.resources')}
                </Link>
              </li>
              <li>
                <Link to="/mind-maps" className={linkClass}>
                  {t('nav.mindMaps')}
                </Link>
              </li>
              <li>
                <Link to="/changelog" className={linkClass}>
                  {t('nav.changelog')}
                </Link>
              </li>
              <li>
                <a href="/#donate" className={linkClass}>
                  {t('nav.donate')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
