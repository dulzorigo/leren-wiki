import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'

export default function SearchPage({ entries }) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: 'frontmatter.title', weight: 2 },
          { name: 'frontmatter.tags', weight: 1.5 },
          { name: 'body', weight: 1 },
        ],
        threshold: 0.3,
        includeMatches: true,
      }),
    [entries]
  )

  const results = query.length > 1 ? fuse.search(query) : []

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set()
    entries.forEach((e) => (e.frontmatter?.tags || []).forEach((t) => tags.add(t)))
    return [...tags].sort()
  }, [entries])

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl text-text mb-6">Search the Archives</h1>

      {/* Search input */}
      <div className="relative mb-8">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entries, tags, content..."
          className="w-full bg-zinc-900 border-2 border-zinc-800 pl-10 pr-4 py-2.5 text-text placeholder-text/50 focus:outline-none focus:border-zinc-300"
          autoFocus
        />
      </div>

      {/* Tags cloud */}
      {query.length < 2 && allTags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-text uppercase tracking-wider mb-3">Browse by tag</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-zinc-800 text-text border-2 border-zinc-700 hover:border-zinc-600 capitalize"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query.length > 1 && (
        <div>
          <p className="text-text/50 mb-4">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
          <div className="space-y-3">
            {results.map(({ item }) => (
              <Link
                key={item.slug}
                to={`/wiki/${item.slug}`}
                className="block border-2 border-zinc-700 p-4 hover:border-zinc-600 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-text group-hover:text-zinc-300 font-medium">
                      {item.frontmatter?.title || item.slug.split('/').pop()}
                    </h3>
                    <p className="text-text/50 capitalize mt-0.5">
                      {item.slug.split('/')[0]}
                    </p>
                    {item.frontmatter?.description && (
                      <p className="text-text/60 mt-1 line-clamp-2">
                        {item.frontmatter.description}
                      </p>
                    )}
                  </div>
                  {(item.frontmatter?.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 shrink-0">
                      {item.frontmatter.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-zinc-800 text-text border-2 border-zinc-700 capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
