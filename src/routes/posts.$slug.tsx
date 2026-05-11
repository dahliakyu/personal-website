import { Link, createFileRoute } from '@tanstack/react-router'
import { marked } from 'marked'
import { allPosts } from 'content-collections'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((post) => post.slug === params.slug)
    if (!post) throw new Error('Post not found')
    return post
  },
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="font-mono text-zinc-500 hover:text-zinc-300 text-sm transition-colors mb-8 inline-block"
        >
          ← ~/my-site
        </Link>

        <p className="font-mono text-xs text-zinc-600 mb-1">
          {post.categories?.[0]?.toLowerCase()}/
        </p>
        <h1 className="text-2xl font-semibold text-zinc-100 mb-1">{post.title}</h1>
        <p className="font-mono text-xs text-zinc-600 mb-8">{post.date}</p>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />
      </div>
    </div>
  )
}
