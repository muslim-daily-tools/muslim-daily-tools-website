import { useTranslation } from 'react-i18next'
import { LuArrowRight, LuSparkles } from 'react-icons/lu'
import { ToolsPreview } from './ToolsPreview'
import { StickyCta } from './StickyCta'
import { FadeIn, StaggerContainer, StaggerItem } from '@/lib/animations'
import { stats } from '@/data/stats'
import { cn } from '@/lib/utils'

export function Hero(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <section className="glow-field grid-lines relative overflow-hidden px-6 md:px-12 pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        <FadeIn>
          <span className="glass-surface inline-flex items-center gap-2 h-9 ps-3 pe-4 rounded-full text-xs font-medium text-foreground">
            <LuSparkles className="w-3.5 h-3.5 text-gold" />
            {t('hero.badge')}
          </span>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.98] text-balance text-foreground">
            {t('hero.headline')}{' '}
            <span className="text-glow-gradient">
              {t('hero.headlineLine2')}
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            {t('hero.subtext')}
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto"
        >
          <a
            href="#tools"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 h-13 px-7 rounded-full bg-gold text-ink font-semibold shadow-[0_18px_50px_-18px_var(--gold)] transition-transform duration-300 hover:scale-[1.03]"
          >
            {t('hero.cta')}
            <LuArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </a>
          <a
            href="#donate"
            className="glass-surface inline-flex w-full sm:w-auto items-center justify-center h-13 px-7 rounded-full text-foreground font-semibold transition-colors hover:text-gold"
          >
            {t('hero.secondaryCta')}
          </a>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
            {t('hero.proof')}
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.25} variant="scaleIn" className="mt-14 md:mt-20">
        <ToolsPreview />
      </FadeIn>

      <StaggerContainer
        as="dl"
        className="max-w-6xl mx-auto mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden glass-surface"
        staggerDelay={0.08}
      >
        {stats.map((stat, index) => (
          <StaggerItem
            key={stat.labelKey}
            className={cn(
              'flex flex-col gap-1 p-6 md:p-8 text-start border-hairline',
              index < 2 && 'border-b lg:border-b-0',
              index % 2 === 0 && 'border-e',
              index === 2 && 'lg:border-e',
            )}
          >
            <dd className="stat-number font-display text-4xl md:text-6xl font-medium text-foreground">
              {stat.value}
            </dd>
            <dt className="text-sm text-muted-foreground">
              {t(stat.labelKey)}
            </dt>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <StickyCta />
    </section>
  )
}
