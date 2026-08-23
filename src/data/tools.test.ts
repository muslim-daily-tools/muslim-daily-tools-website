import { describe, expect, it } from 'vitest'

import { getFeaturedTools, getToolBySlug, tools } from './tools'

describe('tools data', () => {
  it('keeps the canonical display order', () => {
    expect(tools.map((tool) => tool.slug)).toEqual([
      'quran-station',
      'quran-tab',
      'ayah-flow',
      'pray-on-time',
      'nawaya',
    ])
  })

  it('finds a tool by slug', () => {
    expect(getToolBySlug('quran-tab')?.titleKey).toBe('tools.quranTab.title')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getToolBySlug('not-a-tool')).toBeUndefined()
  })

  it('marks only tools with store stats as featured', () => {
    expect(getFeaturedTools().map((tool) => tool.slug)).toEqual([
      'quran-station',
      'quran-tab',
    ])
  })

  it('links Quran Station to the Play Store', () => {
    const android = getToolBySlug('quran-station')?.links.find(
      (l) => l.platform === 'android',
    )
    expect(android?.href).toBe(
      'https://play.google.com/store/apps/details?id=com.mohamedabusrea.quranstation',
    )
  })

  it('lists every platform each tool ships on', () => {
    expect(
      getToolBySlug('quran-station')?.links.map((l) => l.platform),
    ).toEqual(['website', 'chrome', 'firefox', 'ios', 'android'])
  })
})
