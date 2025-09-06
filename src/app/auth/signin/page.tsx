'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, AlertCircle } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('邮箱或密码错误')
      } else {
        const session = await getSession()
        if (session) {
          router.push('/')
          router.refresh()
        }
      }
    } catch (error) {
      setError('登录失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=\"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8\">
      <div className=\"max-w-md w-full space-y-8\">
        <div className=\"text-center\">
          <Link href=\"/\" className=\"flex items-center justify-center space-x-2 mb-6\">
            <Heart className=\"h-8 w-8 text-red-500\" />
            <span className=\"text-2xl font-bold text-gray-900\">GNAO1患者之家</span>
          </Link>
          <h2 className=\"text-3xl font-bold text-gray-900\">登录账户</h2>
          <p className=\"mt-2 text-sm text-gray-600\">
            还没有账户？{' '}
            <Link href=\"/auth/signup\" className=\"font-medium text-blue-600 hover:text-blue-500\">
              立即注册
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>欢迎回来</CardTitle>
            <CardDescription>
              请输入您的邮箱和密码来登录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className=\"space-y-6\">
              {error && (
                <div className=\"flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md\">
                  <AlertCircle className=\"h-4 w-4\" />
                  <span className=\"text-sm\">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor=\"email\" className=\"block text-sm font-medium text-gray-700 mb-1\">
                  邮箱地址
                </label>
                <Input
                  id=\"email\"
                  type=\"email\"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=\"请输入您的邮箱地址\"
                  required
                  className=\"w-full\"
                />
              </div>

              <div>
                <label htmlFor=\"password\" className=\"block text-sm font-medium text-gray-700 mb-1\">
                  密码
                </label>
                <Input
                  id=\"password\"
                  type=\"password\"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=\"请输入您的密码\"
                  required
                  className=\"w-full\"
                />
              </div>

              <div className=\"flex items-center justify-between\">
                <div className=\"flex items-center\">
                  <input
                    id=\"remember-me\"
                    name=\"remember-me\"
                    type=\"checkbox\"
                    className=\"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded\"
                  />
                  <label htmlFor=\"remember-me\" className=\"ml-2 block text-sm text-gray-700\">
                    记住我
                  </label>
                </div>

                <div className=\"text-sm\">
                  <Link href=\"/auth/forgot-password\" className=\"font-medium text-blue-600 hover:text-blue-500\">
                    忘记密码？
                  </Link>
                </div>
              </div>

              <Button
                type=\"submit\"
                disabled={isLoading}
                className=\"w-full\"
                size=\"lg\"
              >
                {isLoading ? '登录中...' : '登录'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className=\"text-center text-sm text-gray-600\">
          登录即表示您同意我们的{' '}
          <Link href=\"/terms\" className=\"font-medium text-blue-600 hover:text-blue-500\">
            服务条款
          </Link>
          {' '}和{' '}
          <Link href=\"/privacy\" className=\"font-medium text-blue-600 hover:text-blue-500\">
            隐私政策
          </Link>
        </div>
      </div>
    </div>
  )
}