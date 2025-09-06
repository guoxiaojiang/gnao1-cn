'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Eye,
  Heart,
  Pin,
  Clock
} from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'

// 模拟数据
const forumCategories = [
  {
    id: '1',
    name: '求医问药',
    description: '医疗咨询、就医经验分享',
    postCount: 156,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: '2',
    name: '康复经验',
    description: '康复训练心得、治疗方案讨论',
    postCount: 89,
    color: 'bg-green-100 text-green-700'
  },
  {
    id: '3',
    name: '家庭护理',
    description: '日常护理技巧、生活照料经验',
    postCount: 234,
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: '4',
    name: '情感交流',
    description: '心情分享、相互鼓励支持',
    postCount: 178,
    color: 'bg-pink-100 text-pink-700'
  },
  {
    id: '5',
    name: '最新研究',
    description: '研究动态、学术讨论',
    postCount: 67,
    color: 'bg-orange-100 text-orange-700'
  }
]

const recentPosts = [
  {
    id: '1',
    title: '孩子确诊GNAO1已经三年了，想和大家分享一些康复心得',
    content: '孩子三岁确诊，现在六岁了，这三年来我们尝试了很多康复方法...',
    author: {
      id: '1',
      username: '希望妈妈',
      avatar: null
    },
    category: {
      id: '2',
      name: '康复经验'
    },
    createdAt: new Date('2024-01-15T10:30:00'),
    viewCount: 456,
    replyCount: 23,
    isSticky: true,
    isPinned: false,
    lastReply: {
      author: { username: '阳光爸爸' },
      createdAt: new Date('2024-01-15T14:20:00')
    }
  },
  {
    id: '2',
    title: '关于癫痫药物的使用经验，希望对大家有帮助',
    content: '我家孩子使用了多种抗癫痫药物，想分享一些用药心得...',
    author: {
      id: '2',
      username: '坚强家长',
      avatar: null
    },
    category: {
      id: '1',
      name: '求医问药'
    },
    createdAt: new Date('2024-01-14T16:45:00'),
    viewCount: 289,
    replyCount: 15,
    isSticky: false,
    isPinned: true,
    lastReply: {
      author: { username: '医生朋友' },
      createdAt: new Date('2024-01-15T09:10:00')
    }
  },
  {
    id: '3',
    title: '寻找北京地区的专业康复师推荐',
    content: '想为孩子找一位专业的康复师，有没有北京的朋友能推荐...',
    author: {
      id: '3',
      username: '北京新人',
      avatar: null
    },
    category: {
      id: '2',
      name: '康复经验'
    },
    createdAt: new Date('2024-01-14T14:20:00'),
    viewCount: 178,
    replyCount: 8,
    isSticky: false,
    isPinned: false,
    lastReply: {
      author: { username: '康复师小李' },
      createdAt: new Date('2024-01-14T18:30:00')
    }
  },
  {
    id: '4',
    title: '孩子最近情况有所好转，想和大家分享喜悦',
    content: '经过一年多的治疗和康复，孩子的癫痫发作次数明显减少...',
    author: {
      id: '4',
      username: '感恩的心',
      avatar: null
    },
    category: {
      id: '4',
      name: '情感交流'
    },
    createdAt: new Date('2024-01-13T20:15:00'),
    viewCount: 345,
    replyCount: 28,
    isSticky: false,
    isPinned: false,
    lastReply: {
      author: { username: '同路人' },
      createdAt: new Date('2024-01-14T12:45:00')
    }
  },
  {
    id: '5',
    title: '关于基因治疗的最新研究进展讨论',
    content: '最近看到一些基因治疗的研究报告，想和大家讨论一下...',
    author: {
      id: '5',
      username: '科研关注者',
      avatar: null
    },
    category: {
      id: '5',
      name: '最新研究'
    },
    createdAt: new Date('2024-01-13T11:30:00'),
    viewCount: 234,
    replyCount: 12,
    isSticky: false,
    isPinned: false,
    lastReply: {
      author: { username: '研究员' },
      createdAt: new Date('2024-01-13T16:20:00')
    }
  }
]

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPosts = recentPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 排序：置顶 > 精华 > 时间
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.isSticky && !b.isSticky) return -1
    if (!a.isSticky && b.isSticky) return 1
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              GNAO1社区论坛
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              与其他患者家庭交流经验，分享心得，相互支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/forum/new">
                <Button size="lg" variant="secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  发布新主题
                </Button>
              </Link>
              <button className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-md font-medium transition-colors duration-200">
                论坛规则
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="搜索帖子..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Link href="/forum/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  发布新主题
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                全部
              </Button>
              {forumCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      
                      {/* Avatar */}
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar || undefined} />
                        <AvatarFallback>
                          {post.author.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        
                        {/* Title and Badges */}
                        <div className="flex items-center gap-2 mb-2">
                          {post.isSticky && (
                            <Badge variant="destructive" className="text-xs">
                              置顶
                            </Badge>
                          )}
                          {post.isPinned && (
                            <Badge variant="secondary" className="text-xs">
                              <Pin className="h-3 w-3 mr-1" />
                              精华
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {post.category.name}
                          </Badge>
                        </div>

                        {/* Post Title */}
                        <Link href={`/forum/post/${post.id}`}>
                          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Post Excerpt */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.content}
                        </p>

                        {/* Post Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{post.author.username}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDateTime(post.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.viewCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{post.replyCount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Last Reply */}
                        {post.lastReply && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                              最后回复：{post.lastReply.author.username} • {formatDateTime(post.lastReply.createdAt)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Forum Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">论坛版块</CardTitle>
                <CardDescription>
                  选择感兴趣的讨论版块
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {forumCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div>
                      <div className={`text-sm font-medium px-2 py-1 rounded ${category.color}`}>
                        {category.name}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {category.postCount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">论坛统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>总主题数</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>总回复数</span>
                  <span className="font-medium">5,678</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>注册用户</span>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>今日新帖</span>
                  <span className="font-medium text-green-600">12</span>
                </div>
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
                  <div className="text-gray-600">contact@gnao1.cn</div>
                </div>
                <div>
                  <div className="font-medium mb-2">微信群</div>
                  <div className="text-gray-600 mb-3">扫描二维码加入官方微信群</div>
                  <div className="flex justify-center">
                    <img 
                      src="/images/wecat_group.jpg" 
                      alt="微信群二维码" 
                      className="w-32 h-32 object-contain rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">QQ群</div>
                  <div className="text-gray-600">123456789</div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}