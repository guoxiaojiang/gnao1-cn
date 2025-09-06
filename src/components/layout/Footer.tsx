import Link from 'next/link'
import { Heart, Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">GNAO1患者之家</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              为中国GNAO1罕见病患者及家庭提供信息支持、交流平台和关怀服务。
              我们致力于提高公众对GNAO1疾病的认知，促进医患交流，支持科研发展。
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>联系邮箱：info@gnao1.cn</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">快速导航</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">
                  关于GNAO1
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-blue-600 text-sm">
                  最新资讯
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-600 hover:text-blue-600 text-sm">
                  社区论坛
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-600 hover:text-blue-600 text-sm">
                  资助我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">帮助支持</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
                  使用条款
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-blue-600 text-sm">
                  使用帮助
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 GNAO1患者之家. 保留所有权利.
            </p>
            <p className="text-gray-600 text-sm mt-4 md:mt-0">
              本网站内容仅供参考，不能替代专业医疗建议
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer