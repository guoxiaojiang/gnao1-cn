'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  LogOut, 
  Search,
  Calendar,
  User
} from 'lucide-react'
import dynamic from 'next/dynamic'

// 动态导入富文本编辑器，避免SSR问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'REVIEWING' | 'ARCHIVED'
  isSticky: boolean
  viewCount: number
  publishedAt?: string
  createdAt: string
  author: {
    username: string
    realName?: string
  }
  category?: {
    name: string
    slug: string
  }
  tags: {
    name: string
    slug: string
  }[]
}

// 登录组件
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        onLogin()
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">GNAO1后台管理</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// 文章编辑器组件
function ArticleEditor({ 
  article, 
  onSave, 
  onCancel 
}: { 
  article?: Article
  onSave: (article: any) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    coverImage: article?.coverImage || '',
    status: article?.status || 'DRAFT',
    isSticky: article?.isSticky || false,
    tags: article?.tags?.map(tag => tag.name).join(', ') || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    onSave(articleData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {article ? '编辑文章' : '创建文章'}
        </h2>
        <Button variant="outline" onClick={onCancel}>
          返回列表
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">状态</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: string) => setFormData(prev => ({ ...prev, status: value as 'DRAFT' | 'PUBLISHED' | 'REVIEWING' | 'ARCHIVED' }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">草稿</SelectItem>
                <SelectItem value="PUBLISHED">已发布</SelectItem>
                <SelectItem value="REVIEWING">审核中</SelectItem>
                <SelectItem value="ARCHIVED">已归档</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">摘要</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="tags">标签（用逗号分隔）</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="例如：基因治疗, 突破性进展"
          />
        </div>

        <div>
          <Label htmlFor="coverImage">封面图片URL</Label>
          <Input
            id="coverImage"
            value={formData.coverImage}
            onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
            placeholder="可选"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isSticky"
            checked={formData.isSticky}
            onChange={(e) => setFormData(prev => ({ ...prev, isSticky: e.target.checked }))}
          />
          <Label htmlFor="isSticky">置顶文章</Label>
        </div>

        <div>
          <Label>内容</Label>
          <div className="border rounded-md overflow-hidden">
            <MDEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value || '' }))}
              preview="edit"
              height={400}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            {article ? '更新文章' : '创建文章'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function NewsPublishPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'create'>('list')
  const [editingArticle, setEditingArticle] = useState<Article | undefined>()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // 检查登录状态
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // 加载文章列表
  useEffect(() => {
    if (isLoggedIn && currentView === 'list') {
      loadArticles()
    }
  }, [isLoggedIn, currentView])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/articles')
      if (response.ok) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('检查登录状态失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadArticles = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      const response = await fetch(`/api/admin/articles?${params}`)
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('加载文章失败:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      setIsLoggedIn(false)
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  const handleSaveArticle = async (articleData: any) => {
    try {
      const url = editingArticle 
        ? `/api/admin/articles/${editingArticle.id}`
        : '/api/admin/articles'
      
      const method = editingArticle ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      })

      if (response.ok) {
        setCurrentView('list')
        setEditingArticle(undefined)
        loadArticles()
      } else {
        console.error('保存文章失败')
      }
    } catch (error) {
      console.error('保存文章失败:', error)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadArticles()
      }
    } catch (error) {
      console.error('删除文章失败:', error)
    }
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>加载中...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />
  }

  if (currentView === 'edit' || currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <ArticleEditor
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={() => {
              setCurrentView('list')
              setEditingArticle(undefined)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              GNAO1资讯管理后台
            </h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              登出
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="DRAFT">草稿</SelectItem>
              <SelectItem value="PUBLISHED">已发布</SelectItem>
              <SelectItem value="REVIEWING">审核中</SelectItem>
              <SelectItem value="ARCHIVED">已归档</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => setCurrentView('create')}
            className="whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            创建文章
          </Button>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {article.isSticky && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700">
                            置顶
                          </Badge>
                        )}
                        <Badge 
                          variant={article.status === 'PUBLISHED' ? 'default' : 'secondary'}
                        >
                          {article.status === 'DRAFT' && '草稿'}
                          {article.status === 'PUBLISHED' && '已发布'}
                          {article.status === 'REVIEWING' && '审核中'}
                          {article.status === 'ARCHIVED' && '已归档'}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{article.author.realName || article.author.username}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.viewCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingArticle(article)
                          setCurrentView('edit')
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除</AlertDialogTitle>
                            <AlertDialogDescription>
                              此操作不可撤销。确定要删除文章 "{article.title}" 吗？
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteArticle(article.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">暂无文章</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}