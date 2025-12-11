import { useState } from 'react'
import { Facebook, Twitter, Youtube, Github, Linkedin } from 'lucide-react'

import mohamedImg from '@/assets/mohamed.jpg'
import ahmedImg from '@/assets/ahmed.jpg'

interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
  socials: {
    facebook?: string
    twitter?: string
    youtube?: string
    linkedin?: string
    github?: string
  }
}

const team: TeamMember[] = [
  {
    name: 'Ahmed Fathy',
    title:
      'Senior Engineering Manager at Yassir | Founder of Almdrasa | CGO of HaramBlur',
    bio: "Ahmed Fathy is a seasoned technology leader and entrepreneur with over 18 years of experience building products, leading engineering teams, and scaling businesses. He has founded and co-founded 8 startups, including Almdrasa, an EdTech platform empowering learners across the Arab world, and currently serves as Chief Growth Officer at HaramBlur, an innovative tool protecting Muslims' digital experience.\n\nAlongside his entrepreneurial journey, Ahmed has held senior roles at global companies such as Yassir, Fivos Health, Crossover, and QbDVision, where he led high-performing teams and delivered mission-critical software at scale. His expertise spans engineering management, product strategy, and growth, with a track record of bridging business vision with technical execution.\n\nDriven by a passion for impact, innovation, and Islamic values, Ahmed continues to build tools and platforms that serve communities and shape the future of technology.",
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
    name: 'Mohamed Abusrea',
    title: 'Staff Frontend Engineer | Founder of Quran Tab & Quran Station',
    bio: 'Mohamed Abusrea is a Staff Frontend Engineer and entrepreneur with over 10 years of experience building scalable, user-focused web applications and digital products. He is the creator of Quran Tab and Quran Station, two widely adopted tools that help millions of Muslims stay connected to the Quran in their daily lives.\n\nOver the past decade, Mohamed has contributed to global companies such as Yassir, QbDVision, Nord Security, Delivery Hero, and Landmark Group, where he specialized in frontend architecture, performance optimization, and building seamless user experiences at scale.\n\nPassionate about the intersection of faith and technology, Mohamed continues to pioneer products that combine modern design, accessibility, and spiritual purpose, making Islamic tools available and delightful for users worldwide.',
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

function SocialLinks({ socials }: { socials: TeamMember['socials'] }) {
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
          <Facebook className="w-5 h-5" />
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
          <Twitter className="w-5 h-5" />
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
          <Youtube className="w-5 h-5" />
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
          <Linkedin className="w-5 h-5" />
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
          <Github className="w-5 h-5" />
        </a>
      )}
    </div>
  )
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Get first paragraph for truncated view
  const firstParagraph = member.bio.split('\n\n')[0]
  const hasMoreContent = member.bio.includes('\n\n')

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
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-2 border-border"
      />

      {/* Name */}
      <h3 className="text-xl font-bold text-foreground text-center">
        {member.name}
      </h3>

      {/* Title */}
      <p className="text-sm text-muted-foreground mt-1 text-center">
        {member.title}
      </p>

      {/* Bio */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {isExpanded ? member.bio : firstParagraph}
        </p>
        {hasMoreContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-foreground hover:text-foreground/80 mt-3 transition-colors"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Social Links */}
      <SocialLinks socials={member.socials} />
    </div>
  )
}

export function Team() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Team
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
