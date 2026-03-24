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

export function writeSiteConfig(config: SiteConfig) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8')
}
