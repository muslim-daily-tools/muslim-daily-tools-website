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
      <FadeIn className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <Eyebrow>{t('about.eyebrow')}</Eyebrow>
        <blockquote className="type-headline text-foreground text-balance">
          {t('about.quote')}
        </blockquote>
      </FadeIn>

      <FadeIn
        delay={0.05}
        className="mx-auto mt-20 grid max-w-5xl gap-10 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-16"
      >
        <h2 className="type-title text-foreground">{t('about.title')}</h2>
        <div className="flex flex-col gap-6">
          <p className="type-body text-muted-foreground text-pretty">
            {t('about.paragraph1')}
          </p>
          <p className="type-body text-muted-foreground text-pretty">
            {t('about.paragraph2')} {t('about.quote')}.
          </p>
        </div>
      </FadeIn>

      <FadeIn
        delay={0.1}
        className="mx-auto mt-20 grid max-w-5xl border-t border-border sm:grid-cols-3"
      >
        {values.map(({ key, Icon }) => (
          <div
            key={key}
            className="flex flex-col items-center gap-3 border-b border-border px-6 py-10 text-center sm:border-b-0 sm:border-e sm:last:border-e-0"
          >
            <Icon className="h-5 w-5 text-gold" />
            <span className="type-caption text-foreground">{t(key)}</span>
          </div>
        ))}
      </FadeIn>
    </Section>
  )
}
