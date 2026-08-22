import type { CSSProperties } from 'react'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { tools } from '@/data/tools'
import { cn } from '@/lib/utils'

export function ToolsPreview(): React.JSX.Element {
  return (
    <StaggerContainer
      className="flex flex-wrap items-start justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
      staggerDelay={0.1}
    >
      {tools.map((tool) => (
        <StaggerItem key={tool.slug} variant="scaleIn">
          <a
            href={`#${tool.slug}`}
            style={{ '--tool-accent': tool.accent } as CSSProperties}
            className="accent-card group flex w-24 md:w-28 flex-col items-center gap-3 rounded-3xl p-2"
          >
            <span
              className={cn(
                'accent-tile glass-surface flex w-20 h-20 md:w-24 md:h-24 items-center justify-center rounded-3xl overflow-hidden',
                tool.fullBleedLogo ? 'p-0' : 'p-2.5',
              )}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain"
              />
            </span>
            <span className="text-xs font-medium text-muted-foreground text-center transition-colors group-hover:[color:var(--tool-accent)]">
              {tool.name}
            </span>
          </a>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
