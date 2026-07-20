import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import QuranTabLogo from '../assets/quran-tab-logo.png'

// Types
type ToolId = 'quran-station' | 'quran-tab' | 'prayercal'
type ChangeCategory = 'new' | 'improved' | 'fixed'

interface ChangeItem {
  description: string // i18n key
}

interface ChangeGroup {
  category: ChangeCategory
  items: ChangeItem[]
}

interface Version {
  version: string
  date: string // ISO date string
  changes: ChangeGroup[]
}

interface ToolChangelog {
  toolId: ToolId
  titleKey: string
  logo: string
  versions: Version[]
}

// Category configuration
const categoryConfig: Record<
  ChangeCategory,
  { emoji: string; labelKey: string }
> = {
  new: { emoji: '✨', labelKey: 'changelog:categories.new' },
  improved: { emoji: '⬆️', labelKey: 'changelog:categories.improved' },
  fixed: { emoji: '🐛', labelKey: 'changelog:categories.fixed' },
}

// Changelog data for Quran Tab
const changelogs: ToolChangelog[] = [
  {
    toolId: 'quran-tab',
    titleKey: 'home:tools.quranTab.title',
    logo: QuranTabLogo,
    versions: [
      {
        version: '4.11.2',
        date: '2026-07-20',
        changes: [
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v4112.fixed1' },
              { description: 'changelog:quranTab.v4112.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.11.1',
        date: '2026-07-19',
        changes: [
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v4111.fixed1' }],
          },
        ],
      },
      {
        version: '4.11.0',
        date: '2026-07-09',
        changes: [
          {
            category: 'new',
            items: [{ description: 'changelog:quranTab.v4110.new1' }],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v4110.improved1' },
              { description: 'changelog:quranTab.v4110.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v4110.fixed1' }],
          },
        ],
      },
      {
        version: '4.10.1',
        date: '2026-07-06',
        changes: [
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v4101.improved1' },
              { description: 'changelog:quranTab.v4101.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v4101.fixed1' },
              { description: 'changelog:quranTab.v4101.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.10.0',
        date: '2026-07-05',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v4100.new1' },
              { description: 'changelog:quranTab.v4100.new2' },
              { description: 'changelog:quranTab.v4100.new3' },
              { description: 'changelog:quranTab.v4100.new4' },
              { description: 'changelog:quranTab.v4100.new5' },
            ],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v4100.improved1' },
              { description: 'changelog:quranTab.v4100.improved2' },
              { description: 'changelog:quranTab.v4100.improved3' },
              { description: 'changelog:quranTab.v4100.improved4' },
            ],
          },
        ],
      },
      {
        version: '4.9.0',
        date: '2026-07-01',
        changes: [
          {
            category: 'new',
            items: [{ description: 'changelog:quranTab.v490.new1' }],
          },
          {
            category: 'improved',
            items: [{ description: 'changelog:quranTab.v490.improved1' }],
          },
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v490.fixed1' },
              { description: 'changelog:quranTab.v490.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.8.1',
        date: '2026-06-30',
        changes: [
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v481.fixed1' }],
          },
        ],
      },
      {
        version: '4.8.0',
        date: '2026-06-30',
        changes: [
          {
            category: 'new',
            items: [{ description: 'changelog:quranTab.v480.new1' }],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v480.improved1' },
              { description: 'changelog:quranTab.v480.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v480.fixed1' },
              { description: 'changelog:quranTab.v480.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.7.0',
        date: '2026-06-27',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v470.new1' },
              { description: 'changelog:quranTab.v470.new2' },
            ],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v470.improved1' },
              { description: 'changelog:quranTab.v470.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v470.fixed1' },
              { description: 'changelog:quranTab.v470.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.6.0',
        date: '2026-06-24',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v460.new1' },
              { description: 'changelog:quranTab.v460.new2' },
            ],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v460.improved1' },
              { description: 'changelog:quranTab.v460.improved2' },
            ],
          },
        ],
      },
      {
        version: '4.5.3',
        date: '2026-06-07',
        changes: [
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v453.improved1' },
              { description: 'changelog:quranTab.v453.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v453.fixed1' }],
          },
        ],
      },
      {
        version: '4.5.2',
        date: '2026-05-29',
        changes: [
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v452.improved1' },
              { description: 'changelog:quranTab.v452.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v452.fixed1' },
              { description: 'changelog:quranTab.v452.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.5.0',
        date: '2026-02-08',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v450.new1' },
              { description: 'changelog:quranTab.v450.new2' },
            ],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v450.improved1' },
              { description: 'changelog:quranTab.v450.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v450.fixed1' }],
          },
        ],
      },
      {
        version: '4.4.0',
        date: '2026-01-21',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v440.new1' },
              { description: 'changelog:quranTab.v440.new2' },
              { description: 'changelog:quranTab.v440.new3' },
              { description: 'changelog:quranTab.v440.new4' },
            ],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v440.improved1' },
              { description: 'changelog:quranTab.v440.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [
              { description: 'changelog:quranTab.v440.fixed1' },
              { description: 'changelog:quranTab.v440.fixed2' },
            ],
          },
        ],
      },
      {
        version: '4.3.0',
        date: '2025-01-12',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v430.new1' },
              { description: 'changelog:quranTab.v430.new2' },
            ],
          },
          {
            category: 'improved',
            items: [{ description: 'changelog:quranTab.v430.improved1' }],
          },
        ],
      },
      {
        version: '4.2.1',
        date: '2025-01-05',
        changes: [
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v421.fixed1' }],
          },
        ],
      },
      {
        version: '4.2.0',
        date: '2024-12-20',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v420.new1' },
              { description: 'changelog:quranTab.v420.new2' },
              { description: 'changelog:quranTab.v420.new3' },
              { description: 'changelog:quranTab.v420.new4' },
            ],
          },
          {
            category: 'improved',
            items: [{ description: 'changelog:quranTab.v420.improved1' }],
          },
        ],
      },
      {
        version: '4.1.3',
        date: '2025-10-07',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v413.new1' },
              { description: 'changelog:quranTab.v413.new2' },
            ],
          },
          {
            category: 'improved',
            items: [{ description: 'changelog:quranTab.v413.improved1' }],
          },
        ],
      },
      {
        version: '4.1.2',
        date: '2025-09-23',
        changes: [
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v412.fixed1' }],
          },
          {
            category: 'improved',
            items: [{ description: 'changelog:quranTab.v412.improved1' }],
          },
        ],
      },
      {
        version: '4.1.1',
        date: '2025-09-22',
        changes: [
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v411.fixed1' }],
          },
          {
            category: 'improved',
            items: [{ description: 'changelog:quranTab.v411.improved1' }],
          },
        ],
      },
      {
        version: '4.1.0',
        date: '2025-08-15',
        changes: [
          {
            category: 'new',
            items: [
              { description: 'changelog:quranTab.v410.new1' },
              { description: 'changelog:quranTab.v410.new2' },
              { description: 'changelog:quranTab.v410.new3' },
              { description: 'changelog:quranTab.v410.new4' },
              { description: 'changelog:quranTab.v410.new5' },
              { description: 'changelog:quranTab.v410.new6' },
              { description: 'changelog:quranTab.v410.new7' },
              { description: 'changelog:quranTab.v410.new8' },
              { description: 'changelog:quranTab.v410.new9' },
              { description: 'changelog:quranTab.v410.new10' },
              { description: 'changelog:quranTab.v410.new11' },
            ],
          },
        ],
      },
      {
        version: '4.0.0',
        date: '2025-07-27',
        changes: [
          {
            category: 'new',
            items: [{ description: 'changelog:quranTab.v4.new1' }],
          },
          {
            category: 'improved',
            items: [
              { description: 'changelog:quranTab.v4.improved1' },
              { description: 'changelog:quranTab.v4.improved2' },
            ],
          },
          {
            category: 'fixed',
            items: [{ description: 'changelog:quranTab.v4.fixed1' }],
          },
        ],
      },
    ],
  },
]

