import { describe, expect, it } from 'vitest'

import { formatCount } from './format-count'

describe('formatCount', () => {
  it('keeps counts under 1,000 as plain digits', () => {
    expect(formatCount(521)).toBe('521')
  })

  it('compacts counts of 1,000 and above', () => {
    expect(formatCount(1100)).toBe('1.1K')
    expect(formatCount(50000)).toBe('50K')
    expect(formatCount(1200000)).toBe('1.2M')
  })
})
