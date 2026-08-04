import { LuExternalLink, LuStar, LuUsers } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'

import AyahFlowLogo from '../assets/ayah-flow-logo.png'
import PrayerCalLogo from '../assets/prayer-calendar-logo.png'
import QuranStationLogo from '../assets/quran-station-logo.png'
import QuranTabLogo from '../assets/quran-tab-logo.png'
import NawayaLogo from '../assets/nawaya-logo.png'
import { FadeIn, StaggerContainer, StaggerItem } from '@/lib/animations'

interface ToolLink {
  labelKey: string
  href: string
}

interface Tool {
  logo: string
  titleKey: string
  descriptionKey: string
  links: Array<ToolLink>
  comingSoon?: boolean
  rating?: number
  reviewCount?: number
  userCount?: string
}

const tools: Array<Tool> = [
  {
    logo: QuranStationLogo,
    titleKey: 'tools.quranStation.title',
    descriptionKey: 'tools.quranStation.description',
    links: [
      { labelKey: 'tools.links.website', href: 'https://quran-station.com/' },
      {
        labelKey: 'tools.links.chrome',
        href: 'https://chromewebstore.google.com/detail/quran-station/angdimijeelplemmdnedhnjidadfphom',
      },
      {
        labelKey: 'tools.links.firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/quran-station/',
      },
      {
        labelKey: 'tools.links.ios',
        href: 'https://apps.apple.com/us/app/quran-station-app/id6740748479',
      },
    ],
    rating: 5.0,
    reviewCount: 298,
    userCount: '10K',
  },
  {
    logo: QuranTabLogo,
    titleKey: 'tools.quranTab.title',
    descriptionKey: 'tools.quranTab.description',
    links: [
      {
        labelKey: 'tools.links.chrome',
        href: 'https://chromewebstore.google.com/detail/quran-tab/afaihcdgkjebgabomemccdneglknjkdd',
      },
      {
        labelKey: 'tools.links.firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/quran-tab-original/',
      },
    ],
    rating: 4.9,
    reviewCount: 886,
    userCount: '50K',
  },
  {
    logo: AyahFlowLogo,
    titleKey: 'tools.ayahFlow.title',
    descriptionKey: 'tools.ayahFlow.description',
    links: [
      {
        labelKey: 'tools.links.iosAppStore',
        href: 'https://apps.apple.com/us/app/ayah-flow/id6758680834',
      },
    ],
  },
  {
    logo: PrayerCalLogo,
    titleKey: 'tools.prayerCal.title',
    descriptionKey: 'tools.prayerCal.description',
    links: [
      { labelKey: 'tools.links.website', href: 'https://prayontime.today' },
    ],
  },
  {
    logo: NawayaLogo,
    titleKey: 'tools.nawaya.title',
    descriptionKey: 'tools.nawaya.description',
    links: [{ labelKey: 'tools.links.website', href: 'https://nawaya.life' }],
  },
]

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <LuStar
          key={i}
          className={`w-3 h-3 ${
            i < fullStars
              ? 'fill-amber-400 text-amber-400'
              : i === fullStars && hasHalfStar
                ? 'fill-amber-400/50 text-amber-400'
                : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  const { t } = useTranslation('home')
  const hasStats = !tool.comingSoon && (tool.rating || tool.userCount)
  const title = t(tool.titleKey)

  return (
    <article
      aria-label={title}
      className="group relative bg-card rounded-xl p-6 shadow-sm border border-border flex flex-col h-full transition-all duration-200 hover:shadow-md hover:border-border/80"
    >
      {tool.comingSoon && (
        <span className="absolute top-4 end-4 text-xs font-medium bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
          {t('tools.comingSoon')}
        </span>
      )}

      {/* Header: Logo + Title & Stats */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={tool.logo}
            alt={`${title} logo`}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
            {title}
          </h3>

          {hasStats ? (
            <div className="flex flex-col gap-1">
              {tool.rating && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <StarRating rating={tool.rating} />
                  <span className="font-medium text-foreground">
                    {tool.rating}
                  </span>
                  {tool.reviewCount && (
                    <span>
                      ({tool.reviewCount.toLocaleString()} {t('tools.ratings')})
                    </span>
                  )}
                </div>
              )}
              {tool.userCount && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <LuUsers className="w-3 h-3" />
                  <span>
                    {tool.userCount} {t('tools.users')}
                  </span>
                </div>
              )}
            </div>
          ) : tool.comingSoon ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                <StarRating rating={0} />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                <LuUsers className="w-3 h-3" />
                <span>∞ {t('tools.users')}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
        {t(tool.descriptionKey)}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {tool.links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={tool.comingSoon ? undefined : '_blank'}
            rel={tool.comingSoon ? undefined : 'noopener noreferrer'}
            className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
              tool.comingSoon
                ? 'text-muted-foreground cursor-not-allowed'
                : 'text-primary hover:text-primary/80'
            }`}
            onClick={tool.comingSoon ? (e) => e.preventDefault() : undefined}
          >
            {t(link.labelKey)}
            {!tool.comingSoon && <LuExternalLink className="w-3 h-3" />}
          </a>
        ))}
      </div>
    </article>
  )
}

export function Tools() {
  const { t } = useTranslation('home')

  return (
    <section id="tools" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t('tools.title')}
          </h2>
        </FadeIn>

        <StaggerContainer
          as="div"
          className="flex flex-wrap justify-center gap-8"
          staggerDelay={0.12}
        >
          {tools.map((tool) => (
            <StaggerItem
              key={tool.titleKey}
              variant="scaleIn"
              className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-8rem)/5)]"
            >
              <ToolCard tool={tool} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
