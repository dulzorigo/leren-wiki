import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify)

export async function renderMarkdown(content) {
  const result = await processor.process(content)
  return String(result)
}

export function buildNavTree(entries) {
  const tree = {}
  for (const entry of entries) {
    const parts = entry.slug.split('/')
    const category = parts[0]
    if (!tree[category]) tree[category] = []
    tree[category].push({
      slug: entry.slug,
      title: entry.frontmatter?.title || parts[parts.length - 1].replace(/-/g, ' '),
      frontmatter: entry.frontmatter || {},
    })
  }
  // Sort entries within each category
  for (const cat of Object.keys(tree)) {
    tree[cat].sort((a, b) => a.title.localeCompare(b.title))
  }
  return tree
}
