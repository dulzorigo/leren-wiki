import { Routes, Route } from 'react-router-dom'
import { wikiEntries } from 'virtual:wiki-data'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WikiPage from './pages/WikiPage'
import MapPage from './pages/MapPage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout entries={wikiEntries} />}>
        <Route index element={<HomePage entries={wikiEntries} />} />
        <Route path="/search" element={<SearchPage entries={wikiEntries} />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/wiki/*" element={<WikiPage entries={wikiEntries} />} />
      </Route>
    </Routes>
  )
}
