import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuArrowLeft, LuDownload, LuMail, LuYoutube } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SocialLinks } from '@/components/SocialLinks'

const ctaClass =
  'inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold transition-colors'

export function ProfileHero({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')
  const { t: tHome } = useTranslation('home')
  const name = tHome(`team.members.${member.slug}.name`)

  return (
    <section className="celestial-hero px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="flex items-center justify-between border-b border-white/15 pb-4 print:hidden">
          <Link
            to="/"
            hash="team"
            className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
          >
            <LuArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t('backToTeam')}
          </Link>
          <span className="coordinate-label hidden text-white/35 sm:inline">
            PERSONNEL RECORD / {member.slug.toUpperCase()}
          </span>
        </FadeIn>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[minmax(14rem,0.7fr)_1.3fr] md:items-center lg:gap-20">
          <FadeIn variant="scaleIn" className="relative max-w-sm">
            <div className="absolute -start-3 -top-3 h-12 w-12 border-s border-t border-copper" />
            <div className="absolute -bottom-3 -end-3 h-12 w-12 border-b border-e border-copper" />
            <img
              src={member.image}
              alt={name}
              width={480}
              height={560}
              className="aspect-[4/5] w-full border border-white/20 object-cover object-top grayscale-[12%] shadow-[0_30px_70px_-35px_rgba(0,0,0,0.8)]"
            />
            <span className="coordinate-label absolute bottom-4 start-4 bg-[#102044]/85 px-2 py-1.5 text-white/65">
              MDT / TEAM
            </span>
          </FadeIn>

          <div className="flex flex-col items-start gap-6">
            <FadeIn delay={0.05}>
              <Eyebrow className="text-copper before:border-copper">
                {t(`${member.slug}.role`)}
              </Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-8xl rtl:leading-[1.35]">
                {name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-2xl border-s border-white/25 ps-5 text-xl leading-relaxed text-pretty text-white/68">
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
                  className={`${ctaClass} bg-copper text-[#102044] hover:bg-white`}
                >
                  <LuMail className="h-4 w-4" />
                  {t('actions.email')}
                </a>
              )}
              {member.cvUrl && (
                <a
                  href={member.cvUrl}
                  className={`${ctaClass} border border-white/25 text-white hover:border-white hover:bg-white/10`}
                >
                  <LuDownload className="h-4 w-4" />
                  {t('actions.downloadCv')}
                </a>
              )}
              {member.socials.youtube && (
                <a
                  href={member.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaClass} border border-white/25 text-white hover:border-white hover:bg-white/10`}
                >
                  <LuYoutube className="h-4 w-4" />
                  {t('actions.watchChannel')}
                </a>
              )}
            </FadeIn>
            <FadeIn
              delay={0.25}
              className="[&_a]:text-white/55 [&_a:hover]:text-copper"
            >
              <SocialLinks socials={member.socials} size="md" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
