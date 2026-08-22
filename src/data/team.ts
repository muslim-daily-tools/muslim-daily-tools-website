import ahmedImg from '@/assets/ahmed.jpg'
import mohamedImg from '@/assets/mohamed.jpg'

export type TeamSlug = 'mohamed' | 'ahmed'

export interface Socials {
  facebook?: string
  twitter?: string
  youtube?: string
  linkedin?: string
  github?: string
}

export interface TeamMember {
  slug: TeamSlug
  image: string
  socials: Socials
}

export const teamMembers: Array<TeamMember> = [
  {
    slug: 'ahmed',
    image: ahmedImg,
    socials: {
      facebook: 'https://www.facebook.com/ahmedfathykhalid',
      twitter: 'https://x.com/afathykhalid',
      youtube: 'https://www.youtube.com/@FathyAndAbusrea',
      linkedin: 'https://www.linkedin.com/in/ahmedfathykhalid/',
      github: 'https://github.com/afkhalid',
    },
  },
  {
    slug: 'mohamed',
    image: mohamedImg,
    socials: {
      facebook: 'https://www.facebook.com/m.abusre3',
      twitter: 'https://x.com/mohamed_abusrea',
      youtube: 'https://www.youtube.com/@FathyAndAbusrea',
      linkedin: 'https://www.linkedin.com/in/mohamedabusrea/',
      github: 'https://github.com/mohamedabusrea',
    },
  },
]

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug)
}
