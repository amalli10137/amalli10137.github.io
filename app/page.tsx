import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      <p>{posts.length} posts</p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            {' \u2014 '}
            {post.date}
          </li>
        ))}
        {posts.length === 0 && <li>no posts yet.</li>}
      </ul>
    </>
  )
}
