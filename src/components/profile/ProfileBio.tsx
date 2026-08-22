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
      className="py-16 md:py-20"
    >
      <div className="max-w-4xl border-s border-border">
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className="grid border-b border-border sm:grid-cols-[5rem_1fr]"
          >
            <span className="coordinate-label border-e border-border p-5 text-muted-foreground/60">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="p-5 text-lg leading-relaxed text-pretty text-muted-foreground md:p-7">
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
