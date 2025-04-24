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

  // Feedback Events
  'feedback_viewed': {
    feedback_id: string
    feedback_type: 'portfolio' | 'presentation' | 'case_study'
    feedback_status: string
    time_spent?: number
  }
  
  'feedback_section_expanded': {
    feedback_id: string
    section_name: string
    section_type: 'overview' | 'specific_area' | 'reference'
  }
  
  'feedback_action_taken': {
    feedback_id: string
    action_type: 'export_pdf' | 'schedule_mentoring' | 'share' | 'delete' | 'download_report' | 'consult_expert'
    action_success: boolean
    action_context?: {
      button_location: 'review_page' | 'feedback_list' | 'feedback_detail'
      button_style?: 'primary' | 'secondary'
      time_since_feedback?: number // in minutes
    }
  }
  
  'feedback_review_interaction': {
    feedback_id: string
    interaction_type: 'download_report' | 'consult_expert'
    interaction_context: {
      button_location: 'review_page'
      time_spent_on_page?: number // in seconds
      sections_viewed?: string[] // list of sections user viewed before taking action
      has_viewed_all_sections?: boolean
    }
  }
  
  'feedback_navigated': {
    feedback_id: string
    navigation_type: 'next' | 'previous' | 'specific_section'
    target_section?: string
  }
  
  'feedback_list_interaction': {
    action: 'select' | 'delete' | 'filter' | 'sort'
    feedback_id?: string
    filter_criteria?: string
    sort_criteria?: string
  }
  
  'feedback_generation_started': {
    content_type: 'portfolio' | 'presentation' | 'case_study'
    file_type?: string
    file_size?: number
  }
  
  'feedback_generation_completed': {
    content_type: 'portfolio' | 'presentation' | 'case_study'
    generation_time: number
    feedback_quality_score?: number
  }
  
  'feedback_generation_failed': {
    content_type: 'portfolio' | 'presentation' | 'case_study'
    error_type: string
    error_message: string
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