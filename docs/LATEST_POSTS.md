# Latest Posts Utilities Guide

This guide explains how to fetch and work with the latest posts in your Dav/Devs Faith blog.

## Core Functions

### `getLatestPosts(limit, excludeFeatured)`

Get the most recent posts, sorted by date (newest first).

```typescript
import { getLatestPosts } from "@/app/lib/posts"

// Get 5 latest posts
const latest = getLatestPosts(5)

// Get 10 latest posts, excluding featured ones
const latestNonFeatured = getLatestPosts(10, true)
```

**Parameters:**

- `limit` (number, default: 10) - Maximum number of posts to return
- `excludeFeatured` (boolean, default: false) - Whether to exclude featured posts

### `getRecentPosts(days, limit)`

Get posts from the last N days.

```typescript
import { getRecentPosts } from "@/app/lib/posts"

// Get posts from last 7 days
const weeklyPosts = getRecentPosts(7, 5)

// Get all posts from last 30 days
const monthlyPosts = getRecentPosts(30)
```

### `getCurrentMonthPosts(limit)`

Get posts from the current month.

```typescript
import { getCurrentMonthPosts } from "@/app/lib/posts"

// Get all posts from this month
const thisMonth = getCurrentMonthPosts()

// Get up to 10 posts from this month
const thisMonthLimited = getCurrentMonthPosts(10)
```

### `getCurrentYearPosts(limit)`

Get posts from the current year.

```typescript
import { getCurrentYearPosts } from "@/app/lib/posts"

// Get all posts from this year
const thisYear = getCurrentYearPosts()
```

## Advanced Functions

### `getPostsByDateRange(startDate, endDate, limit)`

Get posts within a specific date range.

```typescript
import { getPostsByDateRange } from "@/app/lib/posts"

// Get posts from October 2025
const october = getPostsByDateRange("2025-10-01", "2025-10-31")

// Get first 5 posts from a date range
const limited = getPostsByDateRange("2025-01-01", "2025-12-31", 5)
```

## Helper Utilities

### `getHomepagePosts(maxTotal)`

Perfect for homepage display - combines featured and latest posts.

```typescript
import { getHomepagePosts } from "@/app/lib/latest-posts"

const homepage = getHomepagePosts(12)
console.log(homepage.featured) // Featured posts
console.log(homepage.latest) // Latest non-featured posts
console.log(homepage.total) // Total count
```

### `searchPosts(query, limit)`

Search posts by title, description, or tags.

```typescript
import { searchPosts } from "@/app/lib/latest-posts"

// Search for posts about Jesus
const results = searchPosts("Jesus", 5)

// Search for posts with "faith" anywhere
const faithResults = searchPosts("faith")
```

### `getPostsByTag(tag, limit)`

Get posts with a specific tag.

```typescript
import { getPostsByTag } from "@/app/lib/latest-posts"

// Get all posts tagged "Faith"
const faithPosts = getPostsByTag("Faith")

// Get first 5 posts tagged "Prayer"
const prayerPosts = getPostsByTag("Prayer", 5)
```

### `getPostStats()`

Get statistics about your posts.

```typescript
import { getPostStats } from "@/app/lib/latest-posts"

const stats = getPostStats()
console.log(stats)
// Output:
// {
//   total: 25,
//   featured: 6,
//   thisMonth: 8,
//   thisYear: 25,
//   averageReadingTime: 4
// }
```

## Common Use Cases

### Homepage Layout

```typescript
// Perfect for homepage
const { featured, latest } = getHomepagePosts(12)

return (
  <div>
    <section>
      <h2>Featured Posts</h2>
      {featured.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>

    <section>
      <h2>Latest Posts</h2>
      {latest.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  </div>
)
```

### Archive Page

```typescript
// For monthly/yearly archives
import { getArchivePosts } from "@/app/lib/latest-posts"

// Show posts from October 2025
const posts = getArchivePosts(2025, 10)
```

### "What's New" Section

```typescript
// Show recent posts from last week
import { getWhatsNewPosts } from "@/app/lib/latest-posts"

const newPosts = getWhatsNewPosts(3)
```

### Tag-based Pages

```typescript
// Show all posts with "Faith" tag
const faithPosts = getPostsByTag("Faith")

// Get all available tags
const allTags = getAllTags()
```

## Return Data Structure

All functions return an array of `Post` objects with this structure:

```typescript
interface Post {
  title: string // "Purity of Heart"
  slug: string // "20251022-purity-of-heart"
  description: string // Post description/excerpt
  date: string // "2025-10-22"
  author: string // "Davina Leong"
  tags: string[] // ["Faith", "Proverbs", ...]
  featured: boolean // true/false
  readingTime: number // 3 (minutes)
  content: string // Full MDX content
}
```

## Performance Tips

- Use `limit` parameters to avoid loading too many posts
- Use `excludeFeatured: true` when you want to separate featured from regular posts
- Cache results when possible in your components
- Consider pagination for large post lists

## File Locations

- **Core utilities**: `src/app/lib/posts.ts`
- **Helper utilities**: `src/app/lib/latest-posts.ts`
- **Posts content**: `src/app/content/posts/*.mdx`
