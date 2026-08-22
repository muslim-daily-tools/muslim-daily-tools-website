import { useTranslation } from 'react-i18next'
import { LuMail } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SectionDivider } from '@/components/ui/ornament'
import { SocialLinks } from '@/components/SocialLinks'

export function ProfileContact({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')

  return (
    <section className="px-6 md:px-12 pb-20 md:pb-28 print:hidden">
      <SectionDivider className="mb-16 md:mb-20" />
      <FadeIn className="max-w-5xl mx-auto rounded-[2.5rem] border border-gold/30 bg-gradient-to-br from-emerald-soft via-card to-gold-soft/60 shadow-soft-lg p-8 md:p-14 flex flex-col items-start gap-6">
        <Eyebrow>{t('sections.contact')}</Eyebrow>
        <h2 className="font-display text-[2.5rem] md:text-6xl font-semibold text-foreground leading-[1.08] text-balance">
          {t('contact.title')}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
          {t('contact.description')}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-soft transition-colors hover:bg-gold hover:text-ink"
            >
              <LuMail className="w-4 h-4" />
              {t('actions.email')}
            </a>
          )}
          <SocialLinks socials={member.socials} size="md" />
        </div>
      </FadeIn>
    </section>
  )
}
