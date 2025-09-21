'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar, User, Eye, Bot, QrCode } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// 接口定义
interface Article {
  id: string
  title: string
  excerpt: string
  viewCount: number
  publishedAt: string
  isSticky: boolean
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

interface ArticleResponse {
  articles: Article[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const categories = [
  { name: '全部', slug: 'all' },
  { name: '研究进展', slug: 'research' },
  { name: '治疗进展', slug: 'treatment' },
  { name: '康复指南', slug: 'rehabilitation' },
  { name: '健康指导', slug: 'health' },
  { name: '会议活动', slug: 'events' }
]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // 加载文章数据
  useEffect(() => {
    loadArticles()
  }, [selectedCategory, currentPage])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/articles?${params}`)
      if (response.ok) {
        const data: ArticleResponse = await response.json()
        setArticles(data.articles)
        setTotalPages(data.pagination.totalPages)
      } else {
        console.error('加载文章失败')
        setArticles([])
      }
    } catch (error) {
      console.error('加载文章失败:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  // 搜索防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        loadArticles()
      } else {
        setCurrentPage(1)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const filteredArticles = articles.filter((article: Article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 将置顶文章排在前面
  const sortedArticles = filteredArticles.sort((a: Article, b: Article) => {
    if (a.isSticky && !b.isSticky) return -1
    if (!a.isSticky && b.isSticky) return 1
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              最新资讯
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              获取GNAO1相关的最新研究进展、治疗资讯和健康指导
            </p>
          </div>
        </div>
      </section>

      {/* AI工具推荐区域 */}
      <section className="py-8 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* 二维码图片 - 突出显示 */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center p-2 shadow-lg border border-purple-200">
                    <img 
                      src="/images/ima_gnao1.png" 
                      alt="腾讯IMA GNAO1知识库二维码" 
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>
                
                {/* 文字说明 - 简化样式 */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Bot className="h-5 w-5 text-purple-500" />
                    <h3 className="text-lg font-medium text-gray-800">GNAO1知识库</h3>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    想要通过AI工具了解更多我们积累的材料，请使用腾讯的 <span className="font-medium text-purple-600">IMA</span> 扫码添加<span className="font-medium text-purple-600">GNAO1 知识库</span>
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-purple-500">
                    <QrCode className="h-3 w-3" />
                    <span>扫码即可获得专业AI助手支持</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    或点击此链接：
                    <a 
                      href="https://ima.qq.com/wiki/?shareId=7a0b889748e383c148ea6fd2318bdaf0c19d2dd69c0db0dfcf2c5cccc93d9d78" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline hover:no-underline transition-colors ml-1"
                    >
                      腾讯IMA GNAO1知识库
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="搜索资讯..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {sortedArticles.length > 0 ? (
              <div className="space-y-6">
                {sortedArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {article.isSticky && (
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                置顶
                              </Badge>
                            )}
                            {article.category && (
                              <Badge variant="outline">
                                {article.category.name}
                              </Badge>
                            )}
                          </div>
                          <Link href={`/news/${article.id}`}>
                            <CardTitle className="text-xl hover:text-blue-600 transition-colors cursor-pointer">
                              {article.title}
                            </CardTitle>
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4 leading-relaxed">
                        {article.excerpt}
                      </CardDescription>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{article.author.username}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.viewCount}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link href={`/news/${article.id}`}>
                          <Button variant="outline" size="sm">
                            阅读全文
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">暂无相关资讯</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    上一页
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    下一页
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              订阅资讯更新
            </h2>
            <p className="text-gray-600 mb-8">
              及时获得最新的研究进展和重要资讯
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="请输入您的邮箱地址"
                className="flex-1"
              />
              <Button>订阅</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}