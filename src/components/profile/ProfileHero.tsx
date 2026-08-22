import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuArrowLeft, LuDownload, LuMail, LuYoutube } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SocialLinks } from '@/components/SocialLinks'

const primaryCtaClass =
  'inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-[0.9375rem] font-medium transition-opacity hover:opacity-85'

const secondaryCtaClass =
  'inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-gold transition-opacity hover:opacity-75'

export function ProfileHero({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')
  const { t: tHome } = useTranslation('home')
  const name = tHome(`team.members.${member.slug}.name`)

  return (
    <section className="geo-pattern px-6 md:px-10 pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="print:hidden">
          <Link
            to="/"
            hash="team"
            className="inline-flex items-center gap-2 type-caption font-normal text-muted-foreground hover:text-foreground transition-colors"
          >
            <LuArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t('backToTeam')}
          </Link>
        </FadeIn>

        <div className="mt-14 grid gap-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <FadeIn variant="scaleIn">
            <img
              src={member.image}
              alt={name}
              width={224}
              height={224}
              className="frame-shadow h-40 w-40 rounded-full object-cover md:h-52 md:w-52"
            />
          </FadeIn>

          <div className="flex flex-col items-start gap-5">
            <FadeIn delay={0.05}>
              <Eyebrow>{t(`${member.slug}.role`)}</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="type-display text-foreground text-balance">
                {name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="type-body max-w-xl text-muted-foreground text-pretty">
                {t(`${member.slug}.tagline`)}
              </p>
            </FadeIn>
            <FadeIn
              delay={0.2}
              className="flex flex-wrap items-center gap-x-7 gap-y-3 print:hidden"
            >
              {member.email && (
                <a href={`mailto:${member.email}`} className={primaryCtaClass}>
                  <LuMail className="w-4 h-4" />
                  {t('actions.email')}
                </a>
              )}
              {member.cvUrl && (
                <a href={member.cvUrl} className={secondaryCtaClass}>
                  <LuDownload className="w-4 h-4" />
                  {t('actions.downloadCv')}
                </a>
              )}
              {member.socials.youtube && (
                <a
                  href={member.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryCtaClass}
                >
                  <LuYoutube className="w-4 h-4" />
                  {t('actions.watchChannel')}
                </a>
              )}
            </FadeIn>
            <FadeIn delay={0.25}>
              <SocialLinks socials={member.socials} size="md" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
