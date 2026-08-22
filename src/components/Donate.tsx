import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa6'
import { LuArrowUpRight } from 'react-icons/lu'
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
    <section id="donate" className="px-6 py-20 md:px-12 md:py-28">
      <div className="celestial-hero mx-auto grid max-w-7xl border border-white/15 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-6 p-7 text-start sm:p-10 md:p-14 lg:border-e lg:border-white/15">
          <FadeIn>
            <div className="mb-3 flex items-center justify-between border-b border-white/15 pb-4">
              <Eyebrow className="text-copper before:border-copper">
                {t('donate.eyebrow')}
              </Eyebrow>
              <span className="coordinate-label text-white/40">
                CONTINUOUS / 01
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] text-balance text-white md:text-6xl rtl:leading-[1.35]">
              {t('donate.title')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-white/68">
              {t('donate.description')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <blockquote className="max-w-2xl border-s border-copper ps-5 text-sm leading-relaxed text-pretty text-white/72 md:text-base">
              {t('donate.hadith')}
            </blockquote>
          </FadeIn>
        </div>

        <FadeIn
          delay={0.2}
          className="flex items-center bg-white/[0.035] p-7 sm:p-10 md:p-12"
        >
          <div className="w-full border border-white/20 bg-[#102044]/80 p-5 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.75)] md:p-6">
            <div className="mb-6 flex items-center justify-between border-b border-white/15 pb-3">
              <span className="coordinate-label text-white/45">
                SUPPORT MODULE
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-copper" />
            </div>

            <div className="mb-4 grid grid-cols-2 border border-white/15 p-1">
              <button
                type="button"
                onClick={() => setBillingMode('one_time')}
                className={`py-2.5 text-sm font-semibold transition-colors ${
                  billingMode === 'one_time'
                    ? 'bg-white text-[#102044]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t('donate.oneTime')}
              </button>
              <button
                type="button"
                onClick={() => setBillingMode('monthly')}
                className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                  billingMode === 'monthly'
                    ? 'bg-white text-[#102044]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <FaHeart className="h-3 w-3 text-copper" />
                {t('donate.monthly')}
              </button>
            </div>

            <div
              className={`mb-4 grid gap-2 ${billingMode === 'one_time' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}
            >
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`border py-3 text-sm font-semibold transition-colors ${
                    selectedAmount === amount
                      ? 'border-copper bg-copper/15 text-copper'
                      : 'border-white/15 text-white hover:border-white/45'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              {billingMode === 'one_time' && (
                <button
                  type="button"
                  onClick={handleCustom}
                  className="border border-white/15 py-3 text-xs font-semibold text-white transition-colors hover:border-copper hover:text-copper"
                >
                  {t('donate.custom')}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-3 bg-copper py-3.5 text-sm font-semibold text-[#102044] transition-colors hover:bg-white"
            >
              {billingMode === 'monthly'
                ? t('donate.startMonthly')
                : t('donate.oneTimeButton')}
              <LuArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
