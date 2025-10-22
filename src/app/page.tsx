import { getFeaturedPosts, getLatestPosts } from "./lib/posts"
import PostCard from "./components/PostCard"
import { FileText } from "lucide-react"

export default function Home() {
  const featuredPosts = getFeaturedPosts()
  const latestPosts = getLatestPosts(3, true) // Get 3 latest posts, excluding featured

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-black mb-6">
          Dav/Devs Faith
        </h1>
        <p className="max-w-3xl mx-auto leading-relaxed">
          A faith-based platform exploring the intersection of technology and
          spirituality. Join me on this journey of discovering God&apos;s
          presence in our digital age.
        </p>
      </div>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Posts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most inspiring and impactful articles about faith,
              technology, and spiritual growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                description={post.description}
                date={post.date}
                author={post.author}
                tags={post.tags}
                featured={post.featured}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Posts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay up to date with our newest articles and insights on faith and
              technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                description={post.description}
                date={post.date}
                author={post.author}
                tags={post.tags}
                featured={post.featured}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        </section>
      )}

      {/* Fallback Message if No Posts */}
      {featuredPosts.length === 0 && latestPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-blue-600 mb-4">
            <FileText className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Faith-Based Content Coming Soon
          </h3>
          <p className="text-gray-600 mb-8">
            Check back soon for inspiring articles exploring the intersection of
            faith and technology!
          </p>
        </div>
      )}
    </div>
  )
}
