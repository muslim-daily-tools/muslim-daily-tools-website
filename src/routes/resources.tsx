import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuExternalLink } from 'react-icons/lu'

import QuranTabLogo from '../assets/quran-tab-logo.png'
import QuranStationLogo from '../assets/quran-station-logo.png'
import { cn } from '@/lib/utils'

// Types
type ToolId = 'quran-tab' | 'quran-station'
type ResourceCategory = 'apis' | 'libraries' | 'fonts' | 'data' | 'tools'

interface ResourceItem {
  nameKey: string
  descriptionKey: string
  url?: string
  license?: string
}

interface ResourceGroup {
  category: ResourceCategory
  titleKey: string
  items: Array<ResourceItem>
}

interface ToolResources {
  toolId: ToolId
  titleKey: string
  logo: string
  groups: Array<ResourceGroup>
}

// Resource data per tool
const toolResources: Array<ToolResources> = [
  {
    toolId: 'quran-tab',
    titleKey: 'home:tools.quranTab.title',
    logo: QuranTabLogo,
    groups: [
      {
        category: 'apis',
        titleKey: 'resources:categories.apis',
        items: [
          {
            nameKey: 'resources:items.quranenc.name',
            descriptionKey: 'resources:items.quranenc.description',
            url: 'https://quranenc.com',
          },
          {
            nameKey: 'resources:items.tafsirApi.name',
            descriptionKey: 'resources:items.tafsirApi.description',
            url: 'https://github.com/spa5k/tafsir_api',
          },
          {
            nameKey: 'resources:items.everyayah.name',
            descriptionKey: 'resources:items.everyayah.description',
            url: 'https://everyayah.com',
          },
          {
            nameKey: 'resources:items.nominatim.name',
            descriptionKey: 'resources:items.nominatim.description',
            url: 'https://nominatim.openstreetmap.org',
          },
        ],
      },
      {
        category: 'libraries',
        titleKey: 'resources:categories.libraries',
        items: [
          {
            nameKey: 'resources:items.react.name',
            descriptionKey: 'resources:items.react.description',
            url: 'https://react.dev',
            license: 'MIT',
          },
          {
            nameKey: 'resources:items.zustand.name',
            descriptionKey: 'resources:items.zustand.description',
            url: 'https://zustand-demo.pmnd.rs',
            license: 'MIT',
          },
          {
            nameKey: 'resources:items.tanstackQuery.name',
            descriptionKey: 'resources:items.tanstackQuery.description',
            url: 'https://tanstack.com/query',
            license: 'MIT',
          },
          {
            nameKey: 'resources:items.adhanjs.name',
            descriptionKey: 'resources:items.adhanjs.description',
            url: 'https://github.com/batoulapps/adhan-js',
            license: 'MIT',
          },
          {
            nameKey: 'resources:items.tailwind.name',
            descriptionKey: 'resources:items.tailwind.description',
            url: 'https://tailwindcss.com',
            license: 'MIT',
          },
          {
            nameKey: 'resources:items.vite.name',
            descriptionKey: 'resources:items.vite.description',
            url: 'https://vitejs.dev',
            license: 'MIT',
          },
          {
            nameKey: 'resources:items.crxjs.name',
            descriptionKey: 'resources:items.crxjs.description',
            url: 'https://crxjs.dev/vite-plugin',
            license: 'MIT',
          },
        ],
      },
      {
        category: 'fonts',
        titleKey: 'resources:categories.fonts',
        items: [
          {
            nameKey: 'resources:items.readexPro.name',
            descriptionKey: 'resources:items.readexPro.description',
            url: 'https://fonts.google.com/specimen/Readex+Pro',
            license: 'OFL',
          },
          {
            nameKey: 'resources:items.uthmanicHafs.name',
            descriptionKey: 'resources:items.uthmanicHafs.description',
            url: 'https://qul.tarteel.ai/resources/font/245',
          },
          {
            nameKey: 'resources:items.qcfSurahHeader.name',
            descriptionKey: 'resources:items.qcfSurahHeader.description',
            url: 'https://qul.tarteel.ai/resources/font/458',
          },
        ],
      },
      {
        category: 'data',
        titleKey: 'resources:categories.data',
        items: [
          {
            nameKey: 'resources:items.qpcHafs.name',
            descriptionKey: 'resources:items.qpcHafs.description',
            url: 'https://qul.tarteel.ai/resources/quran-script/86',
          },
          {
            nameKey: 'resources:items.quranMetadata.name',
            descriptionKey: 'resources:items.quranMetadata.description',
            url: 'https://qul.tarteel.ai/resources/quran-metadata',
          },
          {
            nameKey: 'resources:items.recitersCatalog.name',
            descriptionKey: 'resources:items.recitersCatalog.description',
            url: 'https://everyayah.com',
          },
        ],
      },
      {
        category: 'tools',
        titleKey: 'resources:categories.tools',
        items: [
          {
            nameKey: 'resources:items.typescript.name',
            descriptionKey: 'resources:items.typescript.description',
            url: 'https://www.typescriptlang.org',
          },
          {
            nameKey: 'resources:items.playwright.name',
            descriptionKey: 'resources:items.playwright.description',
            url: 'https://playwright.dev',
            license: 'Apache-2.0',
          },
          {
            nameKey: 'resources:items.vitest.name',
            descriptionKey: 'resources:items.vitest.description',
            url: 'https://vitest.dev',
            license: 'MIT',
          },
        ],
      },
    ],
  },
  {
    toolId: 'quran-station',
    titleKey: 'home:tools.quranStation.title',
    logo: QuranStationLogo,
    groups: [],
  },
]

