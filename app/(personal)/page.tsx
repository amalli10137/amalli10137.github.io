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
          <p>{personal.bio}</p>
        </div>
      </div>
      <hr />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </>
  )
}
