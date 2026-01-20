import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="w-full py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Resources Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link
            to="/mind-maps"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.mindMaps')}
          </Link>
          <Link
            to="/resources"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.resources')}
          </Link>
          <Link
            to="/changelog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.changelog')}
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
