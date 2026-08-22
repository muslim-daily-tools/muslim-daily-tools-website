import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuArrowUpRight } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { teamMembers } from '@/data/team'
import { SocialLinks } from '@/components/SocialLinks'
import { Section } from '@/components/ui/section'

function TeamCard({ member }: { member: TeamMember }): React.JSX.Element {
  const { t } = useTranslation('home')
  const name = t(`team.members.${member.slug}.name`)

  return (
    <article className="motion-lift group relative flex flex-col gap-6 rounded-2xl bg-card p-8 sm:flex-row md:p-10">
      <img
        src={member.image}
        alt={name}
        width={160}
        height={160}
        className="h-28 w-28 shrink-0 rounded-full object-cover md:h-32 md:w-32"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3 className="type-title text-foreground">
            <Link
              to="/team/$slug"
              params={{ slug: member.slug }}
              className="after:absolute after:inset-0"
            >
              {name}
            </Link>
          </h3>
          <p className="type-caption mt-1 text-muted-foreground">
            {t(`team.members.${member.slug}.shortTitle`)}
          </p>
        </div>
        <p className="type-body text-muted-foreground text-pretty">
          {t(`team.members.${member.slug}.summary`)}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
          <SocialLinks socials={member.socials} className="relative z-10" />
          <span className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-gold transition-opacity group-hover:opacity-75">
            {t('team.viewProfile')}
            <LuArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
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
        className="grid gap-6 lg:grid-cols-2"
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
