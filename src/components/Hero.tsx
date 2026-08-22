import { useTranslation } from 'react-i18next'
import { LuArrowDown } from 'react-icons/lu'
import { ToolsPreview } from './ToolsPreview'
import { FadeIn } from '@/lib/animations'
import { stats } from '@/data/stats'
import { Eyebrow } from '@/components/ui/eyebrow'

export function Hero(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <section className="geo-pattern px-6 md:px-12 pt-16 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-7xl mx-auto grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-6 text-start">
          <FadeIn>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.02] text-balance">
              {t('hero.headline')}{' '}
              <span className="text-gold italic">
                {t('hero.headlineLine2')}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
              {t('hero.subtext')}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.15}
            className="flex flex-wrap items-center gap-3 mt-2"
          >
            <a
              href="#tools"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background font-medium transition-colors hover:bg-gold hover:text-ink"
            >
              {t('hero.cta')}
              <LuArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#donate"
              className="inline-flex items-center h-12 px-6 rounded-full border border-border bg-card/60 text-foreground font-medium transition-colors hover:border-gold hover:text-gold"
            >
              {t('hero.secondaryCta')}
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} variant="scaleIn" className="lg:justify-self-end">
          <ToolsPreview />
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <dl className="max-w-7xl mx-auto mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="flex flex-col gap-1">
              <dd className="font-display text-3xl md:text-4xl font-medium text-foreground tabular-nums">
                {stat.value}
              </dd>
              <dt className="text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </dt>
            </div>
          ))}
        </dl>
      </FadeIn>
    </section>
  )
}
