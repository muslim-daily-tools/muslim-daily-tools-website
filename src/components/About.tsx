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
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <FadeIn className="flex flex-col gap-6">
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] text-foreground text-balance">
            <span className="text-gold">“</span>
            {t('about.quote')}
            <span className="text-gold">”</span>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {t('about.paragraph1')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {t('about.paragraph2')} {t('about.quote')}.
          </p>
          <ul className="flex flex-wrap gap-2.5 mt-2">
            {values.map(({ key, Icon }) => (
              <li
                key={key}
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-border bg-background text-sm font-medium text-foreground"
              >
                <Icon className="w-3.5 h-3.5 text-gold" />
                {t(key)}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  )
}
