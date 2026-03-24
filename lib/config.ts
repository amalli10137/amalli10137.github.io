import fs from 'fs'
import path from 'path'

export interface SiteConfig {
  name: string
  tagline: string
}

const configPath = path.join(process.cwd(), 'site.config.json')

export function getSiteConfig(): SiteConfig {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'))
}

