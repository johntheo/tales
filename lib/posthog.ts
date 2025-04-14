import posthog from 'posthog-js'

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  })
}

// Event Types
export type PostHogEvent = {
  // User Events
  'user_signed_up': {
    method: 'email' | 'google' | 'github'
  }
  'user_logged_in': {
    method: 'email' | 'google' | 'github'
  }
  'user_logged_out': {}
  
  // Portfolio Events
  'portfolio_upload_started': {
    type: 'file' | 'link'
    file_type?: string
    file_size?: number
  }
  'portfolio_upload_completed': {
    type: 'file' | 'link'
    file_type?: string
    file_size?: number
  }
  'portfolio_upload_failed': {
    type: 'file' | 'link'
    error: string
  }
  
  // Navigation Events
  'page_view': {
    page_name: string
    referrer?: string
  }
  
  // Feature Usage
  'feature_used': {
    feature_name: string
    action: string
    reference_title?: string
    feedback_id?: string
    feedback_status?: string
    cta_type?: 'button' | 'link' | 'form'
  }
  
  // Session Events
  'session_started': {}
  'session_ended': {
    duration: number
  }
  
  // Error Events
  'error_occurred': {
    error_type: string
    error_message: string
    page: string
  }
}

// Helper function to track events with type safety
export const trackEvent = <T extends keyof PostHogEvent>(
  event: T,
  properties?: PostHogEvent[T]
) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

// Helper function to identify users
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, traits)
  }
}

// Helper function to reset user identification
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset()
  }
}

export default posthog 