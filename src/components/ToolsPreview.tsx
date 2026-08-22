import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { tools } from '@/data/tools'
import { cn } from '@/lib/utils'

export function ToolsPreview(): React.JSX.Element {
  return (
    <StaggerContainer
      className="grid grid-cols-3 justify-items-center gap-x-5 gap-y-8 md:gap-x-8 max-w-[22rem] md:max-w-[26rem] mx-auto [&>*:nth-child(4)]:col-start-1 [&>*:nth-child(4)]:translate-x-1/2 [&>*:nth-child(5)]:translate-x-1/2 rtl:[&>*:nth-child(4)]:-translate-x-1/2 rtl:[&>*:nth-child(5)]:-translate-x-1/2"
      staggerDelay={0.1}
    >
      {tools.map((tool) => (
        <StaggerItem key={tool.slug} variant="scaleIn">
          <a
            href={`#${tool.slug}`}
            className="group flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className={cn(
                'w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] border border-gold/25 bg-card flex items-center justify-center overflow-hidden',
                'shadow-soft transition-all duration-300 group-hover:border-gold/60 group-hover:shadow-soft-lg',
                tool.fullBleedLogo ? 'p-0' : 'p-2.5',
              )}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium mt-3">
              {tool.name}
            </span>
          </a>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
