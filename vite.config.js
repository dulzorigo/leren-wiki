import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'
import matter from 'gray-matter'

function wikiPlugin() {
  const virtualModuleId = 'virtual:wiki-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  function walkDir(dir, base = '') {
    const entries = []
    if (!fs.existsSync(dir)) return entries
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? `${base}/${item.name}` : item.name
      if (item.isDirectory()) {
        if (item.name === 'templates' || item.name === '.obsidian') continue
        entries.push(...walkDir(resolve(dir, item.name), rel))
      } else if (item.name.endsWith('.md')) {
        const content = fs.readFileSync(resolve(dir, item.name), 'utf-8')
        const { data: frontmatter, content: body } = matter(content)
        const slug = rel.replace(/\.md$/, '')
        entries.push({ slug, frontmatter, body, category: base.split('/')[0] || '' })
      }
    }
    return entries
  }

  return {
    name: 'wiki-plugin',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const wikiDir = resolve(process.cwd(), 'wiki')
        const entries = walkDir(wikiDir)
        return `export const wikiEntries = ${JSON.stringify(entries)};`
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('/wiki/') && file.endsWith('.md')) {
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), wikiPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
