import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { buildNavTree } from '../lib/markdown'

const categoryDescriptions = {
  nations: 'Sovereign territories and their histories',
  creatures: 'Beings that roam the world of Leren',
  characters: 'Figures who shape the fate of nations',
  lore: 'Myths, legends, and ancient knowledge',
  technology: 'Innovations that drive civilisation forward',
}

export default function HomePage({ entries }) {
  const navTree = useMemo(() => buildNavTree(entries), [entries])
  const categories = Object.keys(navTree)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center py-16 lg:py-24">
        <div className="w-20 h-20 border-2 border-cyan flex items-center justify-center mx-auto mb-8">
          <span className="font-display text-cyan text-3xl glow-text">L</span>
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-bright tracking-wide glow-text mb-4">
          The World of Leren
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          A living compendium of nations, creatures, lore, and the technologies
          that bind them. Every entry is a thread in the fabric of this world.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/search"
            className="px-5 py-2 border border-cyan text-cyan hover:bg-deep"
          >
            Search the Archives
          </Link>
          <Link
            to="/map"
            className="px-5 py-2 border border-border text-muted hover:border-border-bright hover:text-text"
          >
            View the Map
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted uppercase tracking-widest">Index</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Category grid */}
      <div className="grid gap-4 sm:grid-cols-2 mb-16">
        {categories.map((category) => (
          <div
            key={category}
            className="group border border-border p-5 hover:border-border-bright"
          >
            <h2 className="font-display text-bright text-lg capitalize mb-1">
              {category}
            </h2>
            <p className="text-muted mb-3">
              {categoryDescriptions[category] || `Entries about ${category}`}
            </p>
            <ul className="space-y-1">
              {navTree[category].map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/wiki/${entry.slug}`}
                    className="text-text/70 hover:text-cyan flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-cyan" />
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center pb-16">
        <p className="text-muted/60">
          This archive grows with each discovery. Add entries to the vault and they shall appear here.
        </p>
      </div>
    </div>
  )
}
