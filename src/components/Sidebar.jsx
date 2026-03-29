import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { buildNavTree } from '../lib/markdown'

const categoryOrder = ['nations', 'creatures', 'characters', 'lore', 'technology']

export default function Sidebar({ entries, open, onClose }) {
  const location = useLocation()
  const navTree = useMemo(() => buildNavTree(entries), [entries])

  const sortedCategories = Object.keys(navTree).sort(
    (a, b) => (categoryOrder.indexOf(a) === -1 ? 99 : categoryOrder.indexOf(a)) -
              (categoryOrder.indexOf(b) === -1 ? 99 : categoryOrder.indexOf(b))
  )

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-void/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-40 z-40
          transform
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}
      >
        <nav className="pt-40 p-2 space-y-2">
          {/* Navigation links */}
          <div className="space-y-0 mb-4">
            <Link
              to="/"
              onClick={onClose}
              className={`block px-2 py-1 ${
                location.pathname === '/' ? 'text-text bg-zinc-800 border-2 border-zinc-700' : 'text-text/70 hover:text-text hover:bg-zinc-800 border-2 border-transparent'
              }`}
            >
              Home
            </Link>
            <Link
              to="/map"
              onClick={onClose}
              className={`block px-2 py-1 ${
                location.pathname === '/map' ? 'text-text bg-zinc-800 border-2 border-zinc-700' : 'text-text/70 hover:text-text hover:bg-zinc-800 border-2 border-transparent'
              }`}
            >
              Map
            </Link>
            <Link
              to="/search"
              onClick={onClose}
              className={`block px-2 py-1 ${
                location.pathname === '/search' ? 'text-text bg-zinc-800 border-2 border-zinc-700' : 'text-text/70 hover:text-text hover:bg-zinc-800 border-2 border-transparent'
              }`}
            >
              Search
            </Link>
          </div>

          {/* Categories */}
          {sortedCategories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-2 text-text/50 tracking-wider mt-3 mb-1 px-2 capitalize border-l-2 border-transparent">
                <span>{category}</span>
              </div>
              <ul className="space-y-0">
                {navTree[category].map((entry) => {
                  const path = `/wiki/${entry.slug}`
                  const isActive = location.pathname === path
                  return (
                    <li key={entry.slug}>
                      <Link
                        to={path}
                        onClick={onClose}
                        className={`
                          block px-2 py-1
                          ${isActive
                            ? 'text-text bg-zinc-800 border-2 border-zinc-700'
                            : 'text-text/70 hover:text-text hover:bg-zinc-800 border-2 border-transparent'
                          }
                        `}
                      >
                        {entry.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
