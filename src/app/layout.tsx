import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthGuard } from '@/components/Auth/AuthGuard'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OBE Dashboard - BTIK UDINUS',
  description: 'Dashboard untuk input nilai OBE (Outcome Based Education) - Frontend Developer Challenge',
  keywords: 'OBE, Dashboard, BTIK UDINUS, Grade Management, Education',
  authors: [{ name: 'Frontend Developer Challenge' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}