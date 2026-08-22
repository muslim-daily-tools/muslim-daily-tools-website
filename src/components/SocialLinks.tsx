import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { Socials } from '@/data/team'
import { cn } from '@/lib/utils'

const socialMeta: Array<{ key: keyof Socials; label: string; Icon: IconType }> =
  [
    { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin },
    { key: 'github', label: 'GitHub', Icon: FaGithub },
    { key: 'twitter', label: 'X', Icon: FaXTwitter },
    { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
    { key: 'facebook', label: 'Facebook', Icon: FaFacebook },
  ]

export function SocialLinks({
  socials,
  className,
  size = 'sm',
}: {
  socials: Socials
  className?: string
  size?: 'sm' | 'md'
}): React.JSX.Element {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {socialMeta.map(({ key, label, Icon }) => {
        const href = socials[key]
        if (!href) return null
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-gold transition-colors"
          >
            <Icon className={size === 'md' ? 'w-5 h-5' : 'w-4 h-4'} />
          </a>
        )
      })}
    </div>
  )
}
