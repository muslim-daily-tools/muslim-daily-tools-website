import { useTranslation } from 'react-i18next'
import type { TeamMember } from '@/data/team'
import { Section } from '@/components/ui/section'

export function ProfileBio({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')
  const { t: tHome } = useTranslation('home')
  const paragraphs = tHome(`team.members.${member.slug}.bio`).split('\n\n')

  return (
    <Section
      tone="card"
      align="start"
      eyebrow={t('sections.about')}
      title={tHome(`team.members.${member.slug}.title`)}
      className="py-20 md:py-28"
    >
      <div className="max-w-3xl flex flex-col gap-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="type-body text-muted-foreground text-pretty"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  )
}
