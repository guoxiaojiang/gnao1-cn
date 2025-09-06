'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Brain, Dna, Stethoscope, FileText, Users, Heart } from 'lucide-react'

export default function AboutPage() {
  const sections = [
    {
      id: 'overview',
      title: '疾病概述',
      icon: Brain,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            GNAO1相关疾病是一种罕见的神经发育障碍，由GNAO1基因突变引起。
            GNAO1基因编码Gαo蛋白，是G蛋白家族的重要成员，在神经信号传导中发挥关键作用。
          </p>
          <p className="text-gray-600 leading-relaxed">
            该疾病主要影响大脑和神经系统的正常发育和功能，可能导致智力发育迟缓、
            癫痫发作、运动障碍等多种神经系统症状。虽然是罕见疾病，但对患者及家庭的影响深远。
          </p>
        </div>
      )
    },
    {
      id: 'genetics',
      title: '遗传学特征',
      icon: Dna,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">基因位置</h4>
            <p className="text-gray-600">GNAO1基因位于16号染色体（16q12.2-q13）</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">遗传模式</h4>
            <p className="text-gray-600">
              大多数病例为新发突变（de novo mutation），少数为常染色体显性遗传
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">蛋白质功能</h4>
            <p className="text-gray-600">
              Gαo蛋白参与神经元中的信号传导，调节离子通道和酶活性，
              对维持正常的神经功能至关重要
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'symptoms',
      title: '临床表现',
      icon: Stethoscope,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">核心症状</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>智力发育迟缓或障碍</li>
              <li>癫痫发作（多种类型）</li>
              <li>运动发育迟缓</li>
              <li>肌张力异常（低张力或高张力）</li>
              <li>语言发育迟缓或缺失</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">运动障碍</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>舞蹈样动作</li>
              <li>肌张力障碍</li>
              <li>共济失调</li>
              <li>震颤</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">其他表现</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>睡眠障碍</li>
              <li>视觉障碍</li>
              <li>胃肠道问题</li>
              <li>行为问题</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'diagnosis',
      title: '诊断方法',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">基因检测</h4>
            <p className="text-gray-600">
              通过全外显子组测序（WES）或全基因组测序（WGS）检测GNAO1基因突变，
              这是确诊的金标准
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">临床评估</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>详细的病史采集</li>
              <li>神经系统体格检查</li>
              <li>发育评估</li>
              <li>脑电图（EEG）检查</li>
              <li>脑部MRI扫描</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">鉴别诊断</h4>
            <p className="text-gray-600">
              需要与其他遗传性神经发育障碍进行鉴别，
              包括其他基因相关的癫痫脑病和运动障碍
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'treatment',
      title: '治疗与管理',
      icon: Heart,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">
              <strong>重要提示：</strong> 
              目前尚无特效治疗方法，治疗主要以症状管理和支持治疗为主。
              请务必在专业医生指导下进行治疗。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">癫痫管理</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>抗癫痫药物治疗</li>
              <li>生酮饮食疗法</li>
              <li>迷走神经刺激术（VNS）</li>
              <li>在难治性癫痫中考虑手术治疗</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">运动障碍治疗</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>物理治疗和康复训练</li>
              <li>作业治疗</li>
              <li>语言治疗</li>
              <li>必要时使用肌肉松弛剂</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">支持治疗</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>营养支持和喂养管理</li>
              <li>睡眠障碍治疗</li>
              <li>行为干预</li>
              <li>家庭支持和教育</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'research',
      title: '研究进展',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">基础研究</h4>
            <p className="text-gray-600">
              科学家们正在深入研究GNAO1基因突变的致病机制，
              包括蛋白质功能异常如何导致神经发育障碍
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">治疗研发</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>基因治疗策略研究</li>
              <li>新型抗癫痫药物开发</li>
              <li>神经保护剂研究</li>
              <li>症状特异性治疗方法</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">临床试验</h4>
            <p className="text-gray-600">
              国际上正在进行多项相关的临床试验，
              为GNAO1患者带来新的治疗希望
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">患者登记研究</h4>
            <p className="text-gray-600">
              建立患者数据库，收集自然病程数据，
              为新药研发和治疗方案优化提供重要信息
            </p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              关于GNAO1相关疾病
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              了解GNAO1罕见病的基本知识、临床表现、诊断方法和治疗进展
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card key={section.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {section.content}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              相关资源
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">医疗资源</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    专业的医疗机构和专家信息，
                    帮助您找到合适的诊疗资源
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">科研文献</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    最新的研究论文和科学进展，
                    了解疾病研究的前沿动态
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">患者故事</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    真实的患者经历和家庭故事，
                    从中获得力量和经验分享
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              <strong>免责声明：</strong>
              本网站提供的信息仅供教育和参考目的，不能替代专业医疗建议、诊断或治疗。
              请务必咨询合格的医疗专业人员获取个性化的医疗建议。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}