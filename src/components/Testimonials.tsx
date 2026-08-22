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

function StarRating({ rating }: { rating: number }): React.JSX.Element {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <LuStar
          key={star}
          className={`w-3.5 h-3.5 ${
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
        className="w-9 h-9 rounded-full object-cover"
      />
    )
  }

  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-muted type-caption text-foreground">
      {getInitials(name)}
    </div>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}): React.JSX.Element {
  const { t } = useTranslation('home')

  return (
    <figure className="motion-lift flex h-full flex-col gap-4 rounded-2xl bg-background p-6">
      <StarRating rating={testimonial.rating} />

      <blockquote className="type-body flex-grow text-foreground/80 text-pretty">
        {testimonial.quote}
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <Avatar name={testimonial.author} avatar={testimonial.avatar} />
        <span className="flex flex-col">
          <span className="type-caption text-foreground">
            {testimonial.author}
          </span>
          <span className="type-caption font-normal text-muted-foreground">
            {t('testimonials.reviewFor')} {testimonial.tool}
          </span>
        </span>
      </figcaption>
    </figure>
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
      eyebrow={t('testimonials.eyebrow')}
      title={t('testimonials.title')}
    >
      {/* Masonry testimonials grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <StaggerContainer
            key={columnIndex}
            className="flex flex-col gap-5"
            staggerDelay={0.1}
          >
            {column.map((testimonial) => (
              <StaggerItem key={testimonial.author}>
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ))}
      </div>
    </Section>
  )
}
