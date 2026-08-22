import { useTranslation } from 'react-i18next'
import { LuChevronRight, LuStar, LuUsers } from 'react-icons/lu'
import { FaApple, FaChrome, FaFirefoxBrowser, FaGlobe } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { Platform, Tool } from '@/data/tools'
import { FadeIn } from '@/lib/animations'
import { tools } from '@/data/tools'
import { Section } from '@/components/ui/section'
import { BrowserFrame, PhoneFrame } from '@/components/ui/device-frame'
import { cn } from '@/lib/utils'

const platformIcons: Record<Platform, IconType> = {
  website: FaGlobe,
  chrome: FaChrome,
  firefox: FaFirefoxBrowser,
  ios: FaApple,
}

/** Tools that live in a browser get a window, phone-only tools get a handset */
function isBrowserTool(tool: Tool): boolean {
  return tool.links.some((link) => link.platform !== 'ios')
}

/** Address bar text: the product domain, or a new-tab label for tab extensions */
function frameLabel(tool: Tool, newTabLabel: string): string {
  const site = tool.links.find((link) => link.platform === 'website')
  if (!site) return newTabLabel
  return new URL(site.href).hostname.replace(/^www\./, '')
}

function StarRating({ rating }: { rating: number }): React.JSX.Element {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <span className="inline-flex items-center gap-0.5">
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
    </span>
  )
}

function ToolStats({ tool }: { tool: Tool }): React.JSX.Element | null {
  const { t } = useTranslation('home')
  if (tool.rating === undefined && !tool.userCount) return null

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 type-caption text-muted-foreground">
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
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {tool.links.map((link) => {
        const Icon = platformIcons[link.platform]
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-gold transition-opacity hover:opacity-75"
          >
            <Icon className="w-3.5 h-3.5" />
            {t(link.labelKey)}
            <LuChevronRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
          </a>
        )
      })}
    </div>
  )
}

function ToolShowcase({ tool }: { tool: Tool }): React.JSX.Element {
  const { t } = useTranslation('home')
  const title = t(tool.titleKey)

  const tileClass = cn(
    'flex items-center justify-center overflow-hidden rounded-[1.5rem]',
    'border border-border bg-background frame-shadow',
    tool.fullBleedLogo ? 'p-0' : 'p-3',
  )
  /* A mock launch screen: the product mark and its name, nothing else */
  const splash = (sizeClass: string): React.JSX.Element => (
    <span className="flex flex-col items-center gap-5">
      <span className={cn(tileClass, sizeClass)}>
        <img
          src={tool.logo}
          alt={`${title} logo`}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="type-title text-foreground">{title}</span>
    </span>
  )

  if (!isBrowserTool(tool)) {
    return <PhoneFrame>{splash('h-24 w-24')}</PhoneFrame>
  }

  return (
    <BrowserFrame label={frameLabel(tool, t('tools.newTab'))}>
      {splash('h-24 w-24 md:h-28 md:w-28')}
    </BrowserFrame>
  )
}

function ToolRow({
  tool,
  reversed,
}: {
  tool: Tool
  reversed: boolean
}): React.JSX.Element {
  const { t } = useTranslation('home')
  const title = t(tool.titleKey)

  return (
    <article
      id={tool.slug}
      aria-label={title}
      className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <FadeIn
        variant="scaleIn"
        className={cn('w-full', reversed && 'lg:order-2')}
      >
        <ToolShowcase tool={tool} />
      </FadeIn>

      <FadeIn delay={0.05} className="flex flex-col items-start gap-5">
        <h3 className="type-headline text-foreground text-balance">{title}</h3>
        <ToolStats tool={tool} />
        <p className="type-body max-w-xl text-muted-foreground text-pretty">
          {t(tool.descriptionKey)}
        </p>
        <PlatformLinks tool={tool} />
      </FadeIn>
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
    >
      <div className="flex flex-col gap-28 md:gap-40">
        {tools.map((tool, index) => (
          <ToolRow key={tool.slug} tool={tool} reversed={index % 2 === 1} />
        ))}
      </div>
    </Section>
  )
}
