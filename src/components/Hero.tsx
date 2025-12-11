import { useTranslation } from 'react-i18next'
import { ToolsPreview } from './ToolsPreview'

export function Hero() {
  const { t } = useTranslation('home')

  return (
    <section className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight tracking-tight">
          {t('hero.headline')}
          <br />
          {t('hero.headlineLine2')}
        </h1>

        {/* Subtext */}
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mt-6 leading-relaxed">
          {t('hero.subtext')}
        </p>

        {/* Tool Cards */}
        <ToolsPreview />

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="#tools"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
