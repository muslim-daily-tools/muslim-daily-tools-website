import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Logo } from './Logo'

const toolLinks = [
  { label: 'Quran Tab', href: '/#tools' },
  { label: 'Quran Station', href: 'https://quran-station.com/' },
  { label: 'Ayah Flow', href: '/#tools' },
  { label: 'Pray On Time', href: 'https://prayontime.today' },
  { label: 'Nawaya', href: 'https://nawaya.life' },
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
  'type-caption font-normal text-muted-foreground hover:text-foreground transition-colors'

const headingClass = 'type-caption uppercase tracking-[0.14em] text-foreground'

export function Footer(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="type-caption font-normal max-w-xs leading-relaxed text-muted-foreground">
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
            <h3 className={`${headingClass} mb-5`}>{t('footer.tools')}</h3>
            <ul className="flex flex-col gap-2.5">
              {toolLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${headingClass} mb-5`}>{t('footer.company')}</h3>
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

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 type-caption font-normal text-muted-foreground md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
