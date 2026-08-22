import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuArrowLeft } from 'react-icons/lu'

import { getTeamMember } from '@/data/team'
import i18n from '@/lib/i18n'
import { ProfileHero } from '@/components/profile/ProfileHero'
import { ProfileBio } from '@/components/profile/ProfileBio'
import { ProfileProjects } from '@/components/profile/ProfileProjects'
import { ProfileExperience } from '@/components/profile/ProfileExperience'
import { ProfileTalks } from '@/components/profile/ProfileTalks'
import { ProfileContact } from '@/components/profile/ProfileContact'

const siteUrl = 'https://muslimdailytools.com'

export const Route = createFileRoute('/team/$slug')({
  loader: ({ params }) => {
    const member = getTeamMember(params.slug)
    if (!member) throw notFound()
    return { member }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { member } = loaderData
    const name = i18n.t(`team.members.${member.slug}.name`, { ns: 'home' })
    const title = i18n.t(`team.members.${member.slug}.title`, { ns: 'home' })
    const summary = i18n.t(`team.members.${member.slug}.summary`, {
      ns: 'home',
    })
    const url = `${siteUrl}/team/${member.slug}`
    const pageTitle = `${name} — ${title.split(' | ')[0]}`
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      jobTitle: title,
      description: summary,
      url,
      image: `${siteUrl}${member.image}`,
      sameAs: Object.values(member.socials),
    }

    return {
      meta: [
        { title: pageTitle },
        { name: 'description', content: summary },
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: summary },
        { property: 'og:url', content: url },
        { property: 'og:image', content: `${siteUrl}${member.image}` },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: summary },
        { name: 'twitter:image', content: `${siteUrl}${member.image}` },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(person),
        },
      ],
    }
  },
  notFoundComponent: ProfileNotFound,
  component: ProfilePage,
})

function ProfileNotFound(): React.JSX.Element {
  const { t } = useTranslation('profile')
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-4xl text-foreground">404</h1>
      <Link
        to="/"
        hash="team"
        className="inline-flex items-center gap-2 text-sm font-medium text-gold"
      >
        <LuArrowLeft className="w-4 h-4 rtl:rotate-180" />
        {t('backToTeam')}
      </Link>
    </div>
  )
}

function ProfilePage(): React.JSX.Element {
  const { member } = Route.useLoaderData()

  return (
    <article className="profile-page">
      <ProfileHero member={member} />
      <ProfileBio member={member} />
      <ProfileProjects member={member} />
      <ProfileExperience member={member} />
      <ProfileTalks member={member} />
      <ProfileContact member={member} />
    </article>
  )
}
