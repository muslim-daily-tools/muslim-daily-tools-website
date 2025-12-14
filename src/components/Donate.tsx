import { useTranslation } from 'react-i18next'
import { SiBuymeacoffee, SiPatreon, SiPaypal } from 'react-icons/si'

interface SupportOption {
  id: string
  icon: React.ReactNode
  href: string
  className: string
}

const supportOptions: SupportOption[] = [
  {
    id: 'coffee',
    icon: <SiBuymeacoffee className="w-5 h-5" />,
    href: 'https://www.buymeacoffee.com/mohamedabusrea',
    className:
      'bg-amber-400 hover:bg-amber-500 text-amber-900 dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-amber-900',
  },
  {
    id: 'patreon',
    icon: <SiPatreon className="w-5 h-5" />,
    href: 'https://www.patreon.com/mohamedabusrea',
    className:
      'bg-[#FF6B6B] hover:bg-[#FF5252] text-white dark:bg-[#FF6B6B] dark:hover:bg-[#FF5252]',
  },
  {
    id: 'paypal',
    icon: <SiPaypal className="w-5 h-5" />,
    href: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=N6DTGKRQFX672',
    className:
      'bg-sky-100 hover:bg-sky-200 text-sky-700 dark:bg-sky-900/50 dark:hover:bg-sky-800/50 dark:text-sky-300',
  },
]

export function Donate() {
  const { t } = useTranslation('home')

  return (
    <section id="donate" className="bg-card py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {t('donate.title')}
        </h2>
        {/* Description */}
        <p className="flex flex-col gap-3 text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
          <span>{t('donate.description')}</span>
          <span className="text-primary font-semibold">
            {t('donate.hadith')}
          </span>
        </p>
        {/* Donation buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {supportOptions.map((option) => (
            <a
              key={option.id}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors ${option.className}`}
            >
              {option.icon}
              {t(`donate.options.${option.id}`)}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
