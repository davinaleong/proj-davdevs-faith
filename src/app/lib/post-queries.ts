/**
 * Advanced post queries and aggregations service
 * Built on top of the core posts service
 */

import type { Post, PostStats, HomepagePosts } from "./types"
import {
  getAllPosts,
  getFeaturedPosts,
  getLatestPosts,
  getRecentPosts,
  getCurrentMonthPosts,
  getCurrentYearPosts,
} from "./posts"
import { PAGINATION_CONFIG } from "./constants"
import { groupPostsByTag, applyDefaultLimit } from "./utils"

/**
 * Get posts optimized for homepage display
 * Combines featured posts with latest non-featured posts
 */
export function getHomepagePosts(
  maxTotal: number = PAGINATION_CONFIG.homepageMaxPosts
): HomepagePosts {
  const featured = getFeaturedPosts()
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
    return getCurrentMonthPosts()
  } else if (year) {
    return getCurrentYearPosts()
  } else {
    return getAllPosts()
  }
}

/**
 * Get comprehensive post statistics
 */
export function getPostStats(): PostStats {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const thisMonthPosts = getCurrentMonthPosts()
  const thisYearPosts = getCurrentYearPosts()

  const totalReadingTime = allPosts.reduce(
    (sum, post) => sum + post.readingTime,
    0
  )
  const averageReadingTime =
    allPosts.length > 0 ? Math.round(totalReadingTime / allPosts.length) : 0

  return {
    total: allPosts.length,
    featured: featuredPosts.length,
    thisMonth: thisMonthPosts.length,
    thisYear: thisYearPosts.length,
    averageReadingTime,
  }
}

/**
 * Search posts by title, description, or tags
 */
export function searchPosts(query: string, limit?: number): Post[] {
  const allPosts = getAllPosts()
  const searchTerm = query.toLowerCase().trim()

  if (!searchTerm) {
    return []
  }

  const results = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      post.author.toLowerCase().includes(searchTerm)
  )

  return limit ? results.slice(0, limit) : results
}

/**
 * Get posts by specific tag
 */
export function getPostsByTag(tag: string, limit?: number): Post[] {
  const allPosts = getAllPosts()
  const results = allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  )

  return limit ? results.slice(0, applyDefaultLimit(limit)) : results
}

/**
 * Get all unique tags from posts with usage counts
 */
export function getAllTags(): Array<{ tag: string; count: number }> {
  const allPosts = getAllPosts()
  const tagCounts = new Map<string, number>()

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count) // Sort by usage count, descending
}

/**
 * Get posts grouped by tag
 */
export function getPostsGroupedByTag(): Record<string, Post[]> {
  const allPosts = getAllPosts()
  return groupPostsByTag(allPosts)
}

/**
 * Get related posts based on shared tags
 */
export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts()
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug)

  // Calculate relevance score based on shared tags
  const scoredPosts = otherPosts.map((post) => {
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
    return {
      post,
      score: sharedTags.length,
    }
  })

  return scoredPosts
    .filter(({ score }) => score > 0) // Only posts with shared tags
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, limit)
    .map(({ post }) => post)
}

/**
 * Get posts by author
 */
export function getPostsByAuthor(author: string, limit?: number): Post[] {
  const allPosts = getAllPosts()
  const results = allPosts.filter(
    (post) => post.author.toLowerCase() === author.toLowerCase()
  )

  return limit ? results.slice(0, applyDefaultLimit(limit)) : results
}
