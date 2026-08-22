import { useTranslation } from 'react-i18next'
import { LuChevronRight } from 'react-icons/lu'
import { ToolsPreview } from './ToolsPreview'
import { FadeIn } from '@/lib/animations'
import { stats } from '@/data/stats'
import { Eyebrow } from '@/components/ui/eyebrow'

export function Hero(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <section className="geo-pattern px-6 md:px-10 pt-16 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 text-center">
        <FadeIn>
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="type-display max-w-4xl text-foreground text-balance">
            {t('hero.headline')}{' '}
            <span className="text-gold">{t('hero.headlineLine2')}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="type-body max-w-2xl text-muted-foreground text-pretty">
            {t('hero.subtext')}
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="mt-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          <a
            href="#tools"
            className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-[0.9375rem] font-medium text-background transition-opacity hover:opacity-85"
          >
            {t('hero.cta')}
          </a>
          <a
            href="#donate"
            className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-gold transition-opacity hover:opacity-75"
          >
            {t('hero.secondaryCta')}
            <LuChevronRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.2} variant="scaleIn" className="mt-16 md:mt-24">
        <ToolsPreview />
      </FadeIn>

      <FadeIn delay={0.25}>
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-10 md:mt-24 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="flex flex-col items-center gap-1 text-center"
            >
              <dd className="type-title tabular-nums text-foreground">
                {stat.value}
              </dd>
              <dt className="type-caption text-muted-foreground">
                {t(stat.labelKey)}
              </dt>
            </div>
          ))}
        </dl>
      </FadeIn>
    </section>
  )
}
