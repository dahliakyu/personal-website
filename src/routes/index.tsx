import { createFileRoute } from '@tanstack/react-router'
import { allPosts, type Post } from 'content-collections'
import TreeView from '@/components/tree-view'
import Draggable from 'react-draggable'
import { useRef, useState } from 'react'

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

  const [position1, setPosition1] = useState({ x: 0, y: 0 })
  const [position2, setPosition2] = useState({ x: 0, y: 0 })

  const handleReset = () => {
    setPosition1({ x: 0, y: 0 })
    setPosition2({ x: 0, y: 0 })
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 p-4 sm:p-8">
      <div className="group absolute top-4 right-4">
        <button
          onClick={handleReset}
          className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer overflow-hidden"
        >
          <img src="/frog_reset.png" alt="Reset Grid" className="w-full h-full object-cover" />

        </button>
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Reset Grid
        </span>
      </div>
      <div className="flex flex-wrap gap-8">
        <Draggable
          nodeRef={nodeRef1}
          handle=".drag-handle"
          position={position1}
          onStop={(e, data) => setPosition1({ x: data.x, y: data.y })}
        >
          <div ref={nodeRef1}>
            <TreeView posts={allPosts} siteName="~/personal-website" />
          </div>
        </Draggable>
        <Draggable
          nodeRef={nodeRef2}
          handle=".drag-handle"
          position={position2}
          onStop={(e, data) => setPosition2({ x: data.x, y: data.y })}
        >
          <div ref={nodeRef2}>
            <TreeView posts={placeholderPosts} siteName="~/common-place" />
          </div>
        </Draggable>
      </div>
    </div>
  )
}
