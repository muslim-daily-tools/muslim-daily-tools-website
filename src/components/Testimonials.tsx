import { LuStar } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'

interface Testimonial {
  quote: string
  author: string
  avatar?: string // URL to avatar image, or undefined for initials
  rating: number // 1-5 star rating
  tool: 'Quran Tab' | 'Quran Station' // Which tool the review is for
}

interface Stat {
  value: string
  labelKey: string
}

const stats: Stat[] = [
  { value: '50,000+', labelKey: 'testimonials.stats.activeUsers' },
  { value: '1M+', labelKey: 'testimonials.stats.listeningSessions' },
  { value: '500K+', labelKey: 'testimonials.stats.downloads' },
  { value: '40+', labelKey: 'testimonials.stats.languages' },
]

const testimonials: Testimonial[] = [
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
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted'
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

function StatCard({ stat }: { stat: Stat }) {
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-col items-center text-center px-4 py-2">
      <span className="text-2xl md:text-3xl font-bold text-foreground">
        {stat.value}
      </span>
      <span className="text-sm text-muted-foreground mt-1">
        {t(stat.labelKey)}
      </span>
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  const { t } = useTranslation('home')

  return (
    <div
      className="group bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md hover:border-border/80 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 flex flex-col"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'backwards',
      }}
    >
      {/* Header: Avatar + Name */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={testimonial.author} avatar={testimonial.avatar} />
        <span className="font-medium text-foreground text-sm">
          {testimonial.author}
        </span>
      </div>

      {/* Star Rating */}
      <div className="mb-3">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
        {testimonial.quote}
      </p>

      {/* Tool badge at bottom */}
      <div className="mt-4 pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground/70">
          {t('testimonials.reviewFor')}{' '}
          <span className="font-medium text-foreground/70">
            {testimonial.tool}
          </span>
        </span>
      </div>
    </div>
  )
}

export function Testimonials() {
  const { t } = useTranslation('home')

  // Split testimonials into 3 columns for masonry effect
  const columns: Testimonial[][] = [[], [], []]
  testimonials.forEach((testimonial, index) => {
    columns[index % 3].push(testimonial)
  })

  return (
    <section id="testimonials" className="bg-card py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.labelKey} className="flex items-center">
              <StatCard stat={stat} />
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-border ms-4" />
              )}
            </div>
          ))}
        </div>

        {/* Masonry testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {columns[0].map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.author}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {columns[1].map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.author}
                testimonial={testimonial}
                index={idx + columns[0].length}
              />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {columns[2].map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.author}
                testimonial={testimonial}
                index={idx + columns[0].length + columns[1].length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
