import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_session')?.value === process.env.ADMIN_PASSWORD
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthed())) {
    return new NextResponse('unauthorized', { status: 401 })
  }

  const { slug } = await params
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return new NextResponse('not found', { status: 404 })
  }

  const content = fs.readFileSync(filePath, 'utf8')
  return new NextResponse(content, { headers: { 'Content-Type': 'text/plain' } })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}
