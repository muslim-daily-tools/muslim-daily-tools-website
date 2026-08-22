import { useTranslation } from 'react-i18next'
import { LuArrowDown, LuArrowUpRight } from 'react-icons/lu'
import { ToolsPreview } from './ToolsPreview'
import { FadeIn } from '@/lib/animations'
import { stats } from '@/data/stats'
import { Eyebrow } from '@/components/ui/eyebrow'

export function Hero(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <section className="celestial-hero px-6 pb-10 pt-8 md:px-12 md:pb-0 md:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-4 text-white/55">
          <span className="coordinate-label">MDT / CELESTIAL ALMANAC</span>
          <span className="coordinate-label hidden sm:inline">
            30.0444° N · 31.2357° E
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="flex flex-col items-start gap-7 py-6 md:py-12 lg:py-20">
            <FadeIn>
              <Eyebrow className="text-copper before:border-copper">
                {t('hero.eyebrow')}
              </Eyebrow>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="font-display max-w-3xl text-5xl font-semibold leading-[0.96] text-balance text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] rtl:leading-[1.35]">
                {t('hero.headline')}{' '}
                <span className="text-copper">{t('hero.headlineLine2')}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="max-w-xl border-s border-white/25 ps-5 text-lg leading-relaxed text-pretty text-white/70 md:text-xl">
                {t('hero.subtext')}
              </p>
            </FadeIn>

            <FadeIn
              delay={0.15}
              className="mt-1 flex flex-wrap items-center gap-3"
            >
              <a
                href="#tools"
                className="inline-flex h-12 items-center gap-3 bg-copper px-6 text-sm font-semibold text-[#101d36] transition-colors hover:bg-white"
              >
                {t('hero.cta')}
                <LuArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#donate"
                className="inline-flex h-12 items-center gap-3 border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {t('hero.secondaryCta')}
                <LuArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </a>
            </FadeIn>
          </div>

          <FadeIn
            delay={0.2}
            variant="scaleIn"
            className="w-full justify-self-center lg:justify-self-end"
          >
            <ToolsPreview />
          </FadeIn>
        </div>

        <FadeIn delay={0.28}>
          <dl className="mt-16 grid grid-cols-2 border-x border-t border-white/15 md:mt-10 md:grid-cols-4 lg:mt-0">
            {stats.map((stat, index) => (
              <div
                key={stat.labelKey}
                className="relative flex min-h-28 flex-col justify-between border-b border-white/15 p-4 sm:p-5 md:border-e md:last:border-e-0"
              >
                <span className="coordinate-label text-white/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <dd className="font-display text-2xl font-semibold tabular-nums text-white md:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs text-white/55">
                    {t(stat.labelKey)}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  )
}
