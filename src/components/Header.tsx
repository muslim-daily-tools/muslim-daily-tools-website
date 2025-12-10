import { Navigation } from './Navigation'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50 w-full px-6 py-4 md:px-12 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
