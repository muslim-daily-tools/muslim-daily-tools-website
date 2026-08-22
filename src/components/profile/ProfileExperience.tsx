import { useTranslation } from 'react-i18next'
import type { TeamMember } from '@/data/team'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { Section } from '@/components/ui/section'

export function ProfileExperience({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')

  return (
    <Section
      tone="card"
      align="start"
      ornament
      eyebrow={t('sections.experience')}
      title={t('sections.experience')}
      className="py-16 md:py-20"
    >
      <StaggerContainer
        as="ol"
        className="relative max-w-3xl border-s border-gold/25 ms-2"
        staggerDelay={0.08}
      >
        {member.experience.map((job) => (
          <StaggerItem
            key={job.company}
            as="li"
            className="relative ps-8 pb-10 last:pb-0"
          >
            <span className="absolute -start-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-card" />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-foreground">
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="text-muted-foreground">{t(job.roleKey)}</p>
              {job.period && (
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                  {job.period}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
