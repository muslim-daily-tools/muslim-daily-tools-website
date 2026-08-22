import { useTranslation } from 'react-i18next'
import { LuArrowUpRight, LuMail } from 'react-icons/lu'
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
    <section className="px-6 pb-20 md:px-12 md:pb-28 print:hidden">
      <FadeIn className="celestial-hero mx-auto grid max-w-5xl border border-white/15 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-start gap-6 p-8 md:p-12">
          <div className="flex w-full items-center justify-between border-b border-white/15 pb-4">
            <Eyebrow className="text-copper before:border-copper">
              {t('sections.contact')}
            </Eyebrow>
            <span className="coordinate-label text-white/35">OPEN CHANNEL</span>
          </div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-balance text-white md:text-5xl rtl:leading-[1.35]">
            {t('contact.title')}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-white/65">
            {t('contact.description')}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex h-11 items-center gap-2 bg-copper px-5 text-sm font-semibold text-[#102044] transition-colors hover:bg-white"
              >
                <LuMail className="h-4 w-4" />
                {t('actions.email')}
                <LuArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </a>
            )}
            <div className="[&_a]:text-white/55 [&_a:hover]:text-copper">
              <SocialLinks socials={member.socials} size="md" />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="hidden min-h-72 w-40 border-s border-white/15 bg-[radial-gradient(circle_at_center,rgba(217,154,84,0.5)_1px,transparent_1.5px)] bg-[size:24px_24px] md:block"
        />
      </FadeIn>
    </section>
  )
}
