import { useTranslation } from 'react-i18next'
import type {TeamMember} from '@/data/team';
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import {  teamMembers } from '@/data/team'
import { SocialLinks } from '@/components/SocialLinks'
import { Section } from '@/components/ui/section'

function TeamCard({ member }: { member: TeamMember }): React.JSX.Element {
  const { t } = useTranslation('home')
  const name = t(`team.members.${member.slug}.name`)

  return (
    <article className="group relative flex flex-col sm:flex-row gap-6 rounded-3xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]">
      <img
        src={member.image}
        alt={name}
        width={160}
        height={160}
        className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-2xl object-cover border border-border"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground">
            {name}
          </h3>
          <p className="text-sm font-medium text-gold mt-1">
            {t(`team.members.${member.slug}.shortTitle`)}
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-pretty">
          {t(`team.members.${member.slug}.summary`)}
        </p>
        <div className="mt-auto pt-2">
          <SocialLinks socials={member.socials} />
        </div>
      </div>
    </article>
  )
}

export function Team(): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <Section
      id="team"
      width="wide"
      eyebrow={t('team.eyebrow')}
      title={t('team.title')}
      description={t('team.subtitle')}
    >
      <StaggerContainer
        as="div"
        className="grid gap-5 lg:grid-cols-2"
        staggerDelay={0.15}
      >
        {teamMembers.map((member) => (
          <StaggerItem key={member.slug} variant="scaleIn">
            <TeamCard member={member} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
