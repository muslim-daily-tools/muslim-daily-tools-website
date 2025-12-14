import { LuMoon, LuSun } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch - render placeholder during SSR
  if (!mounted) {
    return (
      <button
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        <LuMoon className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
    >
      {theme === 'light' ? (
        <LuMoon className="w-5 h-5" />
      ) : (
        <LuSun className="w-5 h-5" />
      )}
    </button>
  )
}
