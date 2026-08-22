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
        'sticky top-0 z-50 w-full border-b border-t-2 border-t-lapis px-6 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 md:px-12',
        isScrolled
          ? 'border-border bg-background/92 shadow-[0_12px_32px_-24px_rgba(15,35,75,0.65)]'
          : 'border-border/60 bg-background/78',
      )}
    >
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
