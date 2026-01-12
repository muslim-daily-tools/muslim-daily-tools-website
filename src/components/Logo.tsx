import { Link } from '@tanstack/react-router'
import { useTheme } from '@/lib/theme'

export function Logo() {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'

  return (
    <Link to="/">
      <img src={logoSrc} width={120} height={120} alt="Logo" />
    </Link>
  )
}
