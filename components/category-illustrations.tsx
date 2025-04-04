interface CategoryIllustrationProps {
  category: string
}

export function CategoryIllustration({ category }: CategoryIllustrationProps) {
  switch (category) {
    case "Visual Consistency":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path
            d="M32.5 82.5C32.5 82.5 32.5 67.5 32.5 67.5C32.5 67.5 37.5 67.5 37.5 67.5C37.5 67.5 37.5 82.5 37.5 82.5C37.5 82.5 32.5 82.5 32.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M42.5 82.5C42.5 82.5 42.5 57.5 42.5 57.5C42.5 57.5 47.5 57.5 47.5 57.5C47.5 57.5 47.5 82.5 47.5 82.5C47.5 82.5 42.5 82.5 42.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M52.5 82.5C52.5 82.5 52.5 47.5 52.5 47.5C52.5 47.5 57.5 47.5 57.5 47.5C57.5 47.5 57.5 82.5 57.5 82.5C57.5 82.5 52.5 82.5 52.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M62.5 82.5C62.5 82.5 62.5 37.5 62.5 37.5C62.5 37.5 67.5 37.5 67.5 37.5C67.5 37.5 67.5 82.5 67.5 82.5C67.5 82.5 62.5 82.5 62.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M30 17.5C30 17.5 30 17.5 30 17.5C30 17.5 70 17.5 70 17.5C70 17.5 70 17.5 70 17.5"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M35 25C35 25 35 25 35 25C35 25 65 25 65 25C65 25 65 25 65 25"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M40 32.5C40 32.5 40 32.5 40 32.5C40 32.5 60 32.5 60 32.5C60 32.5 60 32.5 60 32.5"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="35" stroke="#111827" strokeWidth="1.5" />
          <path
            d="M32.5 82.5C32.5 82.5 32.5 67.5 32.5 67.5C32.5 67.5 37.5 67.5 37.5 67.5C37.5 67.5 37.5 82.5 37.5 82.5C37.5 82.5 32.5 82.5 32.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M42.5 82.5C42.5 82.5 42.5 57.5 42.5 57.5C42.5 57.5 47.5 57.5 47.5 57.5C47.5 57.5 47.5 82.5 47.5 82.5C47.5 82.5 42.5 82.5 42.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M52.5 82.5C52.5 82.5 52.5 47.5 52.5 47.5C52.5 47.5 57.5 47.5 57.5 47.5C57.5 47.5 57.5 82.5 57.5 82.5C57.5 82.5 52.5 82.5 52.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M62.5 82.5C62.5 82.5 62.5 37.5 62.5 37.5C62.5 37.5 67.5 37.5 67.5 37.5C67.5 37.5 67.5 82.5 67.5 82.5C67.5 82.5 62.5 82.5 62.5 82.5Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
        </svg>
      )
    case "Content Clarity":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path d="M30 30H70V40H30V30Z" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <path d="M30 45H70V55H30V45Z" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <path d="M30 60H70V70H30V60Z" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <path d="M35 35H65" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 50H65" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 65H55" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Storytelling":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path
            d="M30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70C38.9543 70 30 61.0457 30 50Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path d="M50 40V50L60 60" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "Data Visualization":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path
            d="M30 70L45 55L55 65L70 50"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M60 50H70V60" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 30V70H70" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "Engagement":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path
            d="M35 50C35 41.7157 41.7157 35 50 35C58.2843 35 65 41.7157 65 50C65 58.2843 58.2843 65 50 65C41.7157 65 35 58.2843 35 50Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M42.5 42.5C42.5 42.5 42.5 42.5 42.5 42.5C42.5 42.5 57.5 57.5 57.5 57.5C57.5 57.5 57.5 57.5 57.5 57.5"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M57.5 42.5C57.5 42.5 57.5 42.5 57.5 42.5C57.5 42.5 42.5 57.5 42.5 57.5C42.5 57.5 42.5 57.5 42.5 57.5"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    case "Tone & Language":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path d="M30 35H70" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 50H70" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 65H50" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Structure & Flow":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <rect x="30" y="30" width="15" height="15" rx="2" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <rect x="55" y="30" width="15" height="15" rx="2" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <rect x="30" y="55" width="15" height="15" rx="2" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <rect x="55" y="55" width="15" height="15" rx="2" fill="#F3F4F6" stroke="#111827" strokeWidth="1.5" />
          <path d="M45 37.5H55" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M37.5 45V55" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M55 62.5H45" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M62.5 55V45" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Accessibility":
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="white" />
          <path
            d="M50 35C52.7614 35 55 32.7614 55 30C55 27.2386 52.7614 25 50 25C47.2386 25 45 27.2386 45 30C45 32.7614 47.2386 35 50 35Z"
            fill="#F3F4F6"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path
            d="M40 65C40 57.268 44.4772 51 50 51C55.5228 51 60 57.268 60 65"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M50 50V75" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 55L60 55" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="4" fill="#F3F4F6" />
          <path d="M50 50H50.01" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
  }
}

