import { useTranslation } from 'react-i18next'
import { LuArrowUpRight } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { getToolBySlug } from '@/data/tools'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

const cardClass =
  'instrument-panel group flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lapis/70'

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
        className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {memberTools.map((tool, index) => {
          const primaryLink = tool.links[0]
          return (
            <StaggerItem key={tool.slug} variant="scaleIn" className="h-full">
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                <div className="mb-2 flex items-center justify-between border-b border-border pb-3">
                  <span className="coordinate-label text-muted-foreground">
                    TOOL / {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-copper" />
                </div>
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center overflow-hidden border border-border bg-background',
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
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    {tHome(tool.titleKey)}
                  </h3>
                  {tool.userCount && (
                    <p className="coordinate-label mt-1 text-lapis">
                      {tool.userCount} {tHome('tools.users')}
                    </p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                  {tHome(tool.descriptionKey)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-lapis">
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
            className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {member.projects.map((project, index) => (
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
                  <span className="coordinate-label border-b border-border pb-3 text-muted-foreground">
                    PROJECT / {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <p className="coordinate-label mt-1 text-lapis">
                      {t(project.roleKey)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                    {t(project.descriptionKey)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-lapis">
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
