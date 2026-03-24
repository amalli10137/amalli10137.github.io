'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface Props { isAuthed: boolean; posts: PostMeta[] }

/* ─── Login ──────────────────────────────────────────────── */
function LoginForm() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) window.location.reload()
    else setError('wrong password')
  }

  return (
    <div style={{ maxWidth: 340 }}>
      <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1.2rem', color: 'var(--muted)' }}>admin login</p>
      {error && <p className="msg error">{error}</p>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pw">password</label>
          <input id="pw" type="password" value={pw} onChange={e => setPw(e.target.value)} autoFocus />
        </div>
        <button type="submit">enter</button>
      </form>
    </div>
  )
}

/* ─── Toolbar ────────────────────────────────────────────── */
const TOOLBAR = [
  { label: 'B',    title: 'Bold',          wrap: ['**','**'] as [string,string] },
  { label: 'I',    title: 'Italic',        wrap: ['_','_'] as [string,string] },
  { label: 'H2',   title: 'Heading 2',     block: '## ' },
  { label: 'H3',   title: 'Heading 3',     block: '### ' },
  { label: 'link', title: 'Link',          snippet: '[§](url)' },
  { label: 'img',  title: 'Image',         snippet: '![alt](§)' },
  { label: '`c`',  title: 'Inline code',   wrap: ['`','`'] as [string,string] },
  { label: 'pre',  title: 'Code block',    snippet: '```\n§\n```' },
  { label: '> ',   title: 'Blockquote',    block: '> ' },
  { label: '- ',   title: 'List',          block: '- ' },
  { label: '$x$',  title: 'Inline math',   wrap: ['$','$'] as [string,string] },
  { label: '$$',   title: 'Display math',  snippet: '$$\n§\n$$' },
  { label: '---',  title: 'Divider',       snippet: '\n---\n' },
]

/* ─── Posts tab ──────────────────────────────────────────── */
const BLANK = (date: string) => `---\ntitle: \ndate: "${date}"\n---\n\n`

