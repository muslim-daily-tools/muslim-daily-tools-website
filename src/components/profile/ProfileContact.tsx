import { useTranslation } from 'react-i18next'
import { LuMail } from 'react-icons/lu'
import type { TeamMember } from '@/data/team'
import { FadeIn } from '@/lib/animations'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SocialLinks } from '@/components/SocialLinks'

export function ProfileContact({
  member,
}: {
  member: TeamMember
}): React.JSX.Element {
  const { t } = useTranslation('profile')

  return (
    <section className="px-6 md:px-10 pb-24 md:pb-36 print:hidden">
      <FadeIn className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-[1.75rem] bg-card p-8 md:p-16">
        <Eyebrow>{t('sections.contact')}</Eyebrow>
        <h2 className="type-headline text-foreground text-balance">
          {t('contact.title')}
        </h2>
        <p className="type-body max-w-xl text-muted-foreground text-pretty">
          {t('contact.description')}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-[0.9375rem] font-medium text-background transition-opacity hover:opacity-85"
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
