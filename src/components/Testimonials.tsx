import { LuStar } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import type { CSSProperties } from 'react'
import { FadeIn } from '@/lib/animations'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  author: string
  avatar?: string // URL to avatar image, or undefined for initials
  rating: number // 1-5 star rating
  tool: 'Quran Tab' | 'Quran Station' // Which tool the review is for
}

const testimonials: Array<Testimonial> = [
  {
    quote:
      'The Quran Tab extension is truly a gem! 🌟 Every time I open a new tab, I’m greeted with beautiful Quranic verses that instantly uplift my mood and remind me of my purpose. The interface is clean, simple, and elegant, no distractions, just the words of Allah. What I love most is how customizable it is: you can choose translations, adjust settings to your preference, and it fits seamlessly into daily browsing. It’s not just an extension, it’s a spiritual companion that keeps you connected to the Quran throughout your day. Highly recommended!!',
    author: 'Amr Saeed',
    rating: 5,
    tool: 'Quran Tab',
  },
  {
    quote:
      'I have never installed any browser on any system without installing this extension, my thanks to the developer <3',
    author: 'Ebrahim',
    rating: 5,
    tool: 'Quran Station',
  },
  {
    quote:
      "I'd like just to Thank you about this great extension, that makes us always connected to the Quran and Almighty ALLAH.",
    author: 'Hamza Hmem',
    rating: 5,
    tool: 'Quran Tab',
  },
  {
    quote:
      "This extension is wonderful! It is currently helping me with the Qur'an. Overall, great extension for Muslims who want a Qur'an app on PC.",
    author: 'Fahim Islam',
    rating: 5,
    tool: 'Quran Tab',
  },
  {
    quote: "It's a great extension to enhance the spiritual journey",
    author: 'Osama Ali',
    rating: 5,
    tool: 'Quran Station',
  },

  {
    quote:
      'Great extension . I recommended to everyone. Big thanks for the developer.Keep going brother. Proud of you.',
    author: 'Anas Hidaoui',
    rating: 5,
    tool: 'Quran Station',
  },
  {
    quote:
      'Thanks for such a great extension. May Allah reward you for every word we listen to!',
    author: 'Aya',
    rating: 5,
    tool: 'Quran Station',
  },
  {
    quote: 'Best extension i ever downloaded!',
    author: 'Shehab Ahmed',
    rating: 5,
    tool: 'Quran Tab',
  },
  {
    quote:
      'An amazing and useful tab for everyone uses the computer for long time everyday.',
    author: 'Mahmud Mardini',
    rating: 5,
    tool: 'Quran Tab',
  },
]

function StarRating({
  rating,
  size = 'sm',
}: {
  rating: number
  size?: 'sm' | 'md'
}) {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <LuStar
          key={star}
          className={`${sizeClass} ${
            star <= rating ? 'fill-gold text-gold' : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
    )
  }

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${getAvatarColor(name)}`}
    >
      {getInitials(name)}
    </div>
  )
}

const toolAccents: Record<Testimonial['tool'], string> = {
  'Quran Station': 'oklch(0.72 0.13 185)',
  'Quran Tab': 'oklch(0.66 0.16 255)',
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <figure
      style={
        { '--tool-accent': toolAccents[testimonial.tool] } as CSSProperties
      }
      className="accent-card glass-surface flex h-full w-[19rem] md:w-[23rem] shrink-0 flex-col gap-4 rounded-[1.5rem] p-6"
    >
      <div className="flex items-center gap-3">
        <Avatar name={testimonial.author} avatar={testimonial.avatar} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-foreground">
            {testimonial.author}
          </figcaption>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      <blockquote className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
        {testimonial.quote}
      </blockquote>

      <div className="mt-auto flex items-center gap-2 pt-2">
        <span className="text-[0.7rem] text-muted-foreground/70">
          {t('testimonials.reviewFor')}
        </span>
        <span className="accent-badge inline-flex items-center h-6 px-2.5 rounded-full text-[0.7rem] font-semibold">
          {testimonial.tool}
        </span>
      </div>
    </figure>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: Array<Testimonial>
  reverse?: boolean
  duration: number
}): React.JSX.Element {
  return (
    <div className="marquee overflow-hidden">
      <div
        className={cn(
          'marquee-track gap-4 py-2',
          reverse && 'marquee-track-reverse',
        )}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-4 pe-4"
            aria-hidden={copy === 1 || undefined}
          >
            {items.map((testimonial) => (
              <TestimonialCard
                key={`${copy}-${testimonial.author}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials(): React.JSX.Element {
  const { t } = useTranslation('home')
  const half = Math.ceil(testimonials.length / 2)
  const topRow = testimonials.slice(0, half)
  const bottomRow = testimonials.slice(half)

  return (
    <Section
      id="testimonials"
      width="wide"
      eyebrow={t('testimonials.eyebrow')}
      title={t('testimonials.title')}
      description={t('testimonials.subtitle')}
      className="relative overflow-hidden"
    >
      <FadeIn className="flex flex-col gap-4 -mx-6 md:-mx-12">
        <MarqueeRow items={topRow} duration={72} />
        <MarqueeRow items={bottomRow} duration={88} reverse />
      </FadeIn>
    </Section>
  )
}
