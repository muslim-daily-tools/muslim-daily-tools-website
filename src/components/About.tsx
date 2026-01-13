import { useTranslation } from 'react-i18next'
import { FadeIn } from '@/lib/animations'

export function About() {
  const { t } = useTranslation('home')

  return (
    <section id="about" className="bg-card py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('about.title')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            {t('about.paragraph1')}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            {t('about.paragraph2')}{' '}
            <em className="text-foreground/80">{t('about.quote')}</em>.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
