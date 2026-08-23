import { describe, expect, it } from 'vitest'

import { formatStat, parseStat } from './count-up'

describe('parseStat', () => {
  it('splits number, suffix, and grouping', () => {
    expect(parseStat('50,000+')).toEqual({
      value: 50000,
      suffix: '+',
      grouped: true,
    })
    expect(parseStat('1M+')).toEqual({ value: 1, suffix: 'M+', grouped: false })
    expect(parseStat('500K+')).toEqual({
      value: 500,
      suffix: 'K+',
      grouped: false,
    })
    expect(parseStat('40+')).toEqual({ value: 40, suffix: '+', grouped: false })
  })

  it('returns null for text without a leading number', () => {
    expect(parseStat('∞')).toBeNull()
  })
})

describe('formatStat', () => {
  it('renders intermediate values in the same shape as the target', () => {
    const stat = parseStat('50,000+')
    expect(stat && formatStat(stat, 12345.6)).toBe('12,346+')
    expect(stat && formatStat(stat, 0)).toBe('0+')
  })

  it('keeps K and M suffixes', () => {
    const stat = parseStat('500K+')
    expect(stat && formatStat(stat, 250)).toBe('250K+')
  })
})
