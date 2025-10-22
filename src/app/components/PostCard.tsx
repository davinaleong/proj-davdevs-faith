import Link from "next/link"
import { Star, Clock, ArrowRight } from "lucide-react"

interface PostCardProps {
  title: string
  slug: string
  description: string
  date: string
  author: string
  tags: string[]
  featured: boolean
  readingTime: number
}

export default function PostCard({
  title,
  slug,
  description,
  date,
  author,
  tags,
  featured,
  readingTime,
}: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/posts/${slug}`} className="group block">
      <article
        className={`
          bg-white rounded-sm shadow-md hover:shadow-lg transition-all duration-300 
          p-6 h-full border-l-4 group-hover:scale-[1.02]
          ${
            featured
              ? "border-l-blue-500 bg-linear-to-r from-blue-50 to-white"
              : "border-l-gray-300"
          }
        `}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span>{formattedDate}</span>
            <span>By {author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Read More Arrow */}
        <div className="flex items-center text-blue-600 mt-4 group-hover:translate-x-1 transition-transform duration-200">
          <span className="text-sm font-medium mr-2">Read more</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </article>
    </Link>
  )
}
