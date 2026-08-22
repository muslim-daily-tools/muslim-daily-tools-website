import { LuStar } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import { StaggerContainer, StaggerItem } from '@/lib/animations'
import { Section } from '@/components/ui/section'

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
}): React.JSX.Element {
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

function Avatar({
  name,
  avatar,
}: {
  name: string
  avatar?: string
}): React.JSX.Element {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-10 w-10 border border-border object-cover"
      />
    )
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center border border-lapis/30 bg-lapis-soft text-sm font-semibold text-lapis">
      {getInitials(name)}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <article className="instrument-panel group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lapis/70">
      <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
        <span className="coordinate-label text-muted-foreground">
          SIGNAL / {String(index + 1).padStart(2, '0')}
        </span>
        <StarRating rating={testimonial.rating} />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Avatar name={testimonial.author} avatar={testimonial.avatar} />
        <span className="text-sm font-semibold text-foreground">
          {testimonial.author}
        </span>
      </div>

      <p className="flex-grow text-sm leading-relaxed text-muted-foreground before:me-1 before:text-xl before:text-copper before:content-['“']">
        {testimonial.quote}
      </p>

      <div className="mt-5 border-t border-border pt-3">
        <span className="coordinate-label text-[0.58rem] text-muted-foreground/70">
          {t('testimonials.reviewFor')}{' '}
          <span className="text-foreground/80">{testimonial.tool}</span>
        </span>
      </div>
    </article>
  )
}

export function Testimonials(): React.JSX.Element {
  const { t } = useTranslation('home')

  // Split testimonials into 3 columns for masonry effect
  const columns: Array<Array<Testimonial>> = [[], [], []]
  testimonials.forEach((testimonial, index) => {
    columns[index % 3].push(testimonial)
  })

  return (
    <Section
      id="testimonials"
      tone="card"
      width="wide"
      align="start"
      eyebrow={t('testimonials.eyebrow')}
      title={t('testimonials.title')}
    >
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        <StaggerContainer className="flex flex-col gap-px" staggerDelay={0.1}>
          {columns[0].map((testimonial, index) => (
            <StaggerItem key={testimonial.author}>
              <TestimonialCard testimonial={testimonial} index={index * 3} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="flex flex-col gap-px" staggerDelay={0.1}>
          {columns[1].map((testimonial, index) => (
            <StaggerItem key={testimonial.author}>
              <TestimonialCard
                testimonial={testimonial}
                index={index * 3 + 1}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="flex flex-col gap-px" staggerDelay={0.1}>
          {columns[2].map((testimonial, index) => (
            <StaggerItem key={testimonial.author}>
              <TestimonialCard
                testimonial={testimonial}
                index={index * 3 + 2}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  )
}
