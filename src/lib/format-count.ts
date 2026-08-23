const compactNumber = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

/** "521" stays exact; "1.1K" and "1.2M" for larger store counts */
export function formatCount(count: number): string {
  return count >= 1000 ? compactNumber.format(count) : String(count)
}
