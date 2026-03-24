import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md') && !f.startsWith('_'))

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, excerpt } = matter(fileContents, { excerpt: true })

    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      excerpt: excerpt || data.excerpt || '',
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : '',
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    excerpt: data.excerpt || '',
    content,
  }
}

