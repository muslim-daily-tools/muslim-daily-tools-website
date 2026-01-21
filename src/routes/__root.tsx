import { Suspense, useEffect } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useTranslation } from 'react-i18next'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ThemeProvider } from '../lib/theme'
import { AnimationProvider } from '../lib/animations'
import { PostHogProvider } from '../lib/posthog'
import { isRTL, setSSRLanguage } from '../lib/i18n'
import '../lib/i18n' // Initialize i18n

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  // Set language on server before rendering (reads from cookie)
  beforeLoad: async () => {
    await setSSRLanguage()
  },

  head: () => ({
    scripts: [
      {
        // Inline script to prevent flash of wrong theme
        children: `(function(){var t=localStorage.getItem('theme');var d=t||((window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light');if(d==='dark')document.documentElement.classList.add('dark')})()`,
      },
    ],
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Muslim Daily Tools - Quran & Prayer Tools for Your Daily Worship' },
      {
        name: 'description',
        content:
          "Muslim Daily Tools helps you keep the Qur'an close, your prayers on time, and remembrance in rhythm with fast, minimalist browser extensions and apps.",
      },
      {
        name: 'keywords',
        content:
          'Quran, Muslim, Islam, prayer times, Quran Tab, Quran Station, Islamic tools, browser extension, daily worship, salah, dhikr',
      },
      { name: 'author', content: 'Muslim Daily Tools' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#d7a94f' },
      { name: 'color-scheme', content: 'light dark' },
      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://muslimdailytools.com' },
      {
        property: 'og:title',
        content: 'Muslim Daily Tools - Quran & Prayer Tools for Your Daily Worship',
      },
      {
        property: 'og:description',
        content:
          "Muslim Daily Tools helps you keep the Qur'an close, your prayers on time, and remembrance in rhythm with fast, minimalist browser extensions and apps.",
      },
      { property: 'og:image', content: 'https://muslimdailytools.com/og-image.jpg' },
      { property: 'og:site_name', content: 'Muslim Daily Tools' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:locale:alternate', content: 'ar_AR' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://muslimdailytools.com' },
      {
        name: 'twitter:title',
        content: 'Muslim Daily Tools - Quran & Prayer Tools for Your Daily Worship',
      },
      {
        name: 'twitter:description',
        content:
          "Muslim Daily Tools helps you keep the Qur'an close, your prayers on time, and remembrance in rhythm with fast, minimalist browser extensions and apps.",
      },
      { name: 'twitter:image', content: 'https://muslimdailytools.com/og-image.jpg' },
    ],
    links: [
      // Canonical URL
      { rel: 'canonical', href: 'https://muslimdailytools.com' },
      // Favicon
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', href: '/logo.png', type: 'image/png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/logo.png' },
      // Preconnect to Google Fonts for faster loading
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      // Preload Readex Pro font CSS for faster Arabic font loading
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200..700&display=swap',
        as: 'style',
      },
      // Readex Pro font for Arabic RTL support
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200..700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument() {
  const { i18n } = useTranslation()
  const dir = isRTL(i18n.language) ? 'rtl' : 'ltr'

  // Update dir and lang attributes when language changes on client
  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language, dir])

  return (
    <html lang={i18n.language} dir={dir} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background ambient-glow">
        <Suspense fallback={<div className="min-h-screen" />}>
          <PostHogProvider>
            <AnimationProvider>
              <ThemeProvider>
                <Header />
                <main className="flex-1">
                  <Outlet />
                </main>
                <Footer />
              </ThemeProvider>
            </AnimationProvider>
          </PostHogProvider>
        </Suspense>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
