'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  User, 
  Eye, 
  ArrowLeft, 
  Share2, 
  Heart,
  MessageSquare,
  ChevronRight
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

// 模拟数据 - 实际应用中应该从数据库获取
const mockArticles = {
  '1': {
    id: '1',
    title: 'GNAO1基因治疗研究获得重大突破',
    content: `
      <div class="prose max-w-none">
        <p class="lead">最新研究表明，基因治疗技术在GNAO1相关疾病治疗中显示出巨大潜力，为患者家庭带来了新的希望。</p>
        
        <h2>研究背景</h2>
        <p>GNAO1相关疾病是一种罕见的神经发育障碍，由GNAO1基因突变引起。传统治疗方法主要以症状管理为主，缺乏针对病因的根本性治疗手段。</p>
        
        <h2>突破性进展</h2>
        <p>由国际研究团队牵头的最新研究显示，通过基因编辑技术，科学家们成功在实验室模型中修复了GNAO1基因突变，恢复了正常的蛋白质功能。</p>
        
        <blockquote class="border-l-4 border-blue-500 pl-4 italic bg-blue-50 p-4 my-6">
          "这项研究成果为GNAO1患者带来了前所未有的治疗希望，我们正在积极推进临床试验的准备工作。" 
          <footer class="text-sm text-gray-600 mt-2">— 主要研究者 Dr. Sarah Chen</footer>
        </blockquote>
        
        <h2>技术细节</h2>
        <ul>
          <li><strong>基因编辑技术</strong>：使用CRISPR-Cas9系统精确修复突变基因</li>
          <li><strong>递送系统</strong>：开发了新型病毒载体，提高基因治疗的安全性和有效性</li>
          <li><strong>靶向精准</strong>：针对不同类型的GNAO1突变设计个性化治疗方案</li>
        </ul>
        
        <h2>临床意义</h2>
        <p>这项突破性研究为GNAO1患者提供了以下希望：</p>
        <ol>
          <li>从根本上治疗疾病，而非仅仅控制症状</li>
          <li>可能阻止或逆转疾病进展</li>
          <li>显著改善患者的生活质量</li>
          <li>减轻家庭的经济和心理负担</li>
        </ol>
        
        <h2>下一步计划</h2>
        <p>研究团队计划在2025年启动临床试验，预计将招募50名GNAO1患者参与。试验将分为三个阶段：</p>
        <ol>
          <li><strong>安全性评估</strong>：确保治疗方法的安全性</li>
          <li><strong>有效性验证</strong>：评估治疗效果</li>
          <li><strong>长期跟踪</strong>：监测治疗的长期效果</li>
        </ol>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-2">重要提醒</h3>
          <p class="text-yellow-700">虽然研究结果令人鼓舞，但基因治疗仍在实验阶段。患者和家属应继续遵循现有的治疗方案，并在医生指导下密切关注临床试验的进展。</p>
        </div>
        
        <h2>参与机会</h2>
        <p>对于有意参与临床试验的患者家庭，可以通过以下方式获取更多信息：</p>
        <ul>
          <li>联系我们的客服团队</li>
          <li>关注官方网站的最新公告</li>
          <li>参加相关的学术会议和患者活动</li>
        </ul>
      </div>
    `,
    excerpt: '最新研究表明，基因治疗技术在GNAO1相关疾病治疗中显示出巨大潜力...',
    coverImage: '/images/gene-therapy.jpg', // 需要添加的图片
    author: { 
      username: '研究团队', 
      avatar: '/images/avatars/research-team.jpg' // 需要添加的头像
    },
    publishedAt: new Date('2024-01-15T10:30:00'),
    viewCount: 1520,
    category: { name: '研究进展', slug: 'research' },
    tags: [{ name: '基因治疗' }, { name: '突破性进展' }, { name: '临床试验' }],
    isSticky: true
  },
  '2': {
    id: '2',
    title: '2024年GNAO1国际研讨会即将召开',
    content: `
      <div class="prose max-w-none">
        <p class="lead">全球GNAO1研究专家将齐聚一堂，分享最新的研究成果和治疗经验。</p>
        
        <h2>会议信息</h2>
        <ul>
          <li><strong>时间</strong>：2024年3月15-17日</li>
          <li><strong>地点</strong>：北京国际会议中心</li>
          <li><strong>主题</strong>：GNAO1疾病的诊疗进展与未来展望</li>
        </ul>
        
        <h2>主要议程</h2>
        <p>本次会议将涵盖GNAO1疾病的各个方面...</p>
      </div>
    `,
    excerpt: '全球GNAO1研究专家将齐聚一堂，分享最新的研究成果和治疗经验...',
    coverImage: '/images/conference.jpg',
    author: { username: '会议组委会', avatar: null },
    publishedAt: new Date('2024-01-10T16:45:00'),
    viewCount: 856,
    category: { name: '会议活动', slug: 'events' },
    tags: [{ name: '国际会议' }, { name: '学术交流' }],
    isSticky: false
  }
  // 可以添加更多文章...
}

const relatedArticles = [
  {
    id: '3',
    title: '新型抗癫痫药物在GNAO1患者中的应用',
    category: '治疗进展'
  },
  {
    id: '4',
    title: '家庭康复训练指南：如何在家进行有效的康复训练',
    category: '康复指南'
  },
  {
    id: '5',
    title: 'GNAO1患者营养管理的重要性',
    category: '健康指导'
  }
]

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const articleId = params.id as string
    const foundArticle = mockArticles[articleId as keyof typeof mockArticles]
    
    if (foundArticle) {
      setArticle(foundArticle)
      // 增加浏览量
      foundArticle.viewCount += 1
    }
    setLoading(false)
  }, [params.id])

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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">抱歉，找不到您要访问的文章</p>
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
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">首页</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/news" className="hover:text-blue-600">最新资讯</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    {article.isSticky && (
                      <Badge variant="destructive" className="text-xs">
                        置顶
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {article.category.name}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl md:text-3xl leading-tight mb-4">
                    {article.title}
                  </CardTitle>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={article.author.avatar || undefined} />
                        <AvatarFallback>
                          {article.author.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{article.author.username}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDateTime(article.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.viewCount} 次阅读</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mb-6">
                    {article.tags.map((tag: any, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>

                  <Separator />
                </CardHeader>

                <CardContent>
                  {/* Cover Image */}
                  {article.coverImage && (
                    <div className="mb-8">
                      <img 
                        src={article.coverImage} 
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                          // 图片加载失败时的处理
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        点赞
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        分享
                      </Button>
                    </div>
                    <Link href="/news">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        返回列表
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    评论讨论
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>暂无评论，快来发表您的观点吧！</p>
                    <Button className="mt-4" variant="outline">
                      登录后评论
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">相关文章</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link 
                      key={relatedArticle.id} 
                      href={`/news/${relatedArticle.id}`}
                      className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-xs text-gray-600">{relatedArticle.category}</p>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter Subscription */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">订阅更新</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    订阅我们的资讯，及时获得最新信息
                  </p>
                  <Button className="w-full" variant="outline">
                    立即订阅
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">联系我们</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium mb-1">官方邮箱</div>
                    <div className="text-gray-600">info@gnao1.cn</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">微信群</div>
                    <div className="text-gray-600">扫描二维码加入交流群</div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}