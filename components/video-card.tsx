import Image from "next/image"

interface VideoCardProps {
  image: string
  title: string
  description: string
  delay: number
  className?: string
}

export function VideoCard({ image, title, description, delay, className }: VideoCardProps) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-video w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[#09090b] mb-1 text-base">{title}</h3>
        <p className="text-sm text-[#71717a] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

