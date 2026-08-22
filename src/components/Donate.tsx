import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa6'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { getPaymentLink } from '@/lib/stripe'

const PRESET_AMOUNTS = [10, 50, 100] as const

export function Donate() {
  const { t } = useTranslation('home')
  const [billingMode, setBillingMode] = useState<'one_time' | 'monthly'>(
    'monthly',
  )
  const [selectedAmount, setSelectedAmount] = useState<number>(50)

  const handleCheckout = () => {
    const link = getPaymentLink(billingMode, selectedAmount)
    if (link) window.open(link, '_blank', 'noopener')
  }

  const handleCustom = () => {
    const link = getPaymentLink('one_time', 'custom')
    if (link) window.open(link, '_blank', 'noopener')
  }

  return (
    <section id="donate" className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold-soft via-card to-card p-8 md:p-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="flex flex-col gap-6 text-start">
          <FadeIn>
            <Eyebrow>{t('donate.eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground leading-[1.1] text-balance">
              {t('donate.title')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl">
              {t('donate.description')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <blockquote className="font-display text-xl md:text-2xl italic text-foreground/90 leading-relaxed border-s-2 border-gold ps-5 text-pretty">
              {t('donate.hadith')}
            </blockquote>
          </FadeIn>
        </div>

        {/* Stripe Payment Widget */}
        <FadeIn delay={0.2}>
          <div className="w-full max-w-md mx-auto lg:ms-auto bg-background rounded-2xl border border-border p-5 md:p-6 shadow-sm">
            {/* Billing toggle */}
            <div className="flex rounded-lg bg-muted p-1 mb-4">
              <button
                onClick={() => setBillingMode('one_time')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  billingMode === 'one_time'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {t('donate.oneTime')}
              </button>
              <button
                onClick={() => setBillingMode('monthly')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  billingMode === 'monthly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <FaHeart className="w-3 h-3 text-rose-500" />
                {t('donate.monthly')}
              </button>
            </div>

            {/* Amount buttons */}
            <div
              className={`grid ${billingMode === 'one_time' ? 'grid-cols-4' : 'grid-cols-3'} gap-2 mb-4`}
            >
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                    selectedAmount === amount
                      ? 'border-gold bg-gold-soft text-foreground'
                      : 'border-border bg-card text-foreground hover:border-gold'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              {billingMode === 'one_time' && (
                <button
                  onClick={handleCustom}
                  className="py-2.5 rounded-lg text-xs font-semibold border border-border bg-card text-foreground hover:border-gold transition-all"
                >
                  {t('donate.custom')}
                </button>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="w-full bg-foreground text-background hover:bg-gold hover:text-ink rounded-lg py-3 text-sm font-semibold shadow-sm transition-all"
            >
              {billingMode === 'monthly'
                ? t('donate.startMonthly')
                : t('donate.oneTimeButton')}
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
