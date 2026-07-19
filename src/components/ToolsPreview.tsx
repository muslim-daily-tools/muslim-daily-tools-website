import AyahFlow from '../assets/ayah-flow-logo.png'
import PrayerCal from '../assets/prayer-calendar-logo.png'
import QuranTab from '../assets/quran-tab-logo.png'
import QuranStation from '../assets/quran-station-logo.png'
import Nawaya from '../assets/nawaya-logo.png'
import { StaggerContainer, StaggerItem } from '@/lib/animations'

const tools = [
  {
    label: 'Quran Station',
    logo: QuranStation,
    href: '#quran-station',
  },
  { label: 'Quran Tab', logo: QuranTab, href: '#quran-tab' },
  { label: 'Ayah Flow', logo: AyahFlow, href: '#ayah-flow' },
  { label: 'Pray On Time', logo: PrayerCal, href: '#prayer-cal' },
  { label: 'Nawaya', logo: Nawaya, href: '#nawaya' },
]

export function ToolsPreview() {
  return (
    <StaggerContainer
      className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12"
      staggerDelay={0.1}
    >
      {tools.map((tool) => (
        <StaggerItem key={tool.label} variant="scaleIn">
          <a
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
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
