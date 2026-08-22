import { Link } from '@tanstack/react-router'
import { useTheme } from '@/lib/theme'

export function Logo(): React.JSX.Element {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'

  return (
    <Link to="/" className="flex items-center" aria-label="Muslim Daily Tools">
      <img
        src={logoSrc}
        width={96}
        height={96}
        alt=""
        className="h-11 w-auto"
      />
    </Link>
  )
}
