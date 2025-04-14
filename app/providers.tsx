'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog in production
    if (!window.location.host.includes('localhost') && !window.location.host.includes('127.0.0.1')) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false,
        debug: process.env.NODE_ENV === 'development',
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
      })
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

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
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