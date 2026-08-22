import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { tools } from '@/data/tools'
import { BrowserFrame } from '@/components/ui/device-frame'
import { cn } from '@/lib/utils'

const SITE_DOMAIN = 'muslimdailytools.com'

export function ToolsPreview(): React.JSX.Element {
  return (
    <BrowserFrame label={SITE_DOMAIN} className="mx-auto w-full max-w-3xl">
      <StaggerContainer
        className="flex w-full flex-wrap items-start justify-center gap-x-4 gap-y-8 md:gap-x-10"
        staggerDelay={0.08}
      >
        {tools.map((tool) => (
          <StaggerItem
            key={tool.slug}
            variant="scaleIn"
            className="w-20 md:w-24"
          >
            <a
              href={`#${tool.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              <span
                className={cn(
                  'motion-lift flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.25rem] mx-auto',
                  'border border-border bg-background frame-shadow md:h-20 md:w-20',
                  tool.fullBleedLogo ? 'p-0' : 'p-2',
                )}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="type-caption text-center text-muted-foreground transition-colors group-hover:text-foreground">
                {tool.name}
              </span>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </BrowserFrame>
  )
}
