'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, AlertCircle, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    realName: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    // 验证密码
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('密码至少需要6个字符')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          realName: formData.realName || undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '注册失败')
      } else {
        setSuccess('注册成功！请前往登录页面登录')
        setTimeout(() => {
          router.push('/auth/signin')
        }, 2000)
      }
    } catch (error) {
      setError('注册失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">GNAO1患者之家</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">创建账户</h2>
          <p className="mt-2 text-sm text-gray-600">
            已有账户？{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              立即登录
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>注册新账户</CardTitle>
            <CardDescription>
              请填写以下信息来创建您的账户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">{success}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱地址 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入您的邮箱地址"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  用户名 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="请输入用户名"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="realName" className="block text-sm font-medium text-gray-700 mb-1">
                  真实姓名 <span className="text-gray-400">(可选)</span>
                </label>
                <Input
                  id="realName"
                  name="realName"
                  type="text"
                  value={formData.realName}
                  onChange={handleChange}
                  placeholder="请输入您的真实姓名"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  密码 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码（至少6个字符）"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  确认密码 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="请再次输入密码"
                  required
                  className="w-full"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-gray-700">
                  我同意{' '}
                  <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                    服务条款
                  </Link>
                  {' '}和{' '}
                  <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                    隐私政策
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? '注册中...' : '创建账户'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          注册即表示您理解并同意我们将按照隐私政策处理您的个人信息
        </div>
      </div>
    </div>
  )
}