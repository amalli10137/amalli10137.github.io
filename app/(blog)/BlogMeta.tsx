'use client'
import { useEffect } from 'react'

export default function BlogMeta() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]:not([media])') as HTMLMetaElement
    if (meta) meta.content = '#000000'
    return () => { if (meta) meta.content = '#0f0e0d' }
  }, [])
  return null
}
