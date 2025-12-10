export function Footer() {
  return (
    <footer className="w-full py-4 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Muslim Daily Tools
        </p>
      </div>
    </footer>
  )
}
