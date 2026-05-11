# AGENTS.md

## Project Overview

A minimal personal website for blog posts, documentation, and tutorials. The homepage renders content as a terminal-style tree view (like the `tree` shell command). Built with TanStack Start, deployed on Netlify.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Content | Content Collections (type-safe markdown) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
content/posts/              # Markdown content files (blog, docs, tutorials)
src/
  components/
    tree-view.tsx           # Homepage tree UI — groups posts by category, ASCII tree rendering
    blog-posts.tsx          # Card list component (not used on homepage, kept for reference)
    ui/card.tsx             # Radix-based card primitive
  routes/
    __root.tsx              # Root layout: dark bg, global head tags
    index.tsx               # Homepage — renders <TreeView posts={allPosts} />
    posts.$slug.tsx         # Post detail page with .post-content prose styles
    category.$category.tsx  # Category filter route
  styles.css                # Tailwind import + .post-content prose CSS (no external typography plugin)
  lib/utils.ts              # cn() class merging helper
content-collections.ts      # Zod schema for posts frontmatter
```

## Key Concepts

### Content Collections

Markdown files in `content/posts/` are auto-typed. Frontmatter fields:
- `title` (string, required)
- `summary` (string, required)
- `categories` (string[], required) — first category is used as the tree folder
- `date` (string, required) — ISO date for sorting
- `image` (string, required)

The slug is auto-derived from the title (lowercased, spaces → underscores).

### Tree View Component

`src/components/tree-view.tsx` groups `allPosts` by `categories[0]` and renders ASCII tree lines (`├──`, `└──`, `│`). Category display order: Blog → Docs → Tutorials → any others alphabetically. Posts within each category are sorted newest-first. Hovering a file reveals its summary inline.

### Post Prose Styles

Post content HTML (from `marked()`) is wrapped in `<div className="post-content">`. All styles for headings, paragraphs, code blocks, etc. live in `src/styles.css` under `.post-content`. There is no `@tailwindcss/typography` dependency — styles are hand-written to avoid an extra package.

### Routing

File-based routing via TanStack Router:
- `/` → `src/routes/index.tsx`
- `/posts/:slug` → `src/routes/posts.$slug.tsx`
- `/category/:category` → `src/routes/category.$category.tsx`

## Coding Conventions

- Components: PascalCase files
- Utilities/hooks: camelCase files
- Routes: kebab-case files
- Import paths use `@/` alias for `src/`
- TypeScript strict mode, type-only imports with `type` keyword
- `cn()` (clsx + tailwind-merge) for conditional class merging
- Dark theme: `bg-zinc-950` base, `text-zinc-100/400/600` for hierarchy, `emerald-400` accent

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
```