function PostsTab({ initialPosts }: { initialPosts: PostMeta[] }) {
  const today = new Date().toISOString().slice(0, 10)
  const [posts, setPosts] = useState(initialPosts)
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState(BLANK(today))
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState<'success'|'error'>('success')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function applyAction(action: typeof TOOLBAR[number]) {
    const ta = taRef.current
    if (!ta) return
    const start = ta.selectionStart, end = ta.selectionEnd
    const sel = content.slice(start, end)
    let next = content, cursor = start

    if ('wrap' in action && action.wrap) {
      const [pre, post] = action.wrap
      next = content.slice(0, start) + pre + sel + post + content.slice(end)
      cursor = start + pre.length + sel.length + post.length
    } else if ('block' in action && action.block) {
      const lineStart = content.lastIndexOf('\n', start - 1) + 1
      next = content.slice(0, lineStart) + action.block + content.slice(lineStart)
      cursor = start + action.block.length
    } else if ('snippet' in action && action.snippet) {
      const snip = action.snippet.replace('§', sel || '')
      const cur = action.snippet.indexOf('§')
      next = content.slice(0, start) + snip + content.slice(end)
      cursor = start + (cur >= 0 ? cur : snip.length)
    }

    setContent(next)
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(cursor, cursor) })
  }

  async function loadPost(p: PostMeta) {
    setMsg(''); setSaved(false)
    const res = await fetch(`/api/posts/${p.slug}`)
    if (res.ok) { setSlug(p.slug); setContent(await res.text()) }
    else { setMsg('failed to load post'); setMsgType('error') }
  }

  function newPost() { setSlug(''); setContent(BLANK(today)); setMsg(''); setSaved(false) }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMsg('')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content }),
    })
    setSaving(false)
    if (res.ok) {
      setMsg('saved.'); setMsgType('success'); setSaved(true)
    } else {
      const d = await res.json().catch(() => ({}))
      setMsg(d.error || 'save failed'); setMsgType('error')
    }
  }

  async function handleDelete(p: PostMeta) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/posts/${p.slug}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts(prev => prev.filter(x => x.slug !== p.slug))
      if (slug === p.slug) newPost()
      setMsg(`deleted "${p.title}"`); setMsgType('success')
    } else {
      setMsg('delete failed'); setMsgType('error')
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const form = new FormData(); form.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    setUploading(false)
    if (res.ok) {
      const { path } = await res.json()
      applyAction({ label: '', title: '', snippet: `![](${path})` })
    } else { setMsg('upload failed'); setMsgType('error') }
    e.target.value = ''
  }

  return (
    <>
      <ul className="admin-post-list">
        {posts.map(p => (
          <li key={p.slug}>
            <div className="post-info">
              <button className="link-btn" onClick={() => loadPost(p)}>{p.title}</button>
              <span className="meta">{p.date}</span>
            </div>
            <button className="btn-delete" onClick={() => handleDelete(p)}>[delete]</button>
          </li>
        ))}
        <li>
          <button className="link-btn" onClick={newPost}>+ new post</button>
          <span />
        </li>
      </ul>

      {msg && <p className={`msg ${msgType}`}>{msg}</p>}

      <form className="admin-form" onSubmit={handleSave}>
        <div>
          <label htmlFor="slug">slug</label>
          <input
            id="slug" type="text" value={slug}
            onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'))}
            placeholder="my-post-slug"
          />
        </div>
        <div>
          <label>content (markdown + frontmatter)</label>
          <div className="admin-toolbar">
            {TOOLBAR.map(a => (
              <button key={a.label} type="button" title={a.title} onClick={() => applyAction(a)}>{a.label}</button>
            ))}
            <button type="button" title="Upload image" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? '…' : '⬆ img'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
          </div>
          <textarea ref={taRef} value={content} onChange={e => setContent(e.target.value)} spellCheck={false} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" disabled={saving}>{saving ? 'saving…' : 'save post'}</button>
          {saved && slug && <Link href={`/posts/${slug}`} style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>view →</Link>}
        </div>
      </form>

      <div className="admin-hint">
        <strong>quick reference</strong><br />
        <code>**bold**</code> · <code>_italic_</code> · <code>## heading</code> · <code>[text](url)</code> · <code>![alt](/images/file.jpg)</code><br />
        inline math: <code>$x^2$</code> · display: <code>{'$$\\int f\\,dx$$'}</code> · code: <code>{'```lang'}</code>
      </div>
    </>
  )
}

/* ─── Settings tab ───────────────────────────────────────── */
function SettingsTab() {
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState<'success'|'error'>('success')

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(cfg => {
      setName(cfg.name ?? ''); setTagline(cfg.tagline ?? ''); setLoading(false)
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, tagline }),
    })
    if (res.ok) { setMsg('saved.'); setMsgType('success') }
    else { setMsg('save failed'); setMsgType('error') }
  }

  if (loading) return <p style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--muted)' }}>loading…</p>

  return (
    <>
      {msg && <p className={`msg ${msgType}`}>{msg}</p>}
      <form className="admin-form" onSubmit={handleSave}>
        <div>
          <label htmlFor="site-name">site name</label>
          <input id="site-name" type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="site-tagline">tagline</label>
          <input id="site-tagline" type="text" value={tagline} onChange={e => setTagline(e.target.value)} />
        </div>
        <button type="submit">save settings</button>
      </form>
      <p style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '1rem' }}>
        Changes take effect on next page load.
      </p>
    </>
  )
}

/* ─── Main admin ─────────────────────────────────────────── */
function AdminPanel({ posts }: { posts: PostMeta[] }) {
  const [tab, setTab] = useState<'posts'|'settings'>('posts')

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    window.location.reload()
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div className="admin-tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>
          <button className={`admin-tab ${tab === 'posts' ? 'active' : ''}`} onClick={() => setTab('posts')}>posts</button>
          <button className={`admin-tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>settings</button>
        </div>
        <button onClick={handleLogout} className="btn-sm">log out</button>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.2rem' }}>
        {tab === 'posts' ? <PostsTab initialPosts={posts} /> : <SettingsTab />}
      </div>
    </>
  )
}

export default function AdminClient({ isAuthed, posts }: Props) {
  return isAuthed ? <AdminPanel posts={posts} /> : <LoginForm />
}
