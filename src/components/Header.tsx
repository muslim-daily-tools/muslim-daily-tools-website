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
        'sticky top-0 z-50 w-full px-6 md:px-10',
        'backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300',
        'border-b border-border',
        isScrolled ? 'bg-background/80' : 'bg-background/60',
      )}
    >
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
