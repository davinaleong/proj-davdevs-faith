# Folder Structure

```
/src
 ├── /app
 │    ├── / (Main Page)
 │    │    ├── page.tsx                # Homepage showing post cards + featured posts
 │    │    └── layout.tsx              # Shared layout (header/footer, etc.)
 │    │
 │    ├── /posts
 │    │    ├── [slug]/page.tsx         # Dynamic route for each post
 │    │    ├── page.tsx                # Optional posts index (/posts)
 │    │    └── loading.tsx             # Loading fallback for posts
 │    │
 │    ├── /terms/page.tsx              # Terms & Conditions
 │    ├── /privacy/page.tsx            # Privacy Policy
 │    ├── /about/page.tsx              # Optional about page
 │    └── layout.tsx                   # Root layout (meta, fonts, global styles)
 │
 ├── /components
 │    ├── /posts
 │    │    ├── PostCard.tsx            # Summary card for each post
 │    │    ├── FeaturedPosts.tsx       # Highlights featured posts
 │    │    ├── PostContent.tsx         # Renders the MDX post
 │    │    ├── PostMeta.tsx            # Title, date, author, tags
 │    │    └── PostNav.tsx             # “Next/Previous Post” links
 │    │
 │    ├── /layout
 │    │    ├── Header.tsx
 │    │    ├── Footer.tsx
 │    │    └── Container.tsx
 │    │
 │    ├── /ui
 │    │    ├── Button.tsx
 │    │    ├── Card.tsx
 │    │    ├── Typography.tsx
 │    │    └── Tag.tsx
 │    │
 │    └── /cta
 │         ├── ShareButtons.tsx        # Share post on Threads, X, LinkedIn
 │         ├── FeedbackPrompt.tsx      # “Was this helpful?” buttons
 │         └── SupportBanner.tsx       # e.g. “Buy Me a Coffee” or GitHub sponsor link
 │
 ├── /lib
 │    ├── mdx.ts                       # Loads & compiles MDX files
 │    ├── posts.ts                     # Get all posts, parse frontmatter
 │    ├── metadata.ts                  # Generates Open Graph meta tags
 │    └── constants.ts                 # Site metadata, social links
 │
 ├── /content
 │    ├── /posts
 │    │    ├── hello-world.mdx
 │    │    ├── building-with-next.mdx
 │    │    └── another-featured-post.mdx
 │    ├── featured.json                # List of featured slugs
 │    └── authors.json                 # Optional metadata for author info
 │
 ├── /styles
 │    ├── globals.css
 │    └── prose.css                    # For @tailwind typography plugin
 │
 ├── /public
 │    ├── /images
 │    │    ├── posts/
 │    │    └── logo.svg
 │
 ├── next.config.mjs
 ├── tailwind.config.ts
 ├── tsconfig.json
 └── package.json
```
