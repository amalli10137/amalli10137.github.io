import './blog.css'
import 'katex/dist/katex.min.css'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/config'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const cfg = getSiteConfig()

  return (
    <div className="blog-theme">
      <div className="blog-content">
        <h1 style={{ margin: '0 0 0.1em' }}>
          <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>{cfg.name}</Link>
        </h1>
        {cfg.tagline && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 0 0.8em' }}>
            <span style={{ fontSize: '0.85em', color: '#888' }}>{cfg.tagline}</span>
            <Link href="/" style={{ fontSize: '0.85em', color: '#888', flexShrink: 0 }}>home</Link>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
