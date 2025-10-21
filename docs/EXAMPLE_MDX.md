# Example `MDX`

```
---
title: "Hello World – My First MDX Post"
slug: "hello-world"
description: "A quick introduction to my new blog powered by Next.js and MDX."
date: "2025-10-21"
author: "Davina Leong"
coverImage: "/images/posts/hello-world-cover.jpg"
tags: ["Next.js", "MDX", "Blog Setup"]
featured: true
readingTime: 3
---

import { Callout } from "@/components/ui/Callout"
import { Button } from "@/components/ui/Button"

# 👋 Hello World

Welcome to my very first post written in **MDX** — where Markdown meets React.
You can add normal markdown elements *and* import components directly inside your content.

---

## ✨ What is MDX?

**MDX** allows you to mix JSX (React components) with Markdown.
That means you can embed interactive elements like buttons, callouts, or even charts — right in your article.

Here’s an example of a reusable component:

<Callout variant="info">
  You can create rich, styled elements like this directly in your `.mdx` files.
</Callout>

---

## 🚀 How This Blog Works

This blog uses:
- **Next.js App Router**
- **next-mdx-remote** for MDX parsing
- **Tailwind CSS** for styling
- **Static generation (SSG)** for performance

Posts are stored in `/src/content/posts/` and parsed at build time using a utility like `getAllPosts()`.

---

## 🧩 Try Embedding Components

<Callout variant="success" title="Try it yourself!">
  You can import any React component to make your content more dynamic.
</Callout>

Or even a simple button:

<Button variant="soft">Click Me</Button>

---

## 🗓️ Next Up

In the next post, I’ll show how to:
- Add syntax highlighting for code blocks
- Build a custom `<PostCard />` component
- Use frontmatter data for SEO meta tags

---

> “In the beginning was the Word…” – John 1:1 ✨
```
