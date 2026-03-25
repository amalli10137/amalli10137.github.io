import type { Metadata } from 'next'
import personal from '@/personal.config.json'

export const metadata: Metadata = { title: personal.name }

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <img src="/images/profile.jpg" alt={personal.name} className="profile-image" />
        <div>
          <p className="tagline">{personal.tagline}</p>
          <div className="hero-links">
            <a href={`mailto:${personal.links.email}`} title="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: '-2px'}}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
              {' '}amalli7 [at] gatech [dot] edu
            </a>
            <a href={personal.links.github} title="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: '-2px'}}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              {' '}github
            </a>
            <a href={personal.links.linkedin} title="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: '-2px'}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {' '}linkedin
            </a>
            <a href="/resume.pdf" title="Resume">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: '-2px'}}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              {' '}resume
            </a>
          </div>
        </div>
      </div>
      <hr />

      {/* ---- REPLACE EVERYTHING BELOW WITH YOUR OWN CONTENT ---- */}

      <h2>about me</h2>
      <p>
        Hi! I'm Anirudh. I'm a [your year] at [your university] studying [your major].
        I'm interested in [your interests — e.g. machine learning, physics, systems programming].
      </p>
      <p>
        Previously, I [brief experience — e.g. interned at X, worked on Y research, built Z].
        In my free time I enjoy [hobbies — e.g. hiking, reading, tinkering with side projects].
      </p>

      <h2>what I'm working on</h2>
      <p>
        Right now I'm focused on [current focus — e.g. a research project, a class, job search, a side project].
        You can read more on my <a href="/projects">projects</a> and <a href="/research">research</a> pages,
        or check out what I've been thinking about on my <a href="/blog">blog</a>.
      </p>
    </>
  )
}