// Search params validation
interface ResourcesSearch {
  tool?: ToolId
}

export const Route = createFileRoute('/resources')({
  validateSearch: (search: Record<string, unknown>): ResourcesSearch => {
    const validTools: Array<ToolId> = ['quran-tab', 'quran-station']
    const tool = search.tool as string | undefined
    return {
      tool: validTools.includes(tool as ToolId) ? (tool as ToolId) : undefined,
    }
  },
  component: ResourcesPage,
})

// Tab Navigation Component
interface ToolTabsProps {
  tools: Array<ToolResources>
  activeToolId: ToolId
  onTabChange: (toolId: ToolId) => void
}

function ToolTabs({ tools, activeToolId, onTabChange }: ToolTabsProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-muted rounded-xl">
      {tools.map((tool) => (
        <button
          key={tool.toolId}
          onClick={() => onTabChange(tool.toolId)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            activeToolId === tool.toolId
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-card/50',
          )}
        >
          <img
            src={tool.logo}
            alt=""
            className="hidden sm:block w-5 h-5 rounded"
          />
          <span>{t(tool.titleKey)}</span>
        </button>
      ))}
    </div>
  )
}

// Resource Card Component
interface ResourceCardProps {
  item: ResourceItem
  index: number
}

function ResourceCard({ item, index }: ResourceCardProps) {
  const { t } = useTranslation()

  return (
    <div
      className="bg-card rounded-xl p-5 shadow-sm border border-border animate-in fade-in slide-in-from-bottom-4 hover:shadow-md transition-shadow"
      style={{
        animationDelay: `${index * 30}ms`,
        animationFillMode: 'backwards',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1.5">
            {t(item.nameKey)}
          </h4>
          <p className="text-sm text-muted-foreground">
            {t(item.descriptionKey)}
          </p>
          {item.license && (
            <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
              {item.license}
            </span>
          )}
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`${t(item.nameKey)} - ${t('resources:openLink')}`}
          >
            <LuExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}

// Resource Group Component
interface ResourceGroupSectionProps {
  group: ResourceGroup
  groupIndex: number
}

function ResourceGroupSection({
  group,
  groupIndex,
}: ResourceGroupSectionProps) {
  const { t } = useTranslation()

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4"
      style={{
        animationDelay: `${groupIndex * 100}ms`,
        animationFillMode: 'backwards',
      }}
    >
      <h3 className="text-xl font-semibold text-foreground mb-4">
        {t(group.titleKey)}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {group.items.map((item, index) => (
          <ResourceCard key={item.nameKey} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

// Main Page Component
function ResourcesPage() {
  const { t } = useTranslation()
  const { tool } = useSearch({ from: '/resources' })
  const navigate = useNavigate({ from: '/resources' })

  // Default to 'quran-tab' when no tool specified
  const activeToolId: ToolId = tool ?? 'quran-tab'

  const handleTabChange = (toolId: ToolId) => {
    navigate({
      search: { tool: toolId },
      replace: true,
    })
  }

  const activeResources = toolResources.find((r) => r.toolId === activeToolId)

  return (
    <section className="py-12 px-6 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('resources:title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('resources:subtitle')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <ToolTabs
            tools={toolResources}
            activeToolId={activeToolId}
            onTabChange={handleTabChange}
          />
        </div>

        {/* Resource Groups */}
        {activeResources && activeResources.groups.length > 0 ? (
          <div className="space-y-12">
            {activeResources.groups.map((group, index) => (
              <ResourceGroupSection
                key={group.category}
                group={group}
                groupIndex={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            {t('resources:noResources')}
          </p>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            {t('resources:footerNote')}
          </p>
        </div>
      </div>
    </section>
  )
}
