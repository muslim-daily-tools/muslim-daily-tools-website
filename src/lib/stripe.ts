const PAYMENT_LINKS: Record<string, string> = {
  one_time_10: 'https://buy.stripe.com/bJe6oH7Pr24U2iE3Yj9Zm02',
  one_time_50: 'https://buy.stripe.com/eVqeVd5Hj4d2f5qeCX9Zm03',
  one_time_100: 'https://buy.stripe.com/3cIaEX9XzfVKe1m8ez9Zm04',
  one_time_custom: 'https://buy.stripe.com/28E00j3zbcJybTe0M79Zm08',
  monthly_10: 'https://buy.stripe.com/fZufZh0mZcJy4qM2Uf9Zm05',
  monthly_50: 'https://buy.stripe.com/00w7sL8TvaBqcXi7av9Zm06',
  monthly_100: 'https://buy.stripe.com/28E00j6LnbFu7CY52n9Zm07',
}

export function getPaymentLink(
  mode: 'one_time' | 'monthly',
  amount: number | 'custom',
): string | undefined {
  return PAYMENT_LINKS[`${mode}_${amount}`]
}
