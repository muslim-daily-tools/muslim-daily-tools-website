import { useTranslation } from 'react-i18next'
import { LuDownload, LuExternalLink } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { categories, type MindMap, type MindMapCategory } from '@/data/mindmaps'

interface MindMapCardProps {
  mindMap: MindMap
  index?: number
}

const categoryColors: Record<MindMapCategory, string> = {
  quran: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  seerah: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  books: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
}

export function MindMapCard({ mindMap, index = 0 }: MindMapCardProps) {
  const { t } = useTranslation()
  const isTeaser = !mindMap.published

  const handlePreview = () => {
    window.open(mindMap.pdfPath, '_blank', 'noopener,noreferrer')
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = mindMap.pdfPath
    link.download = `${mindMap.slug}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // For unpublished maps, render a non-clickable teaser card
  if (isTeaser) {
    return (
      <div
        className={cn(
          'block bg-card/50 rounded-xl p-5 border border-border/50',
          'opacity-40 cursor-not-allowed',
          'animate-in fade-in slide-in-from-bottom-4'
        )}
        style={{
          animationDelay: `${index * 50}ms`,
          animationFillMode: 'backwards',
        }}
      >
        <div className="flex flex-col gap-3">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'text-xs font-medium px-2.5 py-1 rounded-full',
                categoryColors[mindMap.category]
              )}
            >
              {t(categories[mindMap.category].labelKey)}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              {t('mindMaps:comingSoon')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground">
            {t(mindMap.titleKey)}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {t(mindMap.descriptionKey)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'block bg-card rounded-xl p-5 shadow-sm border border-border',
        'animate-in fade-in slide-in-from-bottom-4'
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'backwards',
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Category Badge */}
        <span
          className={cn(
            'self-start text-xs font-medium px-2.5 py-1 rounded-full',
            categoryColors[mindMap.category]
          )}
        >
          {t(categories[mindMap.category].labelKey)}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground">
          {t(mindMap.titleKey)}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {t(mindMap.descriptionKey)}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handlePreview}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            title={t('mindMaps:actions.preview')}
          >
            <LuExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            title={t('mindMaps:actions.download')}
          >
            <LuDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
