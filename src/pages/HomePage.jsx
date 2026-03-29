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
    <div className="max-w-2xl mx-auto">
      {/* Category grid */}
      <div className="grid gap-4 sm:grid-cols-2 mb-16">
        {categories.map((category) => (
          <div
            key={category}
            className="group border-2 border-zinc-700 px-5 py-3 hover:border-zinc-600"
          >
            <h2 className="font-display text-text text-lg capitalize mb-1">
              {category}
            </h2>
            <p className="text-text/70 mb-3">
              {categoryDescriptions[category] || `Entries about ${category}`}
            </p>
            <ul className="space-y-1">
              {navTree[category].map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/wiki/${entry.slug}`}
                    className="text-text/70 hover:text-zinc-300 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-zinc-300" />
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
