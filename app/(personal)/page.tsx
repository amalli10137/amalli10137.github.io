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
          <p className="hero-links">
            <a href={`mailto:${personal.links.email}`}>{personal.links.email}</a>
            {' · '}
            <a href={personal.links.github}>github</a>
            {' · '}
            <a href="/resume.pdf">resume</a>
            {/* Add LinkedIn: <a href="https://linkedin.com/in/yourname">linkedin</a> */}
          </p>
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
