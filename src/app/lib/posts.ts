/**
 * Core blog post service
 * Handles reading, parsing, and retrieving blog posts from the file system
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"

import type { Post } from "./types"
import {
  FEATURED_POSTS,
  PAGINATION_CONFIG,
  PATHS,
  DEFAULT_POST_VALUES,
  SUPPORTED_EXTENSIONS,
} from "./constants"
import {
  isFeatured,
  validatePostData,
  sortPostsByDate,
  filterPostsByDateRange,
  getDateBoundaries,
  applyDefaultLimit,
  calculateReadingTime,
  generateExcerpt,
} from "./utils"

// Cache for posts to avoid repeated file system reads
let postsCache: Post[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in development

const postsDirectory = path.join(process.cwd(), PATHS.postsDirectory)

/**
 * Check if posts directory exists and create cache key
 */
function ensurePostsDirectory(): boolean {
  try {
    return fs.existsSync(postsDirectory)
  } catch {
    return false
  }
}

/**
 * Get all post files from the directory
 */
function getPostFiles(): string[] {
  if (!ensurePostsDirectory()) {
    console.warn(`Posts directory not found: ${postsDirectory}`)
    return []
  }

  try {
    return fs
      .readdirSync(postsDirectory)
      .filter((fileName) =>
        SUPPORTED_EXTENSIONS.some((ext) => fileName.endsWith(ext))
      )
  } catch (error) {
    console.error("Error reading posts directory:", error)
    return []
  }
}

/**
 * Parse a single post file and return Post object
 */
function parsePostFile(fileName: string): Post | null {
  try {
    const slug = fileName.replace(/\.(mdx?|md)$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Validate required fields
    if (!validatePostData({ ...data, slug })) {
      console.warn(`Invalid post data in ${fileName}`)
      return null
    }

    const post: Post = {
      slug,
      content,
      title: data.title || DEFAULT_POST_VALUES.title,
      description: data.description || generateExcerpt(content),
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || DEFAULT_POST_VALUES.author,
      tags: Array.isArray(data.tags)
        ? [...data.tags]
        : [...DEFAULT_POST_VALUES.tags],
      featured: Boolean(data.featured) || isFeatured(slug),
      readingTime: data.readingTime || calculateReadingTime(content),
    }

    return post
  } catch (error) {
    console.error(`Error parsing post file ${fileName}:`, error)
    return null
  }
}

/**
 * Get all posts with caching support
 */
export function getAllPosts(): Post[] {
  // Check cache validity (disabled in production for now)
  if (process.env.NODE_ENV === "development" && postsCache && cacheTimestamp) {
    if (Date.now() - cacheTimestamp < CACHE_DURATION) {
      return postsCache
    }
  }

  const fileNames = getPostFiles()
  const allPostsData = fileNames
    .map(parsePostFile)
    .filter((post): post is Post => post !== null)

  const sortedPosts = sortPostsByDate(allPostsData)

  // Update cache
  if (process.env.NODE_ENV === "development") {
    postsCache = sortedPosts
    cacheTimestamp = Date.now()
  }

  return sortedPosts
}

/**
 * Get all featured posts in the configured order
 */
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
    if (post.featured && !featuredPosts.some((p) => p.slug === post.slug)) {
      featuredPosts.push(post)
    }
  }

  return featuredPosts
}

/**
 * Get a single post by its slug
 */
export function getPostBySlug(slug: string): Post | null {
  // First try to get from cache
  const allPosts = getAllPosts()
  const cachedPost = allPosts.find((post) => post.slug === slug)
  if (cachedPost) {
    return cachedPost
  }

  // If not in cache, try to read directly
  for (const ext of SUPPORTED_EXTENSIONS) {
    try {
      const fileName = `${slug}${ext}`
      const fullPath = path.join(postsDirectory, fileName)

      if (fs.existsSync(fullPath)) {
        return parsePostFile(fileName)
      }
    } catch (error) {
      console.error(`Error reading post ${slug}:`, error)
    }
  }

  return null
}

/**
 * Get the latest posts (newest first)
 */
export function getLatestPosts(
  limit: number = PAGINATION_CONFIG.defaultLatestLimit,
  excludeFeatured: boolean = false
): Post[] {
  const allPosts = getAllPosts()
  const posts = excludeFeatured
    ? allPosts.filter((post) => !post.featured)
    : allPosts

  return posts.slice(0, applyDefaultLimit(limit))
}

/**
 * Get recent posts from the last N days
 */
export function getRecentPosts(
  days: number = PAGINATION_CONFIG.recentPostsDays,
  limit: number = PAGINATION_CONFIG.defaultLatestLimit
): Post[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const allPosts = getAllPosts()
  return filterPostsByDateRange(allPosts, cutoffDate, new Date()).slice(
    0,
    applyDefaultLimit(limit)
  )
}

/**
 * Get posts by date range
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
  const filteredPosts = filterPostsByDateRange(allPosts, start, end)

  return limit ? filteredPosts.slice(0, limit) : filteredPosts
}

/**
 * Get posts from current month
 */
export function getCurrentMonthPosts(limit?: number): Post[] {
  const now = new Date()
  const { start, end } = getDateBoundaries(
    now.getFullYear(),
    now.getMonth() + 1
  )

  return getPostsByDateRange(
    start.toISOString().split("T")[0],
    end.toISOString().split("T")[0],
    limit
  )
}

/**
 * Get posts from current year
 */
export function getCurrentYearPosts(limit?: number): Post[] {
  const now = new Date()
  const { start, end } = getDateBoundaries(now.getFullYear())

  return getPostsByDateRange(
    start.toISOString().split("T")[0],
    end.toISOString().split("T")[0],
    limit
  )
}
