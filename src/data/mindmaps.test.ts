import { describe, it, expect } from 'vitest'
import {
  mindMaps,
  categories,
  type MindMap,
  type MindMapCategory,
} from './mindmaps'

describe('mindmaps data layer', () => {
  describe('mindMaps array', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(mindMaps)).toBe(true)
      expect(mindMaps.length).toBeGreaterThan(0)
    })

    it('should have all required fields for each mind map', () => {
      const requiredFields: (keyof MindMap)[] = [
        'slug',
        'titleKey',
        'descriptionKey',
        'category',
        'pdfPath',
        'published',
      ]

      mindMaps.forEach((map) => {
        requiredFields.forEach((field) => {
          expect(map).toHaveProperty(field)
        })
      })
    })

    it('should have unique slugs', () => {
      const slugs = mindMaps.map((m) => m.slug)
      const uniqueSlugs = new Set(slugs)
      expect(slugs.length).toBe(uniqueSlugs.size)
    })

    it('should have valid category values', () => {
      const validCategories: MindMapCategory[] = ['quran', 'seerah', 'books']
      mindMaps.forEach((map) => {
        expect(validCategories).toContain(map.category)
      })
    })

    it('should have proper i18n key format for titleKey', () => {
      mindMaps.forEach((map) => {
        expect(map.titleKey).toMatch(/^mindMaps:items\.\w+\.title$/)
      })
    })

    it('should have proper i18n key format for descriptionKey', () => {
      mindMaps.forEach((map) => {
        expect(map.descriptionKey).toMatch(/^mindMaps:items\.\w+\.description$/)
      })
    })

    it('should have proper pdfPath format', () => {
      mindMaps.forEach((map) => {
        expect(map.pdfPath).toMatch(/^\/mindmaps\/[\w-]+\.pdf$/)
      })
    })
  })

  describe('categories', () => {
    it('should have all expected categories', () => {
      expect(categories).toHaveProperty('quran')
      expect(categories).toHaveProperty('seerah')
      expect(categories).toHaveProperty('books')
    })

    it('should have labelKey for each category', () => {
      Object.values(categories).forEach((cat) => {
        expect(cat).toHaveProperty('labelKey')
        expect(cat.labelKey).toMatch(/^mindMaps:categories\.\w+$/)
      })
    })
  })
})
