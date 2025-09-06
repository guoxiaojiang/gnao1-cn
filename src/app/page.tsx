'use client'

import Link from 'next/link'
import { ArrowRight, Heart, Users, BookOpen, MessageSquare, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: '关于GNAO1',
      description: '了解GNAO1罕见病的病因、症状、诊断和治疗方案',
      href: '/about',
      color: 'text-blue-600'
    },
    {
      icon: MessageSquare,
      title: '社区论坛',
      description: '与其他患者家庭交流经验，分享心得体会',
      href: '/forum',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: '最新资讯',
      description: '获取最新的研究进展和医疗资讯',
      href: '/news',
      color: 'text-purple-600'
    }
    // 暂时隐藏资助功能
    // {
    //   icon: Heart,
    //   title: '资助我们',
    //   description: '支持GNAO1患者家庭，推动科研发展',
    //   href: '/donate',
    //   color: 'text-red-600'
    // }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative text-white py-24 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '600px'
        }}
      >
        {/* 背景装饰元素 - 增强对比度 */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-lg"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <Heart className="h-20 w-20 mx-auto mb-6 text-red-400 drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="block">GNAO1</span>
              <span className="block bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">
                患者之家
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed mb-12 max-w-3xl mx-auto">
              为中国GNAO1罕见病患者及家庭提供<br className="hidden md:block"/>
              <span className="font-semibold">信息支持、交流平台和关怀服务</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/about">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold">
                  了解GNAO1
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white bg-transparent !text-white hover:bg-white hover:text-blue-600 shadow-lg transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold">
                  加入社区
                </Button>
              </Link>
            </div>
            
            {/* 统计数据 */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">80+</div>
                <div className="text-sm opacity-90">已找到组织家庭</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">社区成员</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">专业文章</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">在线支持</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About GNAO1 Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                什么是<span className="gradient-text">GNAO1罕见病</span>？
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-xl card-hover">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">疾病特点</h3>
                  <p className="text-gray-600 leading-relaxed">
                    GNAO1相关疾病是一种罕见的遗传性疾病，主要影响神经系统的发育和功能。
                    患者可能出现智力发育迟缓、癌痫、运动障碍等症状。
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-xl card-hover">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">治疗希望</h3>
                  <p className="text-gray-600 leading-relaxed">
                    虽然目前尚无特效治疗方法，但通过积极的综合治疗和康复训练，
                    可以显著改善患者的生活质量。最新的基因治疗研究也带来了新的希望。
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl card-hover">
                  <h3 className="text-2xl font-semibold mb-6">我们的使命</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="opacity-95">提供准确、可信的疾病信息</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="opacity-95">构建患者家庭互助网络</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="opacity-95">推动科学研究和治疗进展</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="opacity-95">提高公众对罕见病的认知</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              我们提供的<span className="gradient-text">服务</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              为患者家庭提供全方位的支持和帮助，与您共同面对挑战
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group">
                  <Link href={feature.href}>
                    <Card className="h-full bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <CardHeader className="text-center pb-4 relative z-10">
                        <div className={`mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color === 'text-blue-600' ? 'from-blue-500 to-blue-600' : feature.color === 'text-green-600' ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600'} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 relative z-10">
                        <CardDescription className="text-center text-gray-600 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                        <div className="mt-6 text-center">
                          <Button variant="ghost" className="group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                            了解更多
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-16 left-8 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-12 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-lg"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <Heart className="h-16 w-16 mx-auto mb-6 text-pink-300 drop-shadow-lg" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              加入我们的<span className="bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">大家庭</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-95 leading-relaxed max-w-3xl mx-auto">
              在这里，你不是一个人在战斗。我们相信，通过共同的努力，<br className="hidden md:block"/>
              每个患者都能拥有更美好的明天。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-200 px-10 py-4 text-lg font-semibold">
                  立即注册
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/forum">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-transparent !text-white hover:bg-white hover:text-indigo-600 shadow-xl transform hover:scale-105 transition-all duration-200 px-10 py-4 text-lg font-semibold">
                  浏览论坛
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            {/* 信任指标 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">专业信息</h3>
                <p className="text-sm opacity-90">由医学专家审核的权威内容</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">温暖社区</h3>
                <p className="text-sm opacity-90">与其他家庭分享经验与支持</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">持续关怀</h3>
                <p className="text-sm opacity-90">在治疗道路上给予长期支持</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
