'use client'

import { SessionProvider } from 'next-auth/react'
import Header from './Header'
import Footer from './Footer'
import { Session } from 'next-auth'

interface RootLayoutProps {
  children: React.ReactNode
  session?: Session | null
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  )
}