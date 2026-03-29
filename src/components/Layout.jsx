import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ entries }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-abyss border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-muted hover:text-cyan"
              aria-label="Toggle navigation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 border border-cyan flex items-center justify-center">
                <span className="font-display text-cyan">L</span>
              </div>
              <span className="font-display text-bright text-lg tracking-wide hidden sm:inline">Leren</span>
            </Link>
          </div>

          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 ${
                location.pathname === '/' ? 'text-cyan bg-deep' : 'text-muted hover:text-text'
              }`}
            >
              Home
            </Link>
            <Link
              to="/map"
              className={`px-3 py-1.5 ${
                location.pathname === '/map' ? 'text-cyan bg-deep' : 'text-muted hover:text-text'
              }`}
            >
              Map
            </Link>
            <Link
              to="/search"
              className={`px-3 py-1.5 ${
                location.pathname === '/search' ? 'text-cyan bg-deep' : 'text-muted hover:text-text'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <Sidebar entries={entries} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
