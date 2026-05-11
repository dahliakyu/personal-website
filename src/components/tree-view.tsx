import { Link } from '@tanstack/react-router'
import { type Post } from 'content-collections'
import { useState } from 'react'

const CATEGORY_ORDER = ['Blog', 'Docs', 'Tutorials']

function groupByCategory(posts: Post[]): Record<string, Post[]> {
  const groups: Record<string, Post[]> = {}
  for (const post of posts) {
    const cat = post.categories?.[0] ?? 'Uncategorized'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(post)
  }
  return groups
}

export default function TreeView({
  posts,
  siteName,
}: {
  posts: Post[]
  siteName: string
}) {
  const groups = groupByCategory(posts)
  const categories = [
    ...CATEGORY_ORDER.filter((c) => groups[c]),
    ...Object.keys(groups).filter((c) => !CATEGORY_ORDER.includes(c)),
  ]
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({})

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <div className="w-full max-w-lg relative pt-6">
      {/* New draggable handle div */}
      <div className="absolute top-0 left-0 drag-handle cursor-move p-1 rounded-sm hover:bg-zinc-800">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
          <circle cx="2" cy="2" r="1.5" />
          <circle cx="8" cy="2" r="1.5" />
          <circle cx="14" cy="2" r="1.5" />
          <circle cx="2" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="14" cy="8" r="1.5" />
        </svg>
      </div>

      {/* Site name - removed drag-handle class and added pl-2 */}
      <p className="font-mono text-zinc-400 text-sm mb-1 select-none pl-2">
        {siteName}
      </p>

      <div className="font-mono text-sm leading-7">
        {categories.map((cat, ci) => {
          const isLastCat = ci === categories.length - 1
          const catPrefix = isLastCat ? '└── ' : '├── '
          const childIndent = isLastCat ? '    ' : '│   '
          const sortedPosts = [...groups[cat]].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          const isExpanded = !!expandedCategories[cat]
          const expander = isExpanded ? '[-]' : '[+]'

          return (
            <div key={cat}>
              {/* Category folder */}
              <p
                className="text-zinc-500 select-none cursor-pointer pl-2" // Added pl-2
                onClick={() => toggleCategory(cat)}
              >
                <span className="text-zinc-700">{catPrefix}</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-5 text-center text-zinc-400">
                    {expander}
                  </span>
                  <span className="text-zinc-400">{cat.toLowerCase()}/</span>
                </span>
              </p>

              {/* Posts */}
              {isExpanded &&
                sortedPosts.map((post, pi) => {
                  const isLastPost = pi === sortedPosts.length - 1
                  const filePrefix =
                    childIndent + (isLastPost ? '└── ' : '├── ')

                  return (
                    <div key={post._meta.path}>
                      <Link
                        to="/posts/$slug"
                        params={{ slug: post.slug }}
                        className="group flex items-baseline gap-0 hover:no-underline pl-2" // Added pl-2
                      >
                        <span className="text-zinc-700 select-none whitespace-pre">
                          {filePrefix}
                        </span>
                        <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                          {post.title}
                        </span>
                      </Link>
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>

      {/* Footer hint */}
      <p className="font-mono text-zinc-700 text-xs mt-12 pl-2">
        {posts.length} file{posts.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
