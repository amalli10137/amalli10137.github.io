import './personal.css'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import ThemeToggle from './ThemeToggle'

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  const cfg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'personal.config.json'), 'utf8'))
  return (
    <div className="personal-theme">
      <div className="content">
        <nav>
          <span className="nav-name">{cfg.name}</span>
          <div className="nav-links">
            <Link href="/">about</Link>
            <Link href="/projects">projects</Link>
            <Link href="/research">research</Link>
            <Link href="/blog">blog</Link>
            <ThemeToggle />
          </div>
        </nav>
        {children}
      </div>
    </div>
  )
}
