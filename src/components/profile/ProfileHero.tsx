import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuArrowLeft, LuDownload, LuMail, LuYoutube } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SocialLinks } from '@/components/SocialLinks'

const ctaClass =
  'inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium transition-colors'

export function ProfileHero({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')
  const { t: tHome } = useTranslation('home')
  const name = tHome(`team.members.${member.slug}.name`)

  return (
    <section className="geo-pattern px-6 md:px-12 pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="print:hidden">
          <Link
            to="/"
            hash="team"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LuArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t('backToTeam')}
          </Link>
        </FadeIn>

        <div className="mt-10 grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
          <FadeIn variant="scaleIn">
            <img
              src={member.image}
              alt={name}
              width={224}
              height={224}
              className="w-40 h-40 md:w-56 md:h-56 rounded-3xl object-cover border border-border shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]"
            />
          </FadeIn>

          <div className="flex flex-col items-start gap-5">
            <FadeIn delay={0.05}>
              <Eyebrow>{t(`${member.slug}.role`)}</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.02]">
                {name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
                {t(`${member.slug}.tagline`)}
              </p>
            </FadeIn>
            <FadeIn
              delay={0.2}
              className="flex flex-wrap items-center gap-3 print:hidden"
            >
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className={`${ctaClass} bg-foreground text-background hover:bg-gold hover:text-ink`}
                >
                  <LuMail className="w-4 h-4" />
                  {t('actions.email')}
                </a>
              )}
              {member.cvUrl && (
                <a
                  href={member.cvUrl}
                  className={`${ctaClass} border border-border bg-card/60 text-foreground hover:border-gold hover:text-gold`}
                >
                  <LuDownload className="w-4 h-4" />
                  {t('actions.downloadCv')}
                </a>
              )}
              {member.socials.youtube && (
                <a
                  href={member.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaClass} border border-border bg-card/60 text-foreground hover:border-gold hover:text-gold`}
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
