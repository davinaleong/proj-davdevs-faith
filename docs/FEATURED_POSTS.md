# Featured Posts Management

This guide explains how to easily track and update featured posts for the Dav/Devs Faith blog.

## Quick Start

### To Make a Post Featured:

**Option 1: Using the Configuration File (Recommended)**

1. Open `src/app/config/featured-posts.ts`
2. Add the post slug to the `FEATURED_POSTS` array:
   ```typescript
   export const FEATURED_POSTS = [
     "20251022-purity-of-heart",
     "20251019-jesus-rules-spirit",
     "your-new-post-slug-here", // Add here
     // ... other posts
   ]
   ```
3. Save the file - the post will automatically be featured!

**Option 2: Using Post Frontmatter**

1. Open your `.mdx` post file
2. Set `featured: true` in the frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   featured: true # Add this line
   # ... other metadata
   ---
   ```

### To Remove a Featured Post:

1. Open `src/app/config/featured-posts.ts`
2. Remove the post slug from the `FEATURED_POSTS` array
3. Or set `featured: false` in the post's frontmatter

## Configuration Options

Edit `src/app/config/featured-posts.ts` to customize:

```typescript
export const FEATURED_POSTS_CONFIG = {
  maxFeaturedPosts: 6, // Max posts to show
  showFeaturedBadge: true, // Show "Featured" badge
  separateFeaturedSection: true, // Separate section for featured
  featuredSectionTitle: "Featured Posts", // Section title
}
```

## Priority System

Posts are featured in this order:

1. **Configuration File Order**: Posts listed in `FEATURED_POSTS` array (in that exact order)
2. **Frontmatter Featured**: Posts with `featured: true` in their frontmatter
3. **Date Order**: Newest posts first within each category

## File Locations

- **Configuration**: `src/app/config/featured-posts.ts`
- **Posts Utility**: `src/app/lib/posts.ts`
- **Posts Content**: `src/app/content/posts/*.mdx`

## Tips

- **Maximum 6 featured posts** recommended for optimal homepage performance
- **Order matters**: Posts appear in the order listed in `FEATURED_POSTS` array
- **Automatic updates**: Changes take effect immediately (no rebuild needed in development)
- **Post slugs**: Use the filename without `.mdx` extension (e.g., `20251022-purity-of-heart`)

## Example Workflow

To feature a new post called "god-loves-you.mdx":

1. **Add to config**:

   ```typescript
   export const FEATURED_POSTS = [
     "god-loves-you", // Add at top for highest priority
     "20251022-purity-of-heart",
     // ... existing posts
   ]
   ```

2. **Or add to post frontmatter**:
   ```yaml
   ---
   title: "God Loves You"
   slug: "god-loves-you"
   featured: true
   # ... other metadata
   ---
   ```

That's it! Your post is now featured. 🎉
