const PAYMENT_LINKS: Record<string, string> = {
  one_time_10: 'https://buy.stripe.com/bJe7sL0gT0ergZB3ZL5sA0i',
  one_time_50: 'https://buy.stripe.com/fZu3cv4x9aT5gZBfIt5sA0j',
  one_time_100: 'https://buy.stripe.com/7sY4gzd3F1ivbFh2VH5sA0k',
  one_time_custom: 'https://buy.stripe.com/eVqcN5e7Jd1d7p10Nz5sA09',
  monthly_10: 'https://buy.stripe.com/eVqcN5e7J3qD24H53P5sA0l',
  monthly_50: 'https://buy.stripe.com/14A9AT7Jl6CPaBddAl5sA0m',
  monthly_100: 'https://buy.stripe.com/7sY5kD8Npf9ldNpgMx5sA0n',
}

export function getPaymentLink(
  mode: 'one_time' | 'monthly',
  amount: number | 'custom',
): string | undefined {
  return PAYMENT_LINKS[`${mode}_${amount}`]
}
