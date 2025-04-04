import { CategoryIllustration } from "@/components/category-illustrations"

interface FeedbackCategoryProps {
  title: string
  description: string
  image: string
  delay: number
  className?: string
}

export function FeedbackCategory({ title, description, image, delay, className }: FeedbackCategoryProps) {
  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-500 transform animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex flex-col">
        <div className="mb-3">
          <CategoryIllustration category={title} />
        </div>
        <div>
          <h3 className="font-medium text-[#09090b] mb-1 text-base">{title}</h3>
          <p className="text-sm text-[#71717a] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

