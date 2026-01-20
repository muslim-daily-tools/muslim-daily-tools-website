import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { categories, type MindMapCategory } from '@/data/mindmaps'

interface CategoryTabsProps {
  activeCategory: MindMapCategory | 'all'
  onCategoryChange: (category: MindMapCategory | 'all') => void
}

const categoryOrder: Array<MindMapCategory | 'all'> = ['all', 'quran', 'seerah', 'books']

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { t } = useTranslation('mindMaps')

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-muted rounded-xl">
      {categoryOrder.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            activeCategory === category
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          )}
        >
          {category === 'all' ? t('filter.all') : t(categories[category].labelKey)}
        </button>
      ))}
    </div>
  )
}
