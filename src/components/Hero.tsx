import { useTranslation } from 'react-i18next'
import { LuArrowDown } from 'react-icons/lu'
import { ToolsPreview } from './ToolsPreview'
import { FadeIn } from '@/lib/animations'
import { stats } from '@/data/stats'
import { Eyebrow } from '@/components/ui/eyebrow'
import { StarOrnament } from '@/components/ui/ornament'

export function Hero(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <section className="geo-pattern px-6 md:px-12 pt-14 pb-12 md:pt-24 md:pb-16">
      <div className="max-w-7xl mx-auto grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-6 text-start">
          <FadeIn>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-xl md:text-2xl text-gold"
            >
              {t('hero.bismillah')}
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-semibold text-foreground leading-[1.08] text-balance">
              {t('hero.headline')}{' '}
              <span className="text-gold italic">
                {t('hero.headlineLine2')}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
              {t('hero.subtext')}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.2}
            className="flex flex-wrap items-center gap-3 mt-2"
          >
            <a
              href="#tools"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground font-medium shadow-soft transition-colors hover:bg-gold hover:text-ink"
            >
              {t('hero.cta')}
              <LuArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#donate"
              className="inline-flex items-center h-12 px-7 rounded-full border border-gold/40 bg-card/70 text-foreground font-medium transition-colors hover:border-gold hover:text-gold"
            >
              {t('hero.secondaryCta')}
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} variant="scaleIn" className="lg:justify-self-end">
          <ToolsPreview />
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <dl className="max-w-7xl mx-auto mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-y border-gold/25 py-10">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className="flex items-start gap-5 md:gap-6"
            >
              {index > 0 && (
                <StarOrnament className="hidden md:block w-4 h-4 mt-3 shrink-0 opacity-60" />
              )}
              <div className="flex flex-col gap-1">
                <dd className="font-display text-4xl md:text-5xl font-semibold text-foreground lining-nums tabular-nums leading-[1.15]">
                  {stat.value}
                </dd>
                <dt className="text-sm text-muted-foreground">
                  {t(stat.labelKey)}
                </dt>
              </div>
            </div>
          ))}
        </dl>
      </FadeIn>
    </section>
  )
}
