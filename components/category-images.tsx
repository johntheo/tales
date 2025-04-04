interface CategoryImageProps {
  category: string
}

export function CategoryImage({ category }: CategoryImageProps) {
  // Return the appropriate SVG based on the category
  switch (category) {
    case "Visual Consistency":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <path d="M32 16V48" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 24V40" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 24V40" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 28V36" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M48 28V36" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Content Clarity":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <rect x="16" y="16" width="32" height="8" rx="2" stroke="#111827" strokeWidth="1.5" />
          <rect x="16" y="28" width="32" height="8" rx="2" stroke="#111827" strokeWidth="1.5" />
          <rect x="16" y="40" width="32" height="8" rx="2" stroke="#111827" strokeWidth="1.5" />
        </svg>
      )
    case "Storytelling":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <path
            d="M16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32C48 40.8366 40.8366 48 32 48C23.1634 48 16 40.8366 16 32Z"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path d="M32 24V32L38 38" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "Data Visualization":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <path
            d="M16 40L28 28L36 36L48 24"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M40 24H48V32" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 48H48" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Engagement":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <circle cx="32" cy="32" r="16" stroke="#111827" strokeWidth="1.5" />
          <path d="M32 24V32L38 36" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "Tone & Language":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <path d="M16 24H48" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 32H48" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 40H32" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Structure & Flow":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <rect x="16" y="16" width="12" height="12" rx="2" stroke="#111827" strokeWidth="1.5" />
          <rect x="36" y="16" width="12" height="12" rx="2" stroke="#111827" strokeWidth="1.5" />
          <rect x="16" y="36" width="12" height="12" rx="2" stroke="#111827" strokeWidth="1.5" />
          <rect x="36" y="36" width="12" height="12" rx="2" stroke="#111827" strokeWidth="1.5" />
          <path d="M28 22H36" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 28V36" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M36 42H28" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M42 36V28" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Accessibility":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="4" fill="#F9FAFB" />
          <circle cx="32" cy="22" r="6" stroke="#111827" strokeWidth="1.5" />
          <path
            d="M22 42C22 36.4772 26.4772 32 32 32C37.5228 32 42 36.4772 42 42"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M32 32V48" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
          <span className="text-gray-400">?</span>
        </div>
      )
  }
}

