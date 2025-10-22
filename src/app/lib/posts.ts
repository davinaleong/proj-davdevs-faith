import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { FEATURED_POSTS, isFeatured } from "../config/featured-posts"

export interface Post {
  title: string
  slug: string
  description: string
  date: string
  author: string
  tags: string[]
  featured: boolean
  readingTime: number
  content: string
}

const postsDirectory = path.join(process.cwd(), "src/app/content/posts")

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "",
        tags: data.tags || [],
        featured: data.featured || isFeatured(slug),
        readingTime: data.readingTime || 0,
      } as Post
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

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
    if (post.featured && !featuredPosts.find((p) => p.slug === post.slug)) {
      featuredPosts.push(post)
    }
  }

  return featuredPosts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "",
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: data.readingTime || 0,
    } as Post
  } catch {
    return null
  }
}
