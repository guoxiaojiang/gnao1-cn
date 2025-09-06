# GNAO1患者之家

一个为中国GNAO1罕见病患者及家庭提供信息支持、交流平台和关爱服务的综合性网站平台。

## 项目概述

**GNAO1患者之家**致力于为GNAO1相关疾病患者及其家庭提供：

- 💡 **专业信息支持** - 疾病知识、治疗进展、康复指导
- 🤝 **交流互助平台** - 患者家庭经验分享、情感支持
- 📰 **最新资讯发布** - 研究进展、医疗动态、活动通知
- ❤️ **慈善资助渠道** - 透明的捐赠平台，支持患者和研究

## 技术栈

### 前端
- **Framework**: Next.js 15 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Authentication**: NextAuth.js

### 后端
- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js + Prisma Adapter

### 开发工具
- **Package Manager**: npm
- **Code Quality**: ESLint + TypeScript
- **Version Control**: Git

## 项目结构

```
gnao1-cn/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── about/             # 关于GNAO1页面
│   │   ├── api/               # API路由
│   │   │   └── auth/          # 认证相关API
│   │   ├── auth/              # 认证页面(登录/注册)
│   │   ├── donate/            # 资助页面
│   │   ├── forum/             # 论坛页面
│   │   ├── news/              # 资讯页面
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # 可复用组件
│   │   ├── layout/            # 布局组件
│   │   └── ui/                # UI基础组件
│   ├── lib/                   # 工具函数和配置
│   └── types/                 # TypeScript类型定义
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── public/                    # 静态资源
└── 配置文件...
```

## 核心功能

### 1. 用户系统
- ✅ 用户注册/登录
- ✅ 角色权限管理(用户/版主/管理员/超级管理员)
- ✅ 个人资料管理
- ✅ 密码安全(bcrypt加密)

### 2. 信息展示
- ✅ **关于GNAO1**: 疾病概述、遗传学特征、临床表现、诊断治疗
- ✅ **最新资讯**: 研究进展、治疗动态、会议活动
- ✅ 分类管理、标签系统
- ✅ 搜索功能

### 3. 社区论坛
- ✅ 多版块讨论(求医问药、康复经验、家庭护理、情感交流等)
- ✅ 帖子发布、回复、置顶、精华
- ✅ 用户互动、经验分享
- ✅ 内容审核机制

### 4. 捐赠系统
- ✅ 多种支付方式(支付宝、微信支付、银行转账)
- ✅ 捐赠金额选择、自定义金额
- ✅ 资金用途透明化展示
- ✅ 捐赠者信息管理
- ✅ 感谢回馈体系

### 5. 安全与隐私
- ✅ 数据加密存储
- ✅ 用户隐私保护
- ✅ 安全认证机制
- ✅ 内容审核系统

## 数据库设计

### 核心数据模型
- **User** - 用户信息和权限
- **Article** - 文章/资讯内容
- **Post** - 论坛帖子
- **Comment** - 评论回复
- **Category** - 分类管理
- **Tag** - 标签系统
- **Donation** - 捐赠记录
- **Upload** - 文件上传管理
- **Setting** - 网站设置

## 安装和运行

### 环境要求
- Node.js 18+
- PostgreSQL 12+
- npm 8+

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd gnao1-cn/gnao1-cn
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   ```bash
   cp .env.local.example .env.local
   # 编辑 .env.local 文件，配置数据库和其他环境变量
   ```

4. **数据库设置**
   ```bash
   # 生成Prisma客户端
   npx prisma generate
   
   # 运行数据库迁移
   npx prisma migrate dev
   
   # (可选)添加种子数据
   npx prisma db seed
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   打开 [http://localhost:3000](http://localhost:3000)

## 环境变量配置

在 `.env.local` 文件中配置以下变量：

```env
# 数据库连接
DATABASE_URL="postgresql://username:password@localhost:5432/gnao1_db"

# NextAuth配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# 邮件服务(用于通知)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# 支付配置
ALIPAY_APP_ID=your-alipay-app-id
WECHAT_APP_ID=your-wechat-app-id
```

## 开发指南

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 配置的代码规范
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 或 camelCase 命名

### 数据库操作
```bash
# 查看数据库
npx prisma studio

# 重置数据库
npx prisma migrate reset

# 部署迁移
npx prisma migrate deploy
```

### 构建和部署
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 类型检查
npm run type-check
```

## 功能特色

### 🎨 响应式设计
- 完全响应式布局，支持桌面、平板、手机
- 现代化UI设计，用户体验友好
- 无障碍访问支持

### 🔒 安全保障
- 用户密码 bcrypt 加密
- JWT token 安全认证
- XSS/CSRF 防护
- 数据输入验证和清理

### 📱 现代化体验
- 服务端渲染(SSR)和静态生成(SSG)
- 快速页面加载和导航
- 优化的图片和资源处理
- PWA 支持(计划中)

### 🌏 本地化支持
- 完整的中文界面
- 符合中国用户使用习惯
- 本土化支付方式集成

## 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 开发原则
- 优先考虑用户体验和安全性
- 保持代码简洁和可维护性
- 充分测试新功能
- 遵循现有的代码风格

## 联系我们

- **官方邮箱**: info@gnao1.cn
- **技术支持**: tech@gnao1.cn
- **项目讨论**: 访问我们的论坛

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 致谢

感谢所有为GNAO1患者群体贡献力量的医生、研究人员、患者家庭和志愿者。

---

**GNAO1患者之家** - 为爱而建，用心守护每一个家庭的希望 💙
