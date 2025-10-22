/**
 * Featured Posts Configuration
 *
 * Simple way to manage which posts are featured on the homepage.
 *
 * Instructions:
 * 1. Add/remove post slugs from the FEATURED_POSTS array below
 * 2. Posts will appear in the order listed here
 * 3. Maximum recommended: 6 featured posts for optimal homepage performance
 * 4. Posts must exist in src/app/content/posts/ folder
 */

export const FEATURED_POSTS = [
  "20251022-purity-of-heart",
  "20251019-jesus-rules-spirit",
  "20251019-god-hides",
]

/**
 * Featured Posts Settings
 */
export const FEATURED_POSTS_CONFIG = {
  // Maximum number of featured posts to display on homepage
  maxFeaturedPosts: 3,

  // Show featured badge on post cards
  showFeaturedBadge: true,

  // Display featured posts in a separate section
  separateFeaturedSection: true,

  // Title for the featured posts section
  featuredSectionTitle: "Featured Posts",
}

/**
 * Utility function to check if a post is featured
 */
export function isFeatured(slug: string): boolean {
  return FEATURED_POSTS.includes(slug)
}

/**
 * Get the featured posts in order
 */
export function getFeaturedPosts(): string[] {
  return FEATURED_POSTS.slice(0, FEATURED_POSTS_CONFIG.maxFeaturedPosts)
}
