import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import TreeView from '@/components/tree-view'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <TreeView posts={allPosts} />
}
