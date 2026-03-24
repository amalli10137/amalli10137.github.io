import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getSiteConfig } from '@/lib/config'

export async function generateMetadata(): Promise<Metadata> {
  const cfg = getSiteConfig()
  return { title: cfg.name }
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <p>{posts.length} posts</p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            {' \u2014 '}
            {post.date}
          </li>
        ))}
        {posts.length === 0 && <li>no posts yet.</li>}
      </ul>
    </>
  )
}
