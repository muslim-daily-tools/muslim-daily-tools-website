import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuArrowUpRight } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { teamMembers } from '@/data/team'
import { SocialLinks } from '@/components/SocialLinks'
import { Section } from '@/components/ui/section'

function TeamCard({
  member,
  index,
}: {
  member: TeamMember
  index: number
}): React.JSX.Element {
  const { t } = useTranslation('home')
  const name = t(`team.members.${member.slug}.name`)

  return (
    <article className="instrument-panel group relative grid h-full sm:grid-cols-[11rem_1fr]">
      <div className="relative min-h-64 overflow-hidden border-b border-border sm:min-h-full sm:border-b-0 sm:border-e">
        <img
          src={member.image}
          alt={name}
          width={352}
          height={480}
          className="absolute inset-0 h-full w-full object-cover object-top grayscale-[20%] transition-all duration-500 group-hover:scale-[1.025] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102044]/65 via-transparent to-transparent" />
        <span className="coordinate-label absolute bottom-4 start-4 text-white/75">
          MEMBER / {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex min-h-72 flex-col p-6 md:p-8">
        <div className="mb-8 h-px w-12 bg-copper" />
        <h3 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
          <Link
            to="/team/$slug"
            params={{ slug: member.slug }}
            className="after:absolute after:inset-0 transition-colors hover:text-lapis"
          >
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-lapis rtl:normal-case rtl:tracking-normal">
          {t(`team.members.${member.slug}.shortTitle`)}
        </p>
        <p className="mt-5 flex-1 leading-relaxed text-pretty text-muted-foreground">
          {t(`team.members.${member.slug}.summary`)}
        </p>
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-4">
          <SocialLinks socials={member.socials} className="relative z-10" />
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-lapis">
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
      align="start"
      eyebrow={t('team.eyebrow')}
      title={t('team.title')}
      description={t('team.subtitle')}
    >
      <StaggerContainer
        as="div"
        className="grid gap-px bg-border lg:grid-cols-2"
        staggerDelay={0.15}
      >
        {teamMembers.map((member, index) => (
          <StaggerItem key={member.slug} variant="scaleIn" className="h-full">
            <TeamCard member={member} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
