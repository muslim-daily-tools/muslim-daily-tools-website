import { useTranslation } from 'react-i18next'
import { LuArrowUpRight, LuStar, LuUsers } from 'react-icons/lu'
import { FaApple, FaChrome, FaFirefoxBrowser, FaGlobe } from 'react-icons/fa6'
import type { CSSProperties } from 'react'
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
    <div className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <LuStar
          key={i}
          className={cn(
            'w-3.5 h-3.5',
            i < fullStars
              ? 'fill-gold text-gold'
              : i === fullStars && hasHalfStar
                ? 'fill-gold/50 text-gold'
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
          <LuUsers className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-hairline bg-background/40 text-xs font-medium text-foreground transition-colors hover:[border-color:var(--tool-accent)] hover:[color:var(--tool-accent)]"
          >
            <Icon className="w-3.5 h-3.5" />
            {t(link.labelKey)}
            <LuArrowUpRight className="w-3 h-3 opacity-60 rtl:-scale-x-100" />
          </a>
        )
      })}
    </div>
  )
}

function ToolCard({
  tool,
  featured,
}: {
  tool: Tool
  featured: boolean
}): React.JSX.Element {
  const { t } = useTranslation('home')
  const title = t(tool.titleKey)

  return (
    <article
      id={tool.slug}
      aria-label={title}
      style={{ '--tool-accent': tool.accent } as CSSProperties}
      className={cn(
        'accent-card glass-surface group flex h-full flex-col gap-6 rounded-[1.75rem] p-6 md:p-8',
        featured && 'md:flex-row md:items-start md:gap-8',
      )}
    >
      <div
        className={cn(
          'accent-tile shrink-0 rounded-2xl border border-hairline bg-background/60 overflow-hidden flex items-center justify-center',
          featured ? 'w-20 h-20 md:w-28 md:h-28' : 'w-16 h-16',
          tool.fullBleedLogo ? 'p-0' : featured ? 'p-3' : 'p-2.5',
        )}
      >
        <img
          src={tool.logo}
          alt={`${title} logo`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <span className="accent-badge inline-flex w-fit items-center h-6 px-2.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
            {t(tool.badgeKey)}
          </span>
          <h3
            className={cn(
              'font-display font-medium text-foreground leading-tight',
              featured ? 'text-3xl md:text-4xl' : 'text-2xl',
            )}
          >
            {title}
          </h3>
          <ToolStats tool={tool} />
        </div>

        <p className="text-muted-foreground leading-relaxed text-pretty flex-1">
          {t(tool.descriptionKey)}
        </p>

        <div className="accent-rule h-px w-full" />

        <PlatformLinks tool={tool} />
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
      eyebrow={t('tools.eyebrow')}
      title={t('tools.title')}
      description={t('tools.subtitle')}
      className="relative"
    >
      <StaggerContainer
        as="div"
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-6"
        staggerDelay={0.08}
      >
        {tools.map((tool) => {
          const featured = tool.rating !== undefined
          return (
            <StaggerItem
              key={tool.slug}
              variant="scaleIn"
              className={cn(
                'h-full',
                featured ? 'md:col-span-2 lg:col-span-3' : 'lg:col-span-2',
              )}
            >
              <ToolCard tool={tool} featured={featured} />
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </Section>
  )
}
