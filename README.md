# my-site

A minimal personal website for publishing blog posts, documentation, and tutorials. The homepage displays all content as an interactive terminal-style tree view grouped by category.

## Tech Stack

- **Framework**: TanStack Start (React 19 + TanStack Router v1)
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **Content**: Content Collections (type-safe markdown with frontmatter)
- **Language**: TypeScript 5.7 (strict mode)
- **Deployment**: Netlify

## Running Locally

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000` (or port 8888 via the Netlify CLI).

## Adding Content

Create a new markdown file in `content/posts/`:

```markdown
---
date: 2025-06-01
title: "My New Post"
summary: "A short description of the post."
categories:
  - Blog   # or Docs, Tutorials, etc.
image: placeholder.png
---

Post content goes here...
```

The post will automatically appear in the tree on the homepage under its category folder.

## Content Categories

The tree groups posts by their first category. The default display order is: **Blog → Docs → Tutorials**. Any other categories appear alphabetically after these.
