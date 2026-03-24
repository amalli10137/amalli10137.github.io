import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f0e0d" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#0f0e0d" />
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.setAttribute('data-theme','dark')}else{document.querySelector('meta[name=theme-color]:not([media])').content='#f0ebe1'}}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
