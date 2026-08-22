import { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

export function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full px-6 md:px-12',
        'backdrop-blur-xl backdrop-saturate-150 transition-all duration-300',
        'border-b',
        isScrolled
          ? 'bg-background/90 border-gold/30 shadow-soft'
          : 'bg-background/60 border-transparent',
      )}
    >
      <div className="relative max-w-7xl mx-auto h-[4.5rem] flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
