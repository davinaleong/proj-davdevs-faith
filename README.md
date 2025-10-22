# Dav/Devs Faith Blog

A faith-based platform exploring the intersection of technology and spirituality. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS v4
- **MDX Blog System**: Write posts in Markdown with frontmatter support
- **Featured Posts**: Configurable featured posts system
- **Responsive Design**: Mobile-first design with beautiful backgrounds
- **Static Export**: Optimized for static hosting and deployment
- **Syntax Highlighting**: Code blocks with proper syntax highlighting
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Performance**: Static generation with excellent Core Web Vitals

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build (static export)
npm start
# or
npx serve@latest out
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Site header with navigation
│   │   ├── Footer.tsx       # Site footer
│   │   ├── PostCard.tsx     # Blog post preview cards
│   │   └── Layout.tsx       # Main layout wrapper
│   ├── content/
│   │   ├── posts/           # Blog posts (.mdx files)
│   │   └── static/          # Static content (legal pages)
│   ├── lib/                 # Core utilities and services
│   │   ├── index.ts         # Main exports
│   │   ├── posts.ts         # Post management service
│   │   ├── constants.ts     # Configuration constants
│   │   ├── types.ts         # TypeScript definitions
│   │   └── utils.ts         # Utility functions
│   ├── posts/[slug]/        # Dynamic post pages
│   ├── globals.css          # Global styles
│   └── page.tsx             # Homepage
├── public/
│   └── assets/images/       # Background images and assets
└── docs/                    # Documentation
```

## ✍️ Writing Posts

### Create a New Post

1. Create a new `.mdx` file in `src/app/content/posts/`
2. Use the naming convention: `YYYYMMDD-post-title.mdx`
3. Add frontmatter at the top:

```yaml
---
title: "Your Post Title"
slug: "20251022-your-post-title"
description: "A brief description of your post"
date: "2025-10-22"
author: "Your Name"
tags: ["Faith", "Technology", "Spirituality"]
featured: false
readingTime: 5
---
Your markdown content here...
```

### Markdown Features

- **Headers**: `# ## ### ####`
- **Bold/Italic**: `**bold**` `*italic*`
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`
- **Code**: `` `inline` `` or `language blocks`
- **Blockquotes**: `> quote`
- **Tables**: GitHub Flavored Markdown tables

## 🎨 Managing Featured Posts

### Method 1: Configuration File (Recommended)

Edit `src/app/lib/constants.ts`:

```typescript
export const FEATURED_POSTS: readonly string[] = [
  "20251022-purity-of-heart",
  "20251019-jesus-rules-spirit",
  // Add more slugs here
] as const
```

### Method 2: Frontmatter

Set `featured: true` in individual post files.

## 🛠️ Configuration

### Featured Posts Settings

```typescript
// src/app/lib/constants.ts
export const FEATURED_POSTS_CONFIG = {
  maxFeaturedPosts: 6,
  showFeaturedBadge: true,
  separateFeaturedSection: true,
  featuredSectionTitle: "Featured Posts",
}
```

### Background Images

Place images in `public/assets/images/`:

- `bg-h-m.svg` - Header background (mobile)
- `bg-h-d.svg` - Header background (desktop)
- `bg-f-m.svg` - Footer background (mobile)
- `bg-f-d.svg` - Footer background (desktop)

## 🚢 Deployment

### Static Export (Recommended)

1. Enable static export in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: "export",
  // ... other config
}
```

2. Build and export:

```bash
npm run build
```

3. Deploy the `out/` folder to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `out/` folder
- **GitHub Pages**: Push `out/` to `gh-pages` branch
- **Firebase Hosting**: `firebase deploy`

### Server-Side Rendering

For SSR deployment, comment out `output: 'export'` and deploy to:

- Vercel
- Netlify Functions
- Railway
- Render

## 🔧 Scripts

```bash
npm run dev       # Development server
npm run build     # Build for production
npm start         # Serve static export
npm run lint      # Run ESLint
```

## 📦 Dependencies

### Core

- **Next.js 15.5.6** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety

### Styling

- **Tailwind CSS v4** - Utility-first CSS
- **Lucide React** - Icon library

### Content

- **MDX** - Markdown with JSX
- **gray-matter** - Frontmatter parser
- **react-markdown** - Markdown renderer
- **remark-gfm** - GitHub Flavored Markdown
- **rehype-highlight** - Syntax highlighting

## 🎯 Performance

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Custom Montserrat font loading
- **Bundle Splitting**: Automatic code splitting
- **Core Web Vitals**: Optimized for excellent performance scores

## 🔒 Security

- **No dangerouslySetInnerHTML**: Safe markdown rendering
- **Type Safety**: Full TypeScript coverage
- **Input Sanitization**: Proper content validation
- **Static Export**: No server vulnerabilities

## 📚 API Reference

### Post Management

```typescript
import { getAllPosts, getFeaturedPosts, getLatestPosts } from "@/app/lib"

// Get all posts
const posts = getAllPosts()

// Get featured posts
const featured = getFeaturedPosts()

// Get latest posts
const latest = getLatestPosts(5, true) // 5 posts, exclude featured
```

### Utility Functions

```typescript
import { searchPosts, getPostsByTag, getPostStats } from "@/app/lib"

// Search posts
const results = searchPosts("faith")

// Get posts by tag
const faithPosts = getPostsByTag("Faith")

// Get blog statistics
const stats = getPostStats()
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with faith and dedication
- Powered by Next.js and modern web technologies
- Inspired by the intersection of faith and technology

---

> "Powered by faith, built with Next.js" - Dav/Devs Faith

For more information, visit [tools.davinaleong.com](https://tools.davinaleong.com/)
