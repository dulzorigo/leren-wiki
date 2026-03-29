import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { renderMarkdown } from '../lib/markdown'

export default function WikiPage({ entries }) {
  const location = useLocation()
  const slug = decodeURIComponent(location.pathname.replace('/wiki/', ''))
  const [html, setHtml] = useState('')

  const entry = useMemo(
    () => entries.find((e) => e.slug === slug),
    [entries, slug]
  )

  useEffect(() => {
    if (entry) {
      renderMarkdown(entry.body).then(setHtml)
    }
  }, [entry])

  if (!entry) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-2xl text-bright mb-4">Page Not Found</h1>
        <p className="text-muted mb-6">The entry "{slug}" does not exist in the archives.</p>
        <Link to="/" className="text-cyan hover:text-cyan-dim">
          Return to the index
        </Link>
      </div>
    )
  }

  const tags = entry.frontmatter?.tags || []
  const category = entry.slug.split('/')[0]

  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link to="/" className="hover:text-text">Home</Link>
        <span className="text-border">/</span>
        <span className="capitalize">{category}</span>
        <span className="text-border">/</span>
        <span className="text-text">{entry.frontmatter?.title || slug.split('/').pop()}</span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-deep text-cyan-dim border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Rendered markdown */}
      <div
        className="prose prose-wiki prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}
