const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库...')

  // 创建管理员用户
  const adminUser = await prisma.user.upsert({
    where: { username: 'gnao1_cn' },
    update: {},
    create: {
      username: 'gnao1_cn',
      email: 'admin@gnao1.cn',
      password: 'hashed-password', // 实际应该是哈希后的密码
      role: 'ADMIN',
      realName: 'GNAO1管理员'
    }
  })

  console.log('管理员用户已创建:', adminUser.username)

  // 创建分类
  const categories = [
    {
      name: '研究进展',
      slug: 'research',
      description: 'GNAO1相关的最新研究成果和科学进展'
    },
    {
      name: '治疗进展',
      slug: 'treatment',
      description: '治疗方法和临床试验的最新进展'
    },
    {
      name: '康复指南',
      slug: 'rehabilitation',
      description: '患者康复和日常护理指导'
    },
    {
      name: '健康指导',
      slug: 'health',
      description: '健康生活方式和预防指导'
    },
    {
      name: '会议活动',
      slug: 'events',
      description: '学术会议、患者聚会等活动信息'
    }
  ]

  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: categoryData
    })
  }

  console.log('分类已创建')

  // 创建一些示例文章
  const sampleArticles = [
    {
      title: 'GNAO1基因突变的最新研究进展',
      slug: 'gnao1-mutation-research-2024',
      content: `# GNAO1基因突变的最新研究进展

## 研究背景

GNAO1基因编码一种重要的G蛋白α亚基，在神经元信号传导中起关键作用。最新的研究表明，GNAO1基因突变与多种神经发育障碍密切相关。

## 主要发现

### 1. 突变机制
- 功能丧失型突变
- 显性负效应突变
- 影响G蛋白信号通路

### 2. 临床表现
- 癫痫发作
- 运动障碍
- 智力发育迟缓

## 治疗前景

研究人员正在探索多种治疗策略：
1. 基因治疗
2. 药物干预
3. 康复训练

## 结论

这些研究为GNAO1相关疾病的治疗提供了新的希望和方向。`,
      excerpt: '最新研究揭示了GNAO1基因突变的分子机制，为相关疾病的治疗提供了新的思路。',
      status: 'PUBLISHED',
      isSticky: true,
      authorId: adminUser.id,
      publishedAt: new Date()
    },
    {
      title: '家庭康复训练指南',
      slug: 'home-rehabilitation-guide',
      content: `# 家庭康复训练指南

## 前言

对于GNAO1相关疾病患者，家庭康复训练是重要的治疗手段之一。本指南将为患者家属提供实用的康复训练方法。

## 运动训练

### 基础运动
- 爬行训练
- 平衡训练
- 肌肉力量训练

### 精细动作
- 手指灵活性训练
- 抓握能力训练
- 协调性训练

## 认知训练

### 注意力训练
- 视觉注意力
- 听觉注意力
- 持续注意力

### 记忆训练
- 工作记忆
- 长期记忆
- 情景记忆

## 注意事项

1. 训练应该循序渐进
2. 保持患者的兴趣和积极性
3. 定期评估训练效果
4. 与专业康复师保持沟通

## 结语

家庭康复训练需要耐心和坚持，相信通过科学的训练方法，患者的生活质量会得到改善。`,
      excerpt: '详细的家庭康复训练指南，帮助患者家属开展有效的康复训练。',
      status: 'PUBLISHED',
      authorId: adminUser.id,
      publishedAt: new Date()
    }
  ]

  for (const articleData of sampleArticles) {
    await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: articleData
    })
  }

  console.log('示例文章已创建')
  console.log('数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })