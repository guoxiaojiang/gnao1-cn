'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Heart, 
  Users, 
  BookOpen, 
  Stethoscope, 
  CreditCard, 
  Smartphone,
  Building2,
  Gift,
  FileText,
  CheckCircle
} from 'lucide-react'

export default function DonatePage() {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [message, setMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const quickAmounts = [50, 100, 200, 500, 1000, 2000]

  const usageAreas = [
    {
      icon: Users,
      title: '患者支持服务',
      description: '为患者家庭提供咨询、心理支持和日常生活协助',
      percentage: 40
    },
    {
      icon: BookOpen,
      title: '科研资助',
      description: '资助GNAO1相关的科学研究和新药开发项目',
      percentage: 30
    },
    {
      icon: Stethoscope,
      title: '医疗资源',
      description: '改善医疗设施，培训医护人员，提高诊疗水平',
      percentage: 20
    },
    {
      icon: Heart,
      title: '网站运营',
      description: '维护平台运营，提供技术支持和内容更新',
      percentage: 10
    }
  ]

  const paymentMethods = [
    {
      id: 'alipay',
      name: '支付宝',
      icon: Smartphone,
      description: '安全便捷的移动支付'
    },
    {
      id: 'wechat',
      name: '微信支付',
      icon: Smartphone,
      description: '微信钱包快速支付'
    },
    {
      id: 'bank',
      name: '银行转账',
      icon: Building2,
      description: '传统银行转账方式'
    }
  ]

  const donorLevels = [
    {
      name: '爱心捐助者',
      amount: '1-99元',
      benefits: ['感谢证书', '最新资讯推送']
    },
    {
      name: '支持者',
      amount: '100-499元',
      benefits: ['感谢证书', '最新资讯推送', '专属纪念品']
    },
    {
      name: '守护天使',
      amount: '500-1999元',
      benefits: ['感谢证书', '最新资讯推送', '专属纪念品', '年度报告']
    },
    {
      name: '慈善之星',
      amount: '2000元以上',
      benefits: ['感谢证书', '最新资讯推送', '专属纪念品', '年度报告', '捐赠墙署名']
    }
  ]

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString())
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setAmount('')
  }

  const finalAmount = customAmount || amount

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              资助我们
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              您的每一份爱心，都将点亮GNAO1患者家庭的希望之光
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-lg">
              <div className="flex items-center justify-center">
                <Users className="h-5 w-5 mr-2" />
                <span>已帮助 120+ 家庭</span>
              </div>
              <div className="flex items-center justify-center">
                <Gift className="h-5 w-5 mr-2" />
                <span>累计筹款 ¥156,000+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  立即捐赠
                </CardTitle>
                <CardDescription>
                  您的捐赠将直接用于支持GNAO1患者家庭和推动相关研究
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    选择捐赠金额
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                    {quickAmounts.map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant={amount === quickAmount.toString() ? "default" : "outline"}
                        onClick={() => handleAmountSelect(quickAmount)}
                        className="text-sm"
                      >
                        ¥{quickAmount}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">自定义金额：</span>
                    <Input
                      type="number"
                      placeholder="请输入金额"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-32"
                    />
                    <span className="text-sm text-gray-600">元</span>
                  </div>
                </div>

                <Separator />

                {/* Donor Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">捐赠者信息（可选）</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        姓名
                      </label>
                      <Input
                        type="text"
                        placeholder="请输入您的姓名"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        邮箱
                      </label>
                      <Input
                        type="email"
                        placeholder="请输入邮箱地址"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      留言
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="留下您的祝福或建议（可选）"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Payment Methods */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">选择支付方式</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      return (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            paymentMethod === method.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5 text-gray-600" />
                              <div>
                                <div className="font-medium">{method.name}</div>
                                <div className="text-sm text-gray-500">{method.description}</div>
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {paymentMethod === method.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Donate Button */}
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={!finalAmount || !paymentMethod}
                  >
                    {finalAmount ? `捐赠 ¥${finalAmount}` : '请选择捐赠金额'}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    点击捐赠即表示您同意我们的捐赠条款和隐私政策
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Fund Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">资金用途</CardTitle>
                <CardDescription>
                  我们承诺资金使用的透明化
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {usageAreas.map((area, index) => {
                  const Icon = area.icon
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">{area.title}</span>
                        </div>
                        <span className="text-sm text-gray-600">{area.percentage}%</span>
                      </div>
                      <p className="text-xs text-gray-500">{area.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${area.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Donor Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">捐赠回馈</CardTitle>
                <CardDescription>
                  不同捐赠金额的感谢回馈
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {donorLevels.map((level, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3">
                    <div className="font-medium text-sm">{level.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{level.amount}</div>
                    <ul className="space-y-1">
                      {level.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-1 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bank Transfer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">银行转账信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">户名：</span>
                  <span>GNAO1患者关爱基金会</span>
                </div>
                <div>
                  <span className="font-medium">开户行：</span>
                  <span>中国工商银行北京分行</span>
                </div>
                <div>
                  <span className="font-medium">账号：</span>
                  <span>1234 5678 9012 3456</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  转账时请注明"GNAO1捐赠+您的姓名"，转账后请联系我们确认
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      {/* Transparency Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              资金使用透明化
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-blue-600 mx-auto" />
                  <CardTitle className="text-lg">定期公布</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    每季度发布资金使用报告，
                    详细说明每笔支出的用途
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                  <CardTitle className="text-lg">第三方监督</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    接受专业审计机构的监督，
                    确保资金使用的合规性
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-8 w-8 text-red-600 mx-auto" />
                  <CardTitle className="text-lg">直接受益</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    确保捐赠资金直接用于
                    患者支持和相关研究
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}