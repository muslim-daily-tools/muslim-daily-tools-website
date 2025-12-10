import { ExternalLink } from 'lucide-react'

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
  },
  {
    logo: PrayerCalLogo,
    title: 'PrayerCal',
    description:
      'Add accurate prayer times directly to your calendar. Choose methods, set notifications, and plan around Salah without changing how you already work.',
    links: [{ label: 'Explore', href: '#' }],
    comingSoon: true,
  },
]

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full transition-all duration-200 hover:shadow-md hover:border-gray-200">
      {tool.comingSoon && (
        <span className="absolute top-4 right-4 text-xs font-medium bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
          Coming Soon
        </span>
      )}

      <div className="w-16 h-16 rounded-lg overflow-hidden mb-4 flex-shrink-0">
        <img
          src={tool.logo}
          alt={`${tool.title} logo`}
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        {tool.title}
      </h3>

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
