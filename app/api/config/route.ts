import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSiteConfig, writeSiteConfig } from '@/lib/config'

function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get('admin_session')?.value === process.env.ADMIN_PASSWORD
}

export async function GET() {
  return NextResponse.json(getSiteConfig())
}

export async function PUT(req: Request) {
  const cookieStore = await cookies()
  if (!isAuthed(cookieStore)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json()
  const { name, tagline } = body
  if (!name?.trim()) return NextResponse.json({ error: 'name is required' }, { status: 400 })
  writeSiteConfig({ name: name.trim(), tagline: tagline?.trim() ?? '' })
  return NextResponse.json({ ok: true })
}
