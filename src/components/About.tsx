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
    <Section id="about" width="wide" className="relative">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-stretch">
        <FadeIn className="glow-field glass-surface flex flex-col justify-center gap-8 rounded-[2rem] p-8 md:p-12">
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] text-balance text-foreground">
            <span className="text-gold">“</span>
            {t('about.quote')}
            <span className="text-gold">”</span>
          </blockquote>
          <ul className="flex flex-wrap gap-2.5">
            {values.map(({ key, Icon }) => (
              <li
                key={key}
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-hairline bg-background/40 text-sm font-medium text-foreground"
              >
                <Icon className="w-3.5 h-3.5 text-gold" />
                {t(key)}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col justify-center gap-6">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {t('about.paragraph1')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {t('about.paragraph2')} {t('about.quote')}.
          </p>
        </FadeIn>
      </div>
    </Section>
  )
}
