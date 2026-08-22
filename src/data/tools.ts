import AyahFlowLogo from '@/assets/ayah-flow-logo.png'
import NawayaLogo from '@/assets/nawaya-logo.png'
import PrayerCalLogo from '@/assets/prayer-calendar-logo.png'
import QuranStationLogo from '@/assets/quran-station-logo.png'
import QuranTabLogo from '@/assets/quran-tab-logo.png'

export type ToolSlug =
  | 'quran-station'
  | 'quran-tab'
  | 'ayah-flow'
  | 'pray-on-time'
  | 'nawaya'

export type Platform = 'website' | 'chrome' | 'firefox' | 'ios'

export interface ToolLink {
  platform: Platform
  labelKey: string
  href: string
}

export interface Tool {
  slug: ToolSlug
  name: string
  logo: string
  /** Logo has its own background and fills the tile edge to edge */
  fullBleedLogo?: boolean
  titleKey: string
  descriptionKey: string
  /** Signature colour for the card glow, badge, and logo tile */
  accent: string
  /** Short badge label shown on the tool card */
  badgeKey: string
  links: Array<ToolLink>
  rating?: number
  reviewCount?: number
  userCount?: string
}

export const tools: Array<Tool> = [
  {
    slug: 'quran-station',
    name: 'Quran Station',
    logo: QuranStationLogo,
    titleKey: 'tools.quranStation.title',
    descriptionKey: 'tools.quranStation.description',
    accent: 'oklch(0.72 0.13 185)',
    badgeKey: 'tools.quranStation.badge',
    links: [
      {
        platform: 'website',
        labelKey: 'tools.links.website',
        href: 'https://quran-station.com/',
      },
      {
        platform: 'chrome',
        labelKey: 'tools.links.chrome',
        href: 'https://chromewebstore.google.com/detail/quran-station/angdimijeelplemmdnedhnjidadfphom',
      },
      {
        platform: 'firefox',
        labelKey: 'tools.links.firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/quran-station/',
      },
      {
        platform: 'ios',
        labelKey: 'tools.links.ios',
        href: 'https://apps.apple.com/us/app/quran-station-app/id6740748479',
      },
    ],
    rating: 5.0,
    reviewCount: 298,
    userCount: '10K',
  },
  {
    slug: 'quran-tab',
    name: 'Quran Tab',
    logo: QuranTabLogo,
    titleKey: 'tools.quranTab.title',
    descriptionKey: 'tools.quranTab.description',
    accent: 'oklch(0.66 0.16 255)',
    badgeKey: 'tools.quranTab.badge',
    links: [
      {
        platform: 'chrome',
        labelKey: 'tools.links.chrome',
        href: 'https://chromewebstore.google.com/detail/quran-tab/afaihcdgkjebgabomemccdneglknjkdd',
      },
      {
        platform: 'firefox',
        labelKey: 'tools.links.firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/quran-tab-original/',
      },
    ],
    rating: 4.9,
    reviewCount: 886,
    userCount: '50K',
  },
  {
    slug: 'ayah-flow',
    name: 'Ayah Flow',
    logo: AyahFlowLogo,
    fullBleedLogo: true,
    titleKey: 'tools.ayahFlow.title',
    descriptionKey: 'tools.ayahFlow.description',
    accent: 'oklch(0.78 0.15 70)',
    badgeKey: 'tools.ayahFlow.badge',
    links: [
      {
        platform: 'ios',
        labelKey: 'tools.links.iosAppStore',
        href: 'https://apps.apple.com/us/app/ayah-flow/id6758680834',
      },
    ],
  },
  {
    slug: 'pray-on-time',
    name: 'Pray On Time',
    logo: PrayerCalLogo,
    titleKey: 'tools.prayerCal.title',
    descriptionKey: 'tools.prayerCal.description',
    accent: 'oklch(0.63 0.19 295)',
    badgeKey: 'tools.prayerCal.badge',
    links: [
      {
        platform: 'website',
        labelKey: 'tools.links.website',
        href: 'https://prayontime.today',
      },
    ],
  },
  {
    slug: 'nawaya',
    name: 'Nawaya',
    logo: NawayaLogo,
    titleKey: 'tools.nawaya.title',
    descriptionKey: 'tools.nawaya.description',
    accent: 'oklch(0.62 0.2 20)',
    badgeKey: 'tools.nawaya.badge',
    links: [
      {
        platform: 'website',
        labelKey: 'tools.links.website',
        href: 'https://nawaya.life',
      },
    ],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

/** Tools with public store stats get the large bento cards */
export function getFeaturedTools(): Array<Tool> {
  return tools.filter((tool) => tool.rating !== undefined)
}
