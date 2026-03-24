'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    const meta = document.querySelector('meta[name="theme-color"]:not([media])') as HTMLMetaElement
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
      if (meta) meta.content = '#0f0e0d'
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
      if (meta) meta.content = '#f0ebe1'
    }
  }

  return (
    <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
      {dark ? '\u2600' : '\u263E'}
    </button>
  )
}
