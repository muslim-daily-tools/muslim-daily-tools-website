import { useTranslation } from 'react-i18next'
import { LuArrowUpRight, LuStar, LuUsers } from 'react-icons/lu'
import { FaApple, FaChrome, FaFirefoxBrowser, FaGlobe } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { Platform, Tool } from '@/data/tools'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { tools } from '@/data/tools'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/utils'

const platformIcons: Record<Platform, IconType> = {
  website: FaGlobe,
  chrome: FaChrome,
  firefox: FaFirefoxBrowser,
  ios: FaApple,
}

function StarRating({ rating }: { rating: number }): React.JSX.Element {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[...Array(5)].map((_, index) => (
        <LuStar
          key={index}
          className={cn(
            'h-3 w-3',
            index < fullStars
              ? 'fill-copper text-copper'
              : index === fullStars && hasHalfStar
                ? 'fill-copper/50 text-copper'
                : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  )
}

function ToolStats({ tool }: { tool: Tool }): React.JSX.Element | null {
  const { t } = useTranslation('home')
  if (tool.rating === undefined && !tool.userCount) return null

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {tool.rating !== undefined && (
        <span className="inline-flex items-center gap-1.5">
          <StarRating rating={tool.rating} />
          <span className="font-semibold text-foreground">{tool.rating}</span>
          {tool.reviewCount && (
            <span>
              ({tool.reviewCount.toLocaleString()} {t('tools.ratings')})
            </span>
          )}
        </span>
      )}
      {tool.userCount && (
        <span className="inline-flex items-center gap-1.5">
          <LuUsers className="h-3.5 w-3.5" />
          {tool.userCount} {t('tools.users')}
        </span>
      )}
    </div>
  )
}

function PlatformLinks({ tool }: { tool: Tool }): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tool.links.map((link) => {
        const Icon = platformIcons[link.platform]
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:border-lapis hover:bg-lapis hover:text-white"
          >
            <Icon className="h-3.5 w-3.5" />
            {t(link.labelKey)}
            <LuArrowUpRight className="h-3 w-3 opacity-60 rtl:-scale-x-100" />
          </a>
        )
      })}
    </div>
  )
}

function ToolCard({
  tool,
  featured,
  index,
}: {
  tool: Tool
  featured: boolean
  index: number
}): React.JSX.Element {
  const { t } = useTranslation('home')
  const title = t(tool.titleKey)

  return (
    <article
      id={tool.slug}
      aria-label={title}
      className={cn(
        'instrument-panel group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lapis/70 md:p-7',
        featured && 'md:min-h-[25rem]',
      )}
    >
      <div className="mb-7 flex items-center justify-between border-b border-border pb-3">
        <span className="coordinate-label text-muted-foreground">
          TOOL / {String(index + 1).padStart(2, '0')}
        </span>
        <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-copper" />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-6',
          featured && 'sm:grid sm:grid-cols-[auto_1fr] sm:items-start',
        )}
      >
        <div
          className={cn(
            'flex shrink-0 items-center justify-center overflow-hidden border border-border bg-background',
            featured ? 'h-20 w-20 md:h-24 md:w-24' : 'h-16 w-16',
            tool.fullBleedLogo ? 'p-0' : 'p-2.5',
          )}
        >
          <img
            src={tool.logo}
            alt={`${title} logo`}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3
              className={cn(
                'font-display font-semibold leading-tight text-foreground',
                featured ? 'text-3xl md:text-4xl' : 'text-2xl',
              )}
            >
              {title}
            </h3>
            <ToolStats tool={tool} />
          </div>

          <p className="flex-1 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
            {t(tool.descriptionKey)}
          </p>

          <PlatformLinks tool={tool} />
        </div>
      </div>
    </article>
  )
}

export function Tools(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <Section
      id="tools"
      width="wide"
      align="start"
      eyebrow={t('tools.eyebrow')}
      title={t('tools.title')}
      description={t('tools.subtitle')}
    >
      <StaggerContainer
        as="div"
        className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-6"
        staggerDelay={0.08}
      >
        {tools.map((tool, index) => {
          const featured = tool.rating !== undefined
          return (
            <StaggerItem
              key={tool.slug}
              variant="scaleIn"
              className={cn(
                'h-full bg-background',
                featured ? 'md:col-span-1 lg:col-span-3' : 'lg:col-span-2',
              )}
            >
              <ToolCard tool={tool} featured={featured} index={index} />
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </Section>
  )
}
