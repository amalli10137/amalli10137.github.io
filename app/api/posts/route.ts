import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

function isAuthed(): Promise<boolean> {
  return cookies().then(store => {
    const session = store.get('admin_session')
    return session?.value === process.env.ADMIN_PASSWORD
  })
}

const postsDir = path.join(process.cwd(), 'posts')

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { slug, content } = await req.json()

  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 })
  }

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  const filePath = path.join(postsDir, `${slug}.md`)
  fs.writeFileSync(filePath, content, 'utf8')

  return NextResponse.json({ ok: true })
}
