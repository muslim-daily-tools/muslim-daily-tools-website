import { ExternalLink, Star, Users } from 'lucide-react'

import PrayerCalLogo from '../assets/prayer-cal-logo.png'
import QuranStationLogo from '../assets/quran-station-logo.png'
import QuranTabLogo from '../assets/quran-tab-logo.png'

interface ToolLink {
  label: string
  href: string
}

interface Tool {
  logo: string
  title: string
  description: string
  links: ToolLink[]
  comingSoon?: boolean
  rating?: number
  reviewCount?: number
  userCount?: string
}

const tools: Tool[] = [
  {
    logo: QuranStationLogo,
    title: 'Quran Station',
    description:
      'Stream 100+ Quran radio stations from renowned reciters. One-click play, lightweight, and synced across your devices so your favourite station is always ready.',
    links: [
      { label: 'Website', href: 'https://quran-station.com/' },
      {
        label: 'Chrome',
        href: 'https://chromewebstore.google.com/detail/quran-station/angdimijeelplemmdnedhnjidadfphom',
      },
      {
        label: 'Firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/quran-station/',
      },
      {
        label: 'iOS',
        href: 'https://apps.apple.com/us/app/quran-station-app/id6740748479',
      },
    ],
    rating: 5.0,
    reviewCount: 298,
    userCount: '10K',
  },
  {
    logo: QuranTabLogo,
    title: 'Quran Tab',
    description:
      'A Quran-inspired new tab for your browser. Each tab greets you with an ayah, prayer times, and a calm space for reflection. Read translations in 40+ languages, listen to reciters, and save favourites.',
    links: [
      {
        label: 'Chrome',
        href: 'https://chromewebstore.google.com/detail/quran-tab/afaihcdgkjebgabomemccdneglknjkdd',
      },
      {
        label: 'Firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/quran-tab-original/',
      },
    ],
    rating: 4.9,
    reviewCount: 886,
    userCount: '50K',
  },
  {
    logo: PrayerCalLogo,
    title: 'PrayerCal',
    description:
      'Add accurate prayer times directly to your calendar. Choose methods, set notifications, and plan around Salah without changing how you already work.',
    links: [],
    comingSoon: true,
  },
]

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
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
  const hasStats = !tool.comingSoon && (tool.rating || tool.userCount)

  return (
    <div className="group relative bg-card rounded-xl p-6 shadow-sm border border-border flex flex-col h-full transition-all duration-200 hover:shadow-md hover:border-border/80">
      {tool.comingSoon && (
        <span className="absolute top-4 right-4 text-xs font-medium bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
          Coming Soon
        </span>
      )}

      {/* Header: Logo + Title & Stats */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-border">
          <img
            src={tool.logo}
            alt={`${tool.title} logo`}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
            {tool.title}
          </h3>

          {hasStats ? (
            <div className="flex flex-col gap-1">
              {tool.rating && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <StarRating rating={tool.rating} />
                  <span className="font-medium text-foreground">{tool.rating}</span>
                  {tool.reviewCount && (
                    <span>({tool.reviewCount.toLocaleString()} ratings)</span>
                  )}
                </div>
              )}
              {tool.userCount && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{tool.userCount} users</span>
                </div>
              )}
            </div>
          ) : tool.comingSoon ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                <StarRating rating={0} />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                <Users className="w-3 h-3" />
                <span>∞ users</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
        {tool.description}
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
            {link.label}
            {!tool.comingSoon && <ExternalLink className="w-3 h-3" />}
          </a>
        ))}
      </div>
    </div>
  )
}

export function Tools() {
  return (
    <section id="tools" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
