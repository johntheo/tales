import Image from "next/image"

interface BookCardProps {
  image: string
  title: string
  author: string
  delay: number
  className?: string
}

export function BookCard({ image, title, author, delay, className }: BookCardProps) {
  return (
    <div className={`flex flex-col items-center animate-fade-in ${className}`} style={{ animationDelay: `${delay}s` }}>
      <div className="relative h-40 w-32 rounded-sm overflow-hidden mb-2 shadow-md">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <h3 className="text-sm font-medium text-center text-[#09090b] max-w-[120px] mt-2">{title}</h3>
      <p className="text-xs text-center text-[#71717a] mt-1">{author}</p>
    </div>
  )
}

