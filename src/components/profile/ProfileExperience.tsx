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
      eyebrow={t('sections.experience')}
      title={t('sections.experience')}
      className="py-16 md:py-20"
    >
      <StaggerContainer
        as="ol"
        className="max-w-4xl border-s border-t border-border"
        staggerDelay={0.08}
      >
        {member.experience.map((job, index) => (
          <StaggerItem
            key={job.company}
            as="li"
            className="grid border-b border-border sm:grid-cols-[5rem_1fr]"
          >
            <span className="coordinate-label border-e border-border p-5 text-muted-foreground/60">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="relative flex flex-col gap-1 p-5 md:p-7">
              <span className="absolute end-5 top-5 h-1.5 w-1.5 rotate-45 bg-copper" />
              <h3 className="text-lg font-semibold text-foreground">
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-lapis"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="text-muted-foreground">{t(job.roleKey)}</p>
              {job.period && (
                <p className="coordinate-label mt-2 text-muted-foreground/70">
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
