import { Link } from '@tanstack/react-router'
import { type Post } from 'content-collections'

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

export default function TreeView({ posts }: { posts: Post[] }) {
  const groups = groupByCategory(posts)
  const categories = [
    ...CATEGORY_ORDER.filter((c) => groups[c]),
    ...Object.keys(groups).filter((c) => !CATEGORY_ORDER.includes(c)),
  ]

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Site name */}
        <p className="font-mono text-zinc-400 text-sm mb-1 select-none">
          ~/my-site
        </p>

        <div className="font-mono text-sm leading-7">
          {categories.map((cat, ci) => {
            const isLastCat = ci === categories.length - 1
            const catPrefix = isLastCat ? '└── ' : '├── '
            const childIndent = isLastCat ? '    ' : '│   '
            const sortedPosts = [...groups[cat]].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )

            return (
              <div key={cat}>
                {/* Category folder */}
                <p className="text-zinc-500 select-none">
                  <span className="text-zinc-700">{catPrefix}</span>
                  <span className="text-zinc-400">{cat.toLowerCase()}/</span>
                </p>

                {/* Posts */}
                {sortedPosts.map((post, pi) => {
                  const isLastPost = pi === sortedPosts.length - 1
                  const filePrefix = childIndent + (isLastPost ? '└── ' : '├── ')

                  return (
                    <div key={post._meta.path}>
                      <Link
                        to="/posts/$slug"
                        params={{ slug: post.slug }}
                        className="group flex items-baseline gap-0 hover:no-underline"
                      >
                        <span className="text-zinc-700 select-none whitespace-pre">
                          {filePrefix}
                        </span>
                        <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                          {post.title}
                        </span>
                        <span className="text-zinc-600 ml-2 text-xs hidden group-hover:inline transition-all">
                          — {post.summary}
                        </span>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer hint */}
      <p className="font-mono text-zinc-700 text-xs mt-12">
        {posts.length} file{posts.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
