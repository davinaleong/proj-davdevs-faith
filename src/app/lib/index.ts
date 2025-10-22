/**
 * Main entry point for the blog system
 * Re-exports all public APIs with organized structure
 */

// Core types
export type {
  Post,
  PostMetadata,
  FeaturedPostsConfig,
  HomepagePosts,
  PostStats,
  DateRange,
} from "./types"

// Configuration and constants
export {
  FEATURED_POSTS,
  FEATURED_POSTS_CONFIG,
  PAGINATION_CONFIG,
  PATHS,
} from "./constants"

// Core post operations
export {
  getAllPosts,
  getFeaturedPosts,
  getPostBySlug,
  getLatestPosts,
  getRecentPosts,
  getPostsByDateRange,
  getCurrentMonthPosts,
  getCurrentYearPosts,
} from "./posts"

// Advanced queries and aggregations
export {
  getHomepagePosts,
  getWhatsNewPosts,
  getArchivePosts,
  getPostStats,
  searchPosts,
  getPostsByTag,
  getAllTags,
  getPostsGroupedByTag,
  getRelatedPosts,
  getPostsByAuthor,
} from "./post-queries"

// Utility functions
export {
  isFeatured,
  formatDate,
  calculateReadingTime,
  generateExcerpt,
  validatePostData,
  sanitizeSlug,
} from "./utils"
