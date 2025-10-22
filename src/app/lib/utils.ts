/**
 * Utility functions for the blog system
 */

import { FEATURED_POSTS, PAGINATION_CONFIG } from "./constants"

/**
 * Check if a post slug is in the featured posts list
 */
export function isFeatured(slug: string): boolean {
  return FEATURED_POSTS.includes(slug)
}

/**
 * Format a date string to a readable format
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", options)
  } catch {
    return dateString
  }
}

/**
 * Calculate reading time based on content length
 * @param content - The content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Remove markdown syntax and trim
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.+?)\*/g, "$1") // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // Remove links
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`(.+?)`/g, "$1") // Remove inline code
    .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered list markers
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf(".")

  if (lastSentence > maxLength * 0.7) {
    return truncated.substring(0, lastSentence + 1)
  }

  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ")
  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "..."
}

/**
 * Validate post data
 */
export function validatePostData(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false
  }

  const post = data as Record<string, unknown>

  return (
    typeof post.title === "string" &&
    typeof post.slug === "string" &&
    typeof post.date === "string" &&
    Array.isArray(post.tags)
  )
}

/**
 * Sanitize slug for URL safety
 */
export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Get date boundaries for a specific month/year
 */
export function getDateBoundaries(
  year: number,
  month?: number
): {
  start: Date
  end: Date
} {
  if (month !== undefined) {
    // Specific month
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59, 999)
    return { start, end }
  } else {
    // Entire year
    const start = new Date(year, 0, 1)
    const end = new Date(year, 11, 31, 23, 59, 59, 999)
    return { start, end }
  }
}

/**
 * Apply default limit if none provided
 */
export function applyDefaultLimit(
  limit?: number,
  defaultLimit: number = PAGINATION_CONFIG.defaultLatestLimit
): number {
  return limit ?? defaultLimit
}

/**
 * Sort posts by date (newest first)
 */
export function sortPostsByDate<T extends { date: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * Filter posts by date range
 */
export function filterPostsByDateRange<T extends { date: string }>(
  posts: T[],
  startDate: Date,
  endDate: Date
): T[] {
  return posts.filter((post) => {
    const postDate = new Date(post.date)
    return postDate >= startDate && postDate <= endDate
  })
}

/**
 * Group posts by tag
 */
export function groupPostsByTag<T extends { tags: string[] }>(
  posts: T[]
): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!grouped[tag]) {
        grouped[tag] = []
      }
      grouped[tag].push(post)
    })
  })

  return grouped
}
