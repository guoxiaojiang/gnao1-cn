'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Menu, X, Brain, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // 判断导航项是否处于活跃状态
  const isActiveNav = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const navigation = [
    { name: '首页', href: '/' },
    { name: '关于GNAO1', href: '/about' },
    { name: '最新资讯', href: '/news' },
    { name: '社区论坛', href: '/forum' }
    // { name: '资助我们', href: '/donate' } // 暂时隐藏
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GNAO1患者之家
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:ml-8 md:space-x-8">
          {navigation.map((item) => {
            const isActive = isActiveNav(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary relative px-2 py-1 rounded-md ${
                  isActive 
                    ? 'text-blue-600 font-bold bg-blue-50 shadow-sm' 
                    : 'text-muted-foreground hover:bg-gray-50'
                }`}
              >
                {item.name}
                {/* 活跃状态指示器 - 更加明显 */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-600 rounded-full shadow-sm" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Actions */}
        <div className="ml-auto flex items-center space-x-4">
          {status === 'loading' ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          ) : session ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:block text-sm text-muted-foreground">
                欢迎，{session.user.username}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:block">退出</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  <span className="ml-2 hidden sm:block">登录</span>
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  <span className="hidden sm:block">注册</span>
                  <span className="sm:hidden">注册</span>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t">
            {navigation.map((item) => {
              const isActive = isActiveNav(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-bold border-l-4 border-blue-600 shadow-sm'
                      : 'text-muted-foreground hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {/* 移动端活跃状态指示器 */}
                  {isActive && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header