import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa6'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { getPaymentLink } from '@/lib/stripe'

const PRESET_AMOUNTS = [10, 50, 100] as const

export function Donate(): React.JSX.Element {
  const { t } = useTranslation('home')
  const [billingMode, setBillingMode] = useState<'one_time' | 'monthly'>(
    'monthly',
  )
  const [selectedAmount, setSelectedAmount] = useState<number>(50)

  const handleCheckout = (): void => {
    const link = getPaymentLink(billingMode, selectedAmount)
    if (link) window.open(link, '_blank', 'noopener')
  }

  const handleCustom = (): void => {
    const link = getPaymentLink('one_time', 'custom')
    if (link) window.open(link, '_blank', 'noopener')
  }

  return (
    <section id="donate" className="px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 rounded-[1.75rem] bg-card p-8 md:p-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6 text-start">
          <FadeIn>
            <Eyebrow>{t('donate.eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="type-headline text-foreground text-balance">
              {t('donate.title')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="type-body max-w-xl text-muted-foreground text-pretty">
              {t('donate.description')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <blockquote className="type-body border-s border-gold ps-5 text-foreground/80 text-pretty">
              {t('donate.hadith')}
            </blockquote>
          </FadeIn>
        </div>

        {/* Stripe Payment Widget */}
        <FadeIn delay={0.2} className="w-full">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-background p-6 lg:ms-auto">
            {/* Billing toggle */}
            <div className="mb-5 flex rounded-full bg-muted p-1">
              <button
                onClick={() => setBillingMode('one_time')}
                className={`flex-1 rounded-full py-2 type-caption transition-colors ${
                  billingMode === 'one_time'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {t('donate.oneTime')}
              </button>
              <button
                onClick={() => setBillingMode('monthly')}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 type-caption transition-colors ${
                  billingMode === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <FaHeart className="h-3 w-3 text-gold" />
                {t('donate.monthly')}
              </button>
            </div>

            {/* Amount buttons */}
            <div
              className={`grid ${billingMode === 'one_time' ? 'grid-cols-4' : 'grid-cols-3'} mb-5 gap-2`}
            >
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`rounded-xl border py-3 text-[0.9375rem] font-medium tabular-nums transition-colors ${
                    selectedAmount === amount
                      ? 'border-gold text-gold'
                      : 'border-border text-foreground hover:border-foreground/30'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              {billingMode === 'one_time' && (
                <button
                  onClick={handleCustom}
                  className="rounded-xl border border-border py-3 type-caption text-foreground transition-colors hover:border-foreground/30"
                >
                  {t('donate.custom')}
                </button>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-foreground py-3 text-[0.9375rem] font-medium text-background transition-opacity hover:opacity-85"
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
