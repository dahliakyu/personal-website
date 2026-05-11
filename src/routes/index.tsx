import { createFileRoute } from '@tanstack/react-router'
import { allPosts, type Post } from 'content-collections'
import TreeView from '@/components/tree-view'
import Draggable from 'react-draggable'
import { useRef } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

const placeholderPosts: Post[] = [
  {
    _meta: {
      path: 'placeholder-1',
      directory: 'placeholder',
      extension: 'md',
      fileName: 'placeholder-1.md',
      name: 'Placeholder 1',
    },
    title: 'Tech Talks',
    summary: 'Summaries of interesting tech talks.',
    categories: ['Summaries'],
    slug: 'tech-talks',
    image: '',
    date: '2026-01-01',
    content: '',
  },
  {
    _meta: {
      path: 'placeholder-2',
      directory: 'placeholder',
      extension: 'md',
      fileName: 'placeholder-2.md',
      name: 'Placeholder 2',
    },
    title: 'Book Notes',
    summary: 'Notes from books I have read.',
    categories: ['Notes'],
    slug: 'book-notes',
    image: '',
    date: '2026-01-02',
    content: '',
  },
]

function App() {
  const nodeRef1 = useRef(null)
  const nodeRef2 = useRef(null)

  return (
    <div className="min-h-screen bg-zinc-950 relative p-4 sm:p-8 overflow-hidden">
        {/* Panel 1 */}
        <Draggable nodeRef={nodeRef1} handle=".drag-handle">
            <div
              ref={nodeRef1}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         md:left-1/2 md:-translate-x-[calc(100%+32px)] md:-translate-y-1/2"
            >
                <TreeView posts={allPosts} siteName="~/personal-website" />
            </div>
        </Draggable>

        {/* Panel 2 */}
        <Draggable nodeRef={nodeRef2} handle=".drag-handle">
            <div
              ref={nodeRef2}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         md:left-1/2 md:translate-x-[32px] md:-translate-y-1/2"
            >
                <TreeView posts={placeholderPosts} siteName="~/common-place" />
            </div>
        </Draggable>
    </div>
  )
}
