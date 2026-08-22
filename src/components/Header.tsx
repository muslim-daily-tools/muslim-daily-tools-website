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
        'sticky top-0 z-50 w-full px-6 md:px-12 transition-all duration-300',
        'border-b',
        isScrolled
          ? 'glass-bar border-hairline shadow-[0_18px_40px_-32px_rgba(0,0,0,0.9)]'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="relative max-w-7xl mx-auto h-18 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
