import { useState, useEffect } from 'react'
import { Navigation } from './Navigation'
import { Logo } from './Logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        sticky top-0 z-50 w-full px-6 py-4 md:px-12 md:py-4
        backdrop-blur-xl backdrop-saturate-150
        border-b border-white/50 dark:border-white/10
        transition-all duration-300
        ${
          isScrolled
            ? 'bg-white/85 dark:bg-slate-900/90 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-white/70 dark:bg-slate-900/80'
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between md:grid md:grid-cols-5">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
