import { useTranslation } from 'react-i18next'
import { LuFeather, LuGift, LuLock } from 'react-icons/lu'
import { FadeIn } from '@/lib/animations'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'

const values = [
  { key: 'about.values.private', Icon: LuLock },
  { key: 'about.values.lightweight', Icon: LuFeather },
  { key: 'about.values.free', Icon: LuGift },
]

export function About(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <Section id="about" tone="card" width="wide">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <FadeIn className="flex flex-col items-start">
          <div className="mb-10 flex w-full items-center justify-between border-b border-border pb-4">
            <Eyebrow>{t('about.eyebrow')}</Eyebrow>
            <span className="coordinate-label text-muted-foreground">
              FIELD NOTE / 01
            </span>
          </div>
          <blockquote className="font-display relative text-4xl font-semibold leading-[1.08] text-balance text-foreground md:text-5xl rtl:leading-[1.45]">
            <span
              aria-hidden="true"
              className="absolute -start-2 -top-8 font-mono text-7xl font-light text-copper/35"
            >
              “
            </span>
            {t('about.quote')}
          </blockquote>
          <div className="mt-10 h-px w-24 bg-copper" />
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col gap-7">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            {t('about.title')}
          </h2>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            {t('about.paragraph1')}
          </p>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            {t('about.paragraph2')} {t('about.quote')}.
          </p>
          <ul className="mt-2 grid border-s border-t border-border sm:grid-cols-3">
            {values.map(({ key, Icon }, index) => (
              <li
                key={key}
                className="flex min-h-32 flex-col justify-between border-b border-e border-border bg-background/50 p-4"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-5 w-5 text-lapis" />
                  <span className="coordinate-label text-muted-foreground/60">
                    0{index + 1}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  )
}
