import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Projects — Anirudh Malli' }

export default function ProjectsPage() {
  return (
    <>
      <p className="page-title">projects</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <h2>project one</h2>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <h2>project two</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </>
  )
}
