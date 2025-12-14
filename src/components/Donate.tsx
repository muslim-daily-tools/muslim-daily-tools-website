import { Coffee } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Brand icons as SVG components
function PatreonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
    </svg>
  )
}

function PaypalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
    </svg>
  )
}

interface SupportOption {
  id: string
  icon: React.ReactNode
  href: string
  className: string
}

const supportOptions: SupportOption[] = [
  {
    id: 'coffee',
    icon: <Coffee className="w-5 h-5" />,
    href: 'https://www.buymeacoffee.com/mohamedabusrea',
    className:
      'bg-amber-400 hover:bg-amber-500 text-amber-900 dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-amber-900',
  },
  {
    id: 'patreon',
    icon: <PatreonIcon className="w-5 h-5" />,
    href: 'https://www.patreon.com/mohamedabusrea',
    className:
      'bg-[#FF6B6B] hover:bg-[#FF5252] text-white dark:bg-[#FF6B6B] dark:hover:bg-[#FF5252]',
  },
  {
    id: 'paypal',
    icon: <PaypalIcon className="w-5 h-5" />,
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
