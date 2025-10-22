/**
 * Latest Posts Utilities
 *
 * Helper functions and examples for fetching the latest posts
 */

import {
  getLatestPosts,
  getRecentPosts,
  getCurrentMonthPosts,
  getCurrentYearPosts,
  getPostsByDateRange,
  getAllPosts,
  Post,
} from "./posts"

/**
 * Get posts for homepage display
 * Combines featured posts with latest non-featured posts
 */
export function getHomepagePosts(maxTotal: number = 12): {
  featured: Post[]
  latest: Post[]
  total: number
} {
  const featured = getLatestPosts(6, false).filter((post) => post.featured)
  const remainingSlots = Math.max(0, maxTotal - featured.length)
  const latest = getLatestPosts(remainingSlots, true) // Exclude featured

  return {
    featured,
    latest,
    total: featured.length + latest.length,
  }
}

/**
 * Get posts for a "What's New" section
 * Returns posts from the last week
 */
export function getWhatsNewPosts(limit: number = 5): Post[] {
  return getRecentPosts(7, limit)
}

/**
 * Get posts for archive pages
 * Returns posts grouped by month/year
 */
export function getArchivePosts(year?: number, month?: number): Post[] {
  if (year && month) {
    // Specific month and year
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    return getPostsByDateRange(
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0]
    )
  } else if (year) {
    // Specific year
    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)
    return getPostsByDateRange(
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0]
    )
  } else {
    // All posts
    return getAllPosts()
  }
}

/**
 * Get post statistics
 */
export function getPostStats(): {
  total: number
  featured: number
  thisMonth: number
  thisYear: number
  averageReadingTime: number
} {
  const allPosts = getAllPosts()
  const featured = allPosts.filter((post) => post.featured)
  const thisMonth = getCurrentMonthPosts()
  const thisYear = getCurrentYearPosts()

  const totalReadingTime = allPosts.reduce(
    (sum, post) => sum + post.readingTime,
    0
  )
  const averageReadingTime =
    allPosts.length > 0 ? Math.round(totalReadingTime / allPosts.length) : 0

  return {
    total: allPosts.length,
    featured: featured.length,
    thisMonth: thisMonth.length,
    thisYear: thisYear.length,
    averageReadingTime,
  }
}

/**
 * Search posts by title, description, or tags
 */
export function searchPosts(query: string, limit?: number): Post[] {
  const allPosts = getAllPosts()
  const searchTerm = query.toLowerCase()

  const results = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  )

  return limit ? results.slice(0, limit) : results
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string, limit?: number): Post[] {
  const allPosts = getAllPosts()
  const results = allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  )

  return limit ? results.slice(0, limit) : results
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

// Usage Examples (for reference):

/* 
// Get 5 latest posts
const latest = getLatestPosts(5)

// Get latest posts excluding featured ones
const latestNonFeatured = getLatestPosts(10, true)

// Get posts from last 7 days
const recent = getRecentPosts(7, 5)

// Get posts from current month
const thisMonth = getCurrentMonthPosts(10)

// Get posts from October 2025
const october2025 = getArchivePosts(2025, 10)

// Get homepage data
const homepageData = getHomepagePosts(12)

// Search posts
const searchResults = searchPosts("Jesus", 5)

// Get posts by tag
const faithPosts = getPostsByTag("Faith", 10)

// Get all tags
const allTags = getAllTags()

// Get statistics
const stats = getPostStats()
*/
