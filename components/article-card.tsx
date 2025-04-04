import Image from "next/image"

interface ArticleCardProps {
  image?: string
  title: string
  description: string
  delay: number
  className?: string
}

export function ArticleCard({ image, title, description, delay, className }: ArticleCardProps) {
  return (
    <div className={`flex gap-4 items-start animate-fade-in ${className}`} style={{ animationDelay: `${delay}s` }}>
      {image && (
        <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}
      <div>
        <h3 className="font-medium text-[#09090b] mb-1 text-base">{title}</h3>
        <p className="text-sm text-[#71717a] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

