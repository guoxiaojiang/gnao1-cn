'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Eye, Share2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import dynamic from 'next/dynamic'

// 动态导入markdown渲染器
const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  { ssr: false }
)

interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage?: string
  viewCount: number
  publishedAt: string
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

export default function ArticleDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadArticle()
  }, [params.id])

  const loadArticle = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/articles/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data.article)
      } else {
        setError('文章不存在或已被删除')
      }
    } catch (error) {
      console.error('加载文章失败:', error)
      setError('加载文章失败')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // 如果分享失败，复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href)
        alert('链接已复制到剪贴板')
      }
    } else {
      // 备用方案：复制链接
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '文章不存在'}</p>
          <Link href="/news">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回资讯列表
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回资讯列表
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Cover Image */}
            {article.coverImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  {article.category && (
                    <Badge variant="outline">
                      {article.category.name}
                    </Badge>
                  )}
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                
                <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                  {article.title}
                </CardTitle>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{article.author.realName || article.author.username}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.viewCount} 次阅读</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Article Body */}
            <Card>
              <CardContent className="p-6 md:p-8">
                {article.excerpt && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                    <p className="text-blue-800 font-medium">文章摘要</p>
                    <p className="text-blue-700 mt-2">{article.excerpt}</p>
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <MDPreview 
                    source={article.content} 
                    style={{ whiteSpace: 'pre-wrap' }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Footer Actions */}
            <div className="mt-8 flex justify-center">
              <Link href="/news">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回资讯列表
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
