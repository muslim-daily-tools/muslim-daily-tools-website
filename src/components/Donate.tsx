import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa6'
import { FadeIn } from '@/lib/animations'
import { getPaymentLink } from '@/lib/stripe'

const PRESET_AMOUNTS = [10, 50, 100] as const


export function Donate() {
  const { t } = useTranslation('home')
  const [billingMode, setBillingMode] = useState<'one_time' | 'monthly'>('monthly')
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
    <section id="donate" className="bg-card py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('donate.title')}
          </h2>
        </FadeIn>
        {/* Description */}
        <FadeIn delay={0.1}>
          <p className="flex flex-col gap-3 text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            <span>{t('donate.description')}</span>
            <span className="text-primary font-semibold">
              {t('donate.hadith')}
            </span>
          </p>
        </FadeIn>

        {/* Stripe Payment Widget */}
        <FadeIn delay={0.2}>
          <div className="mt-10 max-w-md mx-auto bg-background rounded-2xl border border-border p-5 md:p-6 shadow-sm">
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
            <div className={`grid ${billingMode === 'one_time' ? 'grid-cols-4' : 'grid-cols-3'} gap-2 mb-4`}>
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                    selectedAmount === amount
                      ? 'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                      : 'border-border bg-card text-foreground hover:border-amber-300 dark:hover:border-amber-500'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              {billingMode === 'one_time' && (
                <button
                  onClick={handleCustom}
                  className="py-2.5 rounded-lg text-xs font-semibold border border-border bg-card text-foreground hover:border-amber-300 dark:hover:border-amber-500 transition-all"
                >
                  {t('donate.custom')}
                </button>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg py-3 text-sm font-semibold shadow-sm transition-all"
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
