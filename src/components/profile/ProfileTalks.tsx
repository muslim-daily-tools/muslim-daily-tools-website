import { useTranslation } from 'react-i18next'
import { LuPlay, LuYoutube } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { Section } from '@/components/ui/section'

export function ProfileTalks({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')

  return (
    <Section
      align="start"
      eyebrow={t('sections.talks')}
      title={t('sections.talks')}
      className="py-16 md:py-20 print:hidden"
    >
      {member.talks.length === 0 ? (
        <a
          href={member.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="instrument-panel group flex flex-col gap-5 p-6 transition-all duration-300 hover:border-lapis/70 sm:flex-row sm:items-center md:p-8"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-lapis/25 bg-lapis-soft text-lapis">
            <LuYoutube className="w-7 h-7" />
          </span>
          <span className="flex-1 text-lg text-muted-foreground text-pretty">
            {t('talksEmpty')}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-lapis">
            <LuPlay className="w-4 h-4" />
            {t('actions.watchChannel')}
          </span>
        </a>
      ) : (
        <StaggerContainer
          as="div"
          className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {member.talks.map((talk) => {
            const href =
              talk.href ??
              (talk.youtubeId
                ? `https://www.youtube.com/watch?v=${talk.youtubeId}`
                : undefined)
            return (
              <StaggerItem key={talk.titleKey} variant="scaleIn">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instrument-panel group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-lapis/70"
                >
                  {talk.youtubeId && (
                    <img
                      src={`https://img.youtube.com/vi/${talk.youtubeId}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="aspect-video w-full border-b border-border object-cover grayscale-[15%] transition-all group-hover:grayscale-0"
                    />
                  )}
                  <div className="flex flex-col gap-1 p-5">
                    <h3 className="font-semibold text-foreground">
                      {t(talk.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {talk.event}
                      {talk.date && ` · ${talk.date}`}
                    </p>
                  </div>
                </a>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      )}
    </Section>
  )
}
