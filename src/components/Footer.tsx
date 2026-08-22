import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6'

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

const linkClass = 'text-sm text-white/55 transition-colors hover:text-copper'

export function Footer(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <footer className="celestial-hero w-full border-t border-white/15">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20">
        <div className="mb-12 flex items-center justify-between border-b border-white/15 pb-4">
          <span className="coordinate-label text-white/45">
            MDT / END OF RECORD
          </span>
          <span className="coordinate-label text-copper">EST. 2020</span>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="flex flex-col items-start gap-5">
            <Link to="/" aria-label="Muslim Daily Tools">
              <img
                src="/logo-dark.png"
                width={160}
                height={96}
                alt=""
                className="h-16 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              {t('footer.tagline')}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-copper hover:text-copper"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="coordinate-label mb-5 text-copper">
              {t('footer.tools')}
            </h3>
            <ul className="flex flex-col gap-3">
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
            <h3 className="coordinate-label mb-5 text-copper">
              {t('footer.company')}
            </h3>
            <ul className="flex flex-col gap-3">
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

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
