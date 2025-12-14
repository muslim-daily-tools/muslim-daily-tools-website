import { useTranslation } from 'react-i18next'
import { LuGlobe } from 'react-icons/lu'
import {
  supportedLanguages,
  languageNames,
  type SupportedLanguage,
} from '@/lib/i18n'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const currentIndex = supportedLanguages.indexOf(
      i18n.language as SupportedLanguage,
    )
    const nextIndex = (currentIndex + 1) % supportedLanguages.length
    const nextLang = supportedLanguages[nextIndex]
    i18n.changeLanguage(nextLang)
  }

  const currentLang = (
    supportedLanguages.includes(i18n.language as SupportedLanguage)
      ? i18n.language
      : 'en'
  ) as SupportedLanguage

  const nextLang =
    supportedLanguages[
      (supportedLanguages.indexOf(currentLang) + 1) % supportedLanguages.length
    ]

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Switch to ${languageNames[nextLang]}`}
    >
      <LuGlobe className="w-4 h-4" />
      <span>{languageNames[currentLang]}</span>
    </button>
  )
}
