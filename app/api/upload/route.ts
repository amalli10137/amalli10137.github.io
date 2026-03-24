import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_session')?.value === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'no file' }, { status: 400 })

  const ext = path.extname(file.name).toLowerCase()
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg']
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'unsupported file type' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const imagesDir = path.join(process.cwd(), 'public', 'images')
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true })

  // sanitize filename
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const dest = path.join(imagesDir, safeName)
  fs.writeFileSync(dest, buffer)

  return NextResponse.json({ path: `/images/${safeName}` })
}
