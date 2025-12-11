import { Suspense } from 'react'
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
import { isRTL } from '../lib/i18n'
import '../lib/i18n' // Initialize i18n

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        // Inline script to prevent flash of wrong theme
        children: `(function(){var t=localStorage.getItem('theme');var d=t||((window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light');if(d==='dark')document.documentElement.classList.add('dark')})()`,
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Muslim Daily Tools',
      },
    ],
    links: [
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

  return (
    <html lang={i18n.language} dir={dir}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background ambient-glow">
        <Suspense fallback={<div className="min-h-screen" />}>
          <ThemeProvider>
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </ThemeProvider>
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
