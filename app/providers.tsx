'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      // Initialize PostHog with custom configuration
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: true,
        debug: false, // Disable debug mode in production
        persistence: 'localStorage',
        autocapture: true,
        capture_pageleave: true,
        capture_performance: true,
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
          maskInputOptions: {
            password: true,
            text: false,
            number: false,
            email: false,
            tel: false,
            url: false,
            search: false,
            color: false,
            date: false,
            'datetime-local': false,
            month: false,
            week: false,
            time: false,
            range: false,
            select: false,
            textarea: false,
          },
        },
        // Add custom request headers to avoid ad blockers
        request_headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        // Use XHR transport
        api_transport: 'XHR',
      })

      // Add error handler for failed requests
      posthog.on('eventCaptured', (event) => {
        if (event.error) {
          console.warn('PostHog event capture error:', event.error)
        }
      })

      console.log('PostHog initialized successfully')
    } catch (error) {
      console.error('Failed to initialize PostHog:', error)
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews with error handling
  useEffect(() => {
    if (pathname && posthog) {
      try {
        let url = window.origin + pathname
        if (searchParams.toString()) {
          url = url + "?" + searchParams.toString();
        }

        posthog.capture('$pageview', { 
          '$current_url': url,
          '$host': window.location.host,
          '$pathname': pathname,
          '$search': searchParams.toString(),
          '$referrer': document.referrer,
          '$title': document.title,
        })
      } catch (error) {
        console.warn('Failed to track pageview:', error)
      }
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
} 