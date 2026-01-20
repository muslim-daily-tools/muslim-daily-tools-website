import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { mindMaps, type MindMapCategory } from '@/data/mindmaps'
import { MindMapCard, CategoryTabs } from '@/components/mindmaps'

// Search params validation
interface MindMapsSearch {
  category?: MindMapCategory | 'all'
}

export const Route = createFileRoute('/mind-maps')({
  validateSearch: (search: Record<string, unknown>): MindMapsSearch => {
    const validCategories: Array<MindMapCategory | 'all'> = [
      'all',
      'quran',
      'seerah',
      'books',
    ]
    const category = search.category as string | undefined
    return {
      category: validCategories.includes(category as MindMapCategory | 'all')
        ? (category as MindMapCategory | 'all')
        : undefined,
    }
  },
  head: () => ({
    meta: [
      {
        title: 'الخرائط الذهنية | Muslim Daily Tools',
      },
      {
        name: 'description',
        content:
          'خرائط ذهنية لحفظ القرآن والسيرة النبوية باستخدام تقنيات الحفظ المجرّبة',
      },
      {
        property: 'og:title',
        content: 'الخرائط الذهنية | Muslim Daily Tools',
      },
      {
        property: 'og:description',
        content:
          'خرائط ذهنية لحفظ القرآن والسيرة النبوية باستخدام تقنيات الحفظ المجرّبة',
      },
    ],
  }),
  component: MindMapsPage,
})

function MindMapsPage() {
  const { t } = useTranslation('mindMaps')
  const { category } = useSearch({ from: '/mind-maps' })
  const navigate = useNavigate({ from: '/mind-maps' })

  // Get active category, default to 'all'
  const activeCategory = category ?? 'all'

  // Get all mind maps, sorted with published first
  const allMaps = useMemo(
    () =>
      [...mindMaps].sort((a, b) => Number(b.published) - Number(a.published)),
    [],
  )

  // Filter mind maps by category
  const filteredMaps = useMemo(() => {
    if (activeCategory === 'all') {
      return allMaps
    }
    return allMaps.filter((map) => map.category === activeCategory)
  }, [allMaps, activeCategory])

  const handleCategoryChange = (newCategory: MindMapCategory | 'all') => {
    navigate({
      search: newCategory === 'all' ? {} : { category: newCategory },
      replace: true,
    })
  }

  return (
    <section className="py-12 px-6 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            {t('reference.text')}{' '}
            <a
              href={t('reference.url')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t('reference.linkText')}
            </a>{' '}
            {t('reference.linkSuffix')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Mind Maps Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMaps.map((mindMap, index) => (
            <MindMapCard key={mindMap.slug} mindMap={mindMap} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
