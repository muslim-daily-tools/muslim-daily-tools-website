import { useState } from 'react'
import {
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

import mohamedImg from '@/assets/mohamed.jpg'
import ahmedImg from '@/assets/ahmed.jpg'

interface TeamMemberData {
  id: string // Key for translations
  image: string
  socials: {
    facebook?: string
    twitter?: string
    youtube?: string
    linkedin?: string
    github?: string
  }
}

const teamData: TeamMemberData[] = [
  {
    id: 'ahmed',
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
    id: 'mohamed',
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

function SocialLinks({ socials }: { socials: TeamMemberData['socials'] }) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      {socials.facebook && (
        <a
          href={socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Facebook"
        >
          <FaFacebook className="w-5 h-5" />
        </a>
      )}
      {socials.twitter && (
        <a
          href={socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Twitter"
        >
          <FaXTwitter className="w-5 h-5" />
        </a>
      )}
      {socials.youtube && (
        <a
          href={socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="YouTube"
        >
          <FaYoutube className="w-5 h-5" />
        </a>
      )}
      {socials.linkedin && (
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
      )}
      {socials.github && (
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </a>
      )}
    </div>
  )
}

function TeamCard({
  member,
  index,
}: {
  member: TeamMemberData
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation('common')
  const { t: tHome } = useTranslation('home')

  // Get translated content
  const name = tHome(`team.members.${member.id}.name`)
  const title = tHome(`team.members.${member.id}.title`)
  const bio = tHome(`team.members.${member.id}.bio`)

  // Get first paragraph for truncated view
  const firstParagraph = bio.split('\n\n')[0]
  const hasMoreContent = bio.includes('\n\n')

  return (
    <div
      className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md hover:border-border/80 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'backwards',
      }}
    >
      {/* Photo */}
      <img
        src={member.image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-2 border-border"
      />

      {/* Name */}
      <h3 className="text-xl font-bold text-foreground text-center">{name}</h3>

      {/* Title */}
      <p className="text-sm text-muted-foreground mt-1 text-center">{title}</p>

      {/* Bio */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {isExpanded ? bio : firstParagraph}
        </p>
        {hasMoreContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-foreground hover:text-foreground/80 mt-3 transition-colors"
          >
            {isExpanded ? t('actions.readLess') : t('actions.readMore')}
          </button>
        )}
      </div>

      {/* Social Links */}
      <SocialLinks socials={member.socials} />
    </div>
  )
}

export function Team() {
  const { t } = useTranslation('home')

  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('team.title')}
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamData.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
