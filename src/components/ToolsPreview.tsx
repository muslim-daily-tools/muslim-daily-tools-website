import type { ToolSlug } from '@/data/tools'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { tools } from '@/data/tools'
import { cn } from '@/lib/utils'

const toolPositions: Record<ToolSlug, string> = {
  'quran-station': 'start-1/2 top-[2%] -translate-x-1/2 rtl:translate-x-1/2',
  'quran-tab': 'end-[2%] top-[30%]',
  'ayah-flow': 'end-[14%] bottom-[3%]',
  'pray-on-time': 'start-[14%] bottom-[3%]',
  nawaya: 'start-[2%] top-[30%]',
}

export function ToolsPreview(): React.JSX.Element {
  return (
    <div className="relative mx-auto max-w-[31rem] p-7 sm:p-10">
      <div className="absolute start-0 top-1/2 hidden -translate-y-1/2 -rotate-90 text-white/35 sm:block rtl:rotate-90">
        <span className="coordinate-label">WORSHIP / DAILY RHYTHM</span>
      </div>

      <StaggerContainer className="orbit-field" staggerDelay={0.1}>
        <div className="orbit-sweep" aria-hidden="true" />
        <div className="absolute inset-1/2 z-0 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border border-copper/60 bg-[#14254b] text-center rtl:translate-x-1/2">
          <span className="font-display text-xl font-semibold text-white">
            MDT
          </span>
          <span className="coordinate-label mt-1 text-copper">05 TOOLS</span>
        </div>

        {tools.map((tool, index) => (
          <StaggerItem
            key={tool.slug}
            variant="scaleIn"
            className={cn('absolute z-10', toolPositions[tool.slug])}
          >
            <a
              href={`#${tool.slug}`}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className={cn(
                  'flex h-16 w-16 items-center justify-center overflow-hidden border border-white/20 bg-white shadow-[0_14px_30px_-15px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:-translate-y-1 sm:h-20 sm:w-20',
                  tool.fullBleedLogo ? 'p-0' : 'p-2',
                )}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="coordinate-label max-w-24 text-center text-[0.55rem] leading-tight text-white/60 group-hover:text-white">
                {String(index + 1).padStart(2, '0')} · {tool.name}
              </span>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
