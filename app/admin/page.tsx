import { cookies } from 'next/headers'
import AdminClient from './AdminClient'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const isAuthed = session?.value === process.env.ADMIN_PASSWORD

  const posts = isAuthed ? getAllPosts() : []

  return <AdminClient isAuthed={isAuthed} posts={posts} />
}
