import PrayerCal from '../assets/prayer-calendar-logo.png'
import QuranTab from '../assets/quran-tab-logo.png'
import QuranStation from '../assets/quran-station-logo.png'

const tools = [
  {
    label: 'Quran Station',
    logo: QuranStation,
    href: '#quran-station',
  },
  { label: 'Quran Tab', logo: QuranTab, href: '#quran-tab' },
  { label: 'Prayer Calendar', logo: PrayerCal, href: '#prayer-cal' },
]

export function ToolsPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12">
      {tools.map((tool) => (
        <a
          key={tool.label}
          href="#tools"
          className="group transition-transform hover:scale-105"
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-xl p-2 border border-border bg-card flex items-center justify-center overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 hover:border-border/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <img src={tool.logo} alt={tool.label} />
            </div>
            <span className="text-sm text-muted-foreground font-medium mt-3">
              {tool.label}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
