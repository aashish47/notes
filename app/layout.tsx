import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A fast, static, MDX-powered personal knowledge base.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
