import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { FEATURED_POSTS, isFeatured } from "../config/featured-posts"

export interface Post {
  title: string
  slug: string
  description: string
  date: string
  author: string
  tags: string[]
  featured: boolean
  readingTime: number
  content: string
}

const postsDirectory = path.join(process.cwd(), "src/app/content/posts")

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "",
        tags: data.tags || [],
        featured: data.featured || isFeatured(slug),
        readingTime: data.readingTime || 0,
      } as Post
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts()
  const featuredPosts: Post[] = []

  // First, add posts in the order specified in FEATURED_POSTS config
  for (const slug of FEATURED_POSTS) {
    const post = allPosts.find((p) => p.slug === slug)
    if (post) {
      featuredPosts.push({ ...post, featured: true })
    }
  }

  // Then add any other posts marked as featured in their frontmatter
  for (const post of allPosts) {
    if (post.featured && !featuredPosts.find((p) => p.slug === post.slug)) {
      featuredPosts.push(post)
    }
  }

  return featuredPosts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "",
      tags: data.tags || [],
      featured: data.featured || isFeatured(slug),
      readingTime: data.readingTime || 0,
    } as Post
  } catch {
    return null
  }
}

/**
 * Get the latest posts (newest first)
 * @param limit - Maximum number of posts to return (default: 10)
 * @param excludeFeatured - Whether to exclude featured posts (default: false)
 */
export function getLatestPosts(
  limit: number = 10,
  excludeFeatured: boolean = false
): Post[] {
  const allPosts = getAllPosts()
  const posts = excludeFeatured
    ? allPosts.filter((post) => !post.featured)
    : allPosts

  return posts.slice(0, limit)
}

/**
 * Get recent posts from the last N days
 * @param days - Number of days to look back (default: 30)
 * @param limit - Maximum number of posts to return (default: 10)
 */
export function getRecentPosts(days: number = 30, limit: number = 10): Post[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const allPosts = getAllPosts()
  return allPosts
    .filter((post) => new Date(post.date) >= cutoffDate)
    .slice(0, limit)
}

/**
 * Get posts by date range
 * @param startDate - Start date (YYYY-MM-DD format)
 * @param endDate - End date (YYYY-MM-DD format)
 * @param limit - Maximum number of posts to return (default: all)
 */
export function getPostsByDateRange(
  startDate: string,
  endDate: string,
  limit?: number
): Post[] {
  const start = new Date(startDate)
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999) // Include the entire end date

  const allPosts = getAllPosts()
  const filteredPosts = allPosts.filter((post) => {
    const postDate = new Date(post.date)
    return postDate >= start && postDate <= end
  })

  return limit ? filteredPosts.slice(0, limit) : filteredPosts
}

/**
 * Get posts from current month
 * @param limit - Maximum number of posts to return (default: all)
 */
export function getCurrentMonthPosts(limit?: number): Post[] {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  return getPostsByDateRange(
    startOfMonth.toISOString().split("T")[0],
    endOfMonth.toISOString().split("T")[0],
    limit
  )
}

/**
 * Get posts from current year
 * @param limit - Maximum number of posts to return (default: all)
 */
export function getCurrentYearPosts(limit?: number): Post[] {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const endOfYear = new Date(now.getFullYear(), 11, 31)

  return getPostsByDateRange(
    startOfYear.toISOString().split("T")[0],
    endOfYear.toISOString().split("T")[0],
    limit
  )
}
