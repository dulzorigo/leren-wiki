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
          fixed top-14 left-0 bottom-0 w-64 bg-abyss border-r border-border z-40
          transform
          lg:static lg:translate-x-0 lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}
      >
        <nav className="p-4 space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-2 text-muted font-medium uppercase tracking-wider mb-2 px-2">
                <span>{category}</span>
              </div>
              <ul className="space-y-0.5">
                {navTree[category].map((entry) => {
                  const path = `/wiki/${entry.slug}`
                  const isActive = location.pathname === path
                  return (
                    <li key={entry.slug}>
                      <Link
                        to={path}
                        onClick={onClose}
                        className={`
                          block px-3 py-1.5
                          ${isActive
                            ? 'text-cyan bg-deep border-l-2 border-cyan'
                            : 'text-text/70 hover:text-text hover:bg-surface border-l-2 border-transparent'
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
