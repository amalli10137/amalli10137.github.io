import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
