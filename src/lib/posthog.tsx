import { useEffect, type ReactNode } from 'react'
import posthog from 'posthog-js'

// PostHog configuration
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

interface PostHogProviderProps {
  children: ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Only initialize PostHog on client-side and if API key is provided
    if (typeof window !== 'undefined' && POSTHOG_KEY) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only', // Only create profiles for identified users
        capture_pageview: true, // Automatically capture pageviews
        capture_pageleave: true, // Track when users leave pages
        autocapture: false, // Disable automatic element click capture (we'll track manually)
        loaded: (posthog) => {
          if (import.meta.env.DEV) {
            console.log('PostHog initialized')
          }
        },
      })
    }

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && POSTHOG_KEY) {
        posthog.reset()
      }
    }
  }, [])

  return <>{children}</>
}

// Export posthog instance for use in components
export { posthog }
