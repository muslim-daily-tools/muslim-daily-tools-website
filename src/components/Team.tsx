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
    <article className="group relative flex flex-col sm:flex-row gap-6 rounded-[1.75rem] border border-border bg-card p-7 md:p-9 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-soft-lg">
      <img
        src={member.image}
        alt={name}
        width={160}
        height={160}
        className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-[1.5rem] object-cover border border-gold/25"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-[1.2]">
            <Link
              to="/team/$slug"
              params={{ slug: member.slug }}
              className="after:absolute after:inset-0 hover:text-gold transition-colors"
            >
              {name}
            </Link>
          </h3>
          <p className="text-sm font-medium text-gold mt-1">
            {t(`team.members.${member.slug}.shortTitle`)}
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-pretty">
          {t(`team.members.${member.slug}.summary`)}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <SocialLinks socials={member.socials} className="relative z-10" />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
            {t('team.viewProfile')}
            <LuArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
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
      ornament
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
