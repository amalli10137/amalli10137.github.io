import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/config'

export async function generateMetadata(): Promise<Metadata> {
  const cfg = getSiteConfig()
  return { title: cfg.name, description: cfg.tagline }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = getSiteConfig()

  return (
    <html lang="en">
      <body style={{ position: 'relative' }}>
        <a href="/admin" className="admin-link">[admin]</a>
        <h1 style={{ margin: '0 0 0.1em', fontSize: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>{cfg.name}</Link>
        </h1>
        {cfg.tagline && <p style={{ margin: '0 0 0.8em', fontSize: '0.85em', color: '#888' }}>{cfg.tagline}</p>}
        {children}
      </body>
    </html>
  )
}
