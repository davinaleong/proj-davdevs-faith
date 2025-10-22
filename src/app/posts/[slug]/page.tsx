import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "../../lib"
import HomeButton from "../../components/HomeButton"
import { Star, Calendar, User, Clock } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <HomeButton />
      </div>

      <article className="prose prose-lg max-w-none flow">
        {/* Post Header */}
        <header className="flow">
          {post.featured && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Star className="w-4 h-4 mr-1" />
              Featured Post
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-900">{post.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By {post.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // Custom components for better styling
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => (
                <code
                  className={`${
                    className || ""
                  } bg-gray-100 px-1 py-0.5 rounded text-sm`}
                  {...props}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  )
}
