import type { ToolSlug } from './tools'
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

export interface ExternalProject {
  name: string
  href: string
  /** i18n key in the `profile` namespace */
  descriptionKey: string
  roleKey: string
}

export interface Experience {
  company: string
  href?: string
  /** i18n key in the `profile` namespace */
  roleKey: string
  /** Free text such as "2022 — now". Hidden when missing. */
  period?: string
}

export interface Talk {
  /** i18n key in the `profile` namespace */
  titleKey: string
  event: string
  date?: string
  href?: string
  youtubeId?: string
}

export interface TeamMember {
  slug: TeamSlug
  image: string
  socials: Socials
  email?: string
  cvUrl?: string
  /** MDT tools this person built or co-built, in display order */
  toolSlugs: Array<ToolSlug>
  projects: Array<ExternalProject>
  experience: Array<Experience>
  talks: Array<Talk>
}

const youtubeChannel = 'https://www.youtube.com/@FathyAndAbusrea'

export const teamMembers: Array<TeamMember> = [
  {
    slug: 'ahmed',
    image: ahmedImg,
    socials: {
      facebook: 'https://www.facebook.com/ahmedfathykhalid',
      twitter: 'https://x.com/afathykhalid',
      youtube: youtubeChannel,
      linkedin: 'https://www.linkedin.com/in/ahmedfathykhalid/',
      github: 'https://github.com/afkhalid',
    },
    toolSlugs: ['quran-station', 'pray-on-time', 'nawaya'],
    projects: [
      {
        name: 'Almdrasa',
        href: 'https://almdrasa.com',
        descriptionKey: 'projects.almdrasa',
        roleKey: 'roles.founder',
      },
      {
        name: 'HaramBlur',
        href: 'https://haramblur.com',
        descriptionKey: 'projects.haramblur',
        roleKey: 'roles.cgo',
      },
    ],
    experience: [
      { company: 'Yassir', roleKey: 'ahmed.jobs.yassir' },
      { company: 'Fivos Health', roleKey: 'ahmed.jobs.fivos' },
      { company: 'Crossover', roleKey: 'ahmed.jobs.crossover' },
      { company: 'QbDVision', roleKey: 'ahmed.jobs.qbdvision' },
    ],
    talks: [],
  },
  {
    slug: 'mohamed',
    image: mohamedImg,
    socials: {
      facebook: 'https://www.facebook.com/m.abusre3',
      twitter: 'https://x.com/mohamed_abusrea',
      youtube: youtubeChannel,
      linkedin: 'https://www.linkedin.com/in/mohamedabusrea/',
      github: 'https://github.com/mohamedabusrea',
    },
    toolSlugs: ['quran-tab', 'quran-station', 'ayah-flow'],
    projects: [
      {
        name: 'Almdrasa',
        href: 'https://almdrasa.com',
        descriptionKey: 'projects.almdrasa',
        roleKey: 'roles.coFounder',
      },
    ],
    experience: [
      { company: 'Yassir', roleKey: 'mohamed.jobs.yassir' },
      { company: 'QbDVision', roleKey: 'mohamed.jobs.qbdvision' },
      { company: 'Nord Security', roleKey: 'mohamed.jobs.nord' },
      {
        company: 'Delivery Hero',
        roleKey: 'mohamed.jobs.deliveryHero',
      },
      { company: 'Landmark Group', roleKey: 'mohamed.jobs.landmark' },
    ],
    talks: [],
  },
]

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug)
}
