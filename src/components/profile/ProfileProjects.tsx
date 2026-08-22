import { useTranslation } from 'react-i18next'
import { LuArrowUpRight } from 'react-icons/lu'
import type { CSSProperties } from 'react'
import type { TeamMember } from '@/data/team'
import { getToolBySlug } from '@/data/tools'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

const cardClass =
  'accent-card glass-surface group flex h-full flex-col gap-4 rounded-[1.5rem] p-6'

export function ProfileProjects({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')
  const { t: tHome } = useTranslation('home')
  const memberTools = member.toolSlugs
    .map(getToolBySlug)
    .filter((tool) => tool !== undefined)

  return (
    <Section
      align="start"
      eyebrow={t('sections.tools')}
      title={tHome('tools.title')}
      className="py-16 md:py-20"
    >
      <StaggerContainer
        as="div"
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {memberTools.map((tool) => {
          const primaryLink = tool.links[0]
          return (
            <StaggerItem key={tool.slug} variant="scaleIn" className="h-full">
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--tool-accent': tool.accent } as CSSProperties}
                className={cardClass}
              >
                <div
                  className={cn(
                    'accent-tile w-14 h-14 rounded-2xl border border-hairline bg-background/60 overflow-hidden flex items-center justify-center',
                    tool.fullBleedLogo ? 'p-0' : 'p-2',
                  )}
                >
                  <img
                    src={tool.logo}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-2xl font-medium text-foreground">
                    {tHome(tool.titleKey)}
                  </h3>
                  {tool.userCount && (
                    <p className="accent-text text-xs font-semibold">
                      {tool.userCount} {tHome('tools.users')}
                    </p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                  {tHome(tool.descriptionKey)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                  {t('actions.openTool')}
                  <LuArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {member.projects.length > 0 && (
        <div className="mt-16 flex flex-col gap-6">
          <Eyebrow>{t('sections.projects')}</Eyebrow>
          <StaggerContainer
            as="div"
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {member.projects.map((project) => (
              <StaggerItem
                key={project.name}
                variant="scaleIn"
                className="h-full"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-medium text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-xs font-medium text-gold">
                      {t(project.roleKey)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                    {t(project.descriptionKey)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                    {t('actions.visit')}
                    <LuArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </Section>
  )
}
