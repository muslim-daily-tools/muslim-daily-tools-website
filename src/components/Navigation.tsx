export function Navigation() {
  return (
    <>
      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a
          href="#testimonials"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Testimonials
        </a>
        <a
          href="#team"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Team
        </a>
        <a
          href="#tools"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Tools
        </a>
        <a
          href="https://donate.example.com"
          className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Donate
        </a>
      </nav>

      {/* Mobile menu button */}
      <button className="md:hidden p-2 text-foreground" aria-label="Open menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </>
  )
}
