import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="w-full py-4 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
