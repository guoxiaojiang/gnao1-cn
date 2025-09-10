'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar, User, Eye, Bot, QrCode } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// 模拟数据，实际应用中应该从数据库获取
const mockArticles = [
  {
    id: '1',
    title: 'GNAO1基因治疗研究获得重大突破',
    excerpt: '最新研究表明，基因治疗技术在GNAO1相关疾病治疗中显示出巨大潜力...',
    content: '',
    coverImage: null,
    author: { username: '研究团队', avatar: null },
    publishedAt: new Date('2024-01-15'),
    viewCount: 1520,
    category: { name: '研究进展', slug: 'research' },
    tags: [{ name: '基因治疗' }, { name: '突破性进展' }],
    isSticky: true
  },
  {
    id: '2',
    title: '2024年GNAO1国际研讨会即将召开',
    excerpt: '全球GNAO1研究专家将齐聚一堂，分享最新的研究成果和治疗经验...',
    content: '',
    coverImage: null,
    author: { username: '会议组委会', avatar: null },
    publishedAt: new Date('2024-01-10'),
    viewCount: 856,
    category: { name: '会议活动', slug: 'events' },
    tags: [{ name: '国际会议' }, { name: '学术交流' }],
    isSticky: false
  },
  {
    id: '3',
    title: '新型抗癫痫药物在GNAO1患者中的应用',
    excerpt: '临床试验结果显示，新型抗癫痫药物对GNAO1相关癫痫具有良好的控制效果...',
    content: '',
    coverImage: null,
    author: { username: '医学专家', avatar: null },
    publishedAt: new Date('2024-01-08'),
    viewCount: 1245,
    category: { name: '治疗进展', slug: 'treatment' },
    tags: [{ name: '药物治疗' }, { name: '临床试验' }],
    isSticky: false
  },
  {
    id: '4',
    title: '家庭康复训练指南：如何在家进行有效的康复训练',
    excerpt: '专业康复师分享在家进行康复训练的实用方法和注意事项...',
    content: '',
    coverImage: null,
    author: { username: '康复专家', avatar: null },
    publishedAt: new Date('2024-01-05'),
    viewCount: 2134,
    category: { name: '康复指南', slug: 'rehabilitation' },
    tags: [{ name: '家庭康复' }, { name: '实用指南' }],
    isSticky: false
  },
  {
    id: '5',
    title: 'GNAO1患者营养管理的重要性',
    excerpt: '合理的营养管理对GNAO1患者的康复和生活质量改善具有重要意义...',
    content: '',
    coverImage: null,
    author: { username: '营养师', avatar: null },
    publishedAt: new Date('2024-01-03'),
    viewCount: 967,
    category: { name: '健康指导', slug: 'health' },
    tags: [{ name: '营养管理' }, { name: '健康指导' }],
    isSticky: false
  }
]

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
  const [articles, setArticles] = useState(mockArticles)

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category.slug === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 将置顶文章排在前面
  const sortedArticles = filteredArticles.sort((a, b) => {
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
                            <Badge variant="outline">
                              {article.category.name}
                            </Badge>
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

            {/* Pagination - 实际应用中需要实现分页逻辑 */}
            {sortedArticles.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    上一页
                  </Button>
                  <Button variant="default" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
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