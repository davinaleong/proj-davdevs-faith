/**
 * Configuration constants for the blog system
 */

import type { FeaturedPostsConfig } from "./types"

/**
 * List of featured post slugs in display order
 * Add/remove slugs to control which posts are featured on the homepage
 */
export const FEATURED_POSTS: readonly string[] = [
  // All posts are currently unfeatured
  // Add post slugs here to feature them on the homepage
] as const

/**
 * Configuration for featured posts behavior
 */
export const FEATURED_POSTS_CONFIG: FeaturedPostsConfig = {
  maxFeaturedPosts: 6,
  showFeaturedBadge: true,
  separateFeaturedSection: true,
  featuredSectionTitle: "Featured Posts",
} as const

/**
 * Default pagination and limits
 */
export const PAGINATION_CONFIG = {
  /** Default number of posts per page */
  postsPerPage: 10,
  /** Default number of latest posts to fetch */
  defaultLatestLimit: 10,
  /** Maximum posts to show on homepage */
  homepageMaxPosts: 12,
  /** Default days for "recent" posts */
  recentPostsDays: 30,
} as const

/**
 * File system paths (relative to project root)
 */
export const PATHS = {
  /** Directory containing blog posts */
  postsDirectory: "src/app/content/posts",
  /** Directory containing static content */
  staticDirectory: "src/app/content/static",
} as const

/**
 * Supported file extensions for posts
 */
export const SUPPORTED_EXTENSIONS = [".mdx", ".md"] as const

/**
 * Default post metadata values
 */
export const DEFAULT_POST_VALUES = {
  title: "Untitled",
  description: "",
  author: "Anonymous",
  tags: [],
  featured: false,
  readingTime: 5,
} as const
