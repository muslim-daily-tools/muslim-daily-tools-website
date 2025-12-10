import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" width={70} height={70} alt="Logo" />
    </Link>
  )
}
