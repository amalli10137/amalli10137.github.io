import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { renderMarkdown } from '@/lib/render'
import { getSiteConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const cfg = getSiteConfig()
  return { title: `${post.title} — ${cfg.name}` }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await renderMarkdown(post.content)

  return (
    <article>
      <p><Link href="/">← all posts</Link></p>
      <h2 style={{ fontSize: '1.3rem' }}>{post.title}</h2>
      <p>{post.date}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