// Search params validation
interface ChangelogSearch {
  tool?: ToolId
}

export const Route = createFileRoute('/changelog')({
  validateSearch: (search: Record<string, unknown>): ChangelogSearch => {
    const validTools: ToolId[] = ['quran-station', 'quran-tab', 'prayercal']
    const tool = search.tool as string | undefined
    return {
      tool: validTools.includes(tool as ToolId) ? (tool as ToolId) : undefined,
    }
  },
  component: ChangelogPage,
})

// Tab Navigation Component
interface ToolTabsProps {
  tools: ToolChangelog[]
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

// Version Card Component
interface VersionCardProps {
  version: Version
  index: number
}

function VersionCard({ version, index }: VersionCardProps) {
  const { t, i18n } = useTranslation()

  // Format date based on current locale
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(version.date))

  return (
    <div
      className="bg-card rounded-xl p-6 shadow-sm border border-border animate-in fade-in slide-in-from-bottom-4"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'backwards',
      }}
    >
      {/* Version Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          v{version.version}
        </h3>
        <time className="text-sm text-muted-foreground">{formattedDate}</time>
      </div>

      {/* Change Categories */}
      <div className="space-y-5">
        {version.changes.map((group) => {
          const config = categoryConfig[group.category]
          return (
            <div key={group.category}>
              <h4 className="flex items-center gap-2 text-sm font-medium text-foreground mb-2.5">
                <span>{config.emoji}</span>
                <span>{t(config.labelKey)}</span>
              </h4>
              <ul className="space-y-1.5 ps-6">
                {group.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-muted-foreground list-disc"
                  >
                    {t(item.description)}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Main Page Component
function ChangelogPage() {
  const { t } = useTranslation()
  const { tool } = useSearch({ from: '/changelog' })
  const navigate = useNavigate({ from: '/changelog' })

  // Default to 'quran-tab' when no tool specified
  const activeToolId: ToolId = tool ?? 'quran-tab'

  const handleTabChange = (toolId: ToolId) => {
    navigate({
      search: { tool: toolId },
      replace: true,
    })
  }

  const activeChangelog = changelogs.find((c) => c.toolId === activeToolId)

  return (
    <section className="py-12 px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('changelog:title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('changelog:subtitle')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <ToolTabs
            tools={changelogs}
            activeToolId={activeToolId}
            onTabChange={handleTabChange}
          />
        </div>

        {/* Version Cards */}
        <div className="space-y-6">
          {activeChangelog?.versions.map((version, index) => (
            <VersionCard
              key={version.version}
              version={version}
              index={index}
            />
          ))}

          {(!activeChangelog || activeChangelog.versions.length === 0) && (
            <p className="text-center text-muted-foreground py-12">
              {t('changelog:noChanges')}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
