/**
 * Type definitions for the blog post system
 */

/**
 * Represents a blog post with all its metadata and content
 */
export interface Post {
  /** Unique identifier for the post (filename without extension) */
  slug: string
  /** Post title */
  title: string
  /** Short description or excerpt */
  description: string
  /** Publication date in YYYY-MM-DD format */
  date: string
  /** Author name */
  author: string
  /** Array of tags for categorization */
  tags: string[]
  /** Whether this post is featured */
  featured: boolean
  /** Estimated reading time in minutes */
  readingTime: number
  /** Full MDX content */
  content: string
}

/**
 * Simplified post metadata (without content)
 */
export type PostMetadata = Omit<Post, "content">

/**
 * Configuration for featured posts
 */
export interface FeaturedPostsConfig {
  /** Maximum number of featured posts to display */
  maxFeaturedPosts: number
  /** Whether to show featured badges */
  showFeaturedBadge: boolean
  /** Whether to display featured posts in a separate section */
  separateFeaturedSection: boolean
  /** Title for the featured posts section */
  featuredSectionTitle: string
}

/**
 * Result structure for homepage posts
 */
export interface HomepagePosts {
  /** Featured posts */
  featured: Post[]
  /** Latest non-featured posts */
  latest: Post[]
  /** Total count of posts */
  total: number
}

/**
 * Statistics about the blog posts
 */
export interface PostStats {
  /** Total number of posts */
  total: number
  /** Number of featured posts */
  featured: number
  /** Posts published this month */
  thisMonth: number
  /** Posts published this year */
  thisYear: number
  /** Average reading time across all posts */
  averageReadingTime: number
}

/**
 * Date range parameters
 */
export interface DateRange {
  /** Start date in YYYY-MM-DD format */
  startDate: string
  /** End date in YYYY-MM-DD format */
  endDate: string
}
