import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'default-jwt-secret'

// 验证管理员权限
function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  if (!token) {
    return null
  }

  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; role: string }
  } catch (error) {
    return null
  }
}

// GET - 获取文章列表
export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || undefined

    const where = status && ['DRAFT', 'PUBLISHED', 'REVIEWING', 'ARCHIVED'].includes(status) 
      ? { status: status as 'DRAFT' | 'PUBLISHED' | 'REVIEWING' | 'ARCHIVED' } 
      : {}

    const articles = await prisma.article.findMany({
      where,
      include: {
        author: {
          select: { username: true, realName: true }
        },
        category: {
          select: { name: true, slug: true }
        },
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: [
        { isSticky: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.article.count({ where })

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return NextResponse.json({ error: '获取文章列表失败' }, { status: 500 })
  }
}

// POST - 创建新文章
export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, excerpt, coverImage, status, isSticky, categoryId, tags } = body

    // 生成slug
    const slug = `${Date.now()}-${title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').toLowerCase()}`

    // 创建文章，设置作者为admin用户
    let adminUser = await prisma.user.findUnique({
      where: { username: 'gnao1_cn' }
    })

    if (!adminUser) {
      // 如果admin用户不存在，创建一个
      adminUser = await prisma.user.create({
        data: {
          username: 'gnao1_cn',
          email: 'admin@gnao1.cn',
          password: 'hashed-password', // 实际应该是哈希后的密码
          role: 'ADMIN',
          realName: 'GNAO1管理员'
        }
      })
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        status: status || 'DRAFT',
        isSticky: isSticky || false,
        authorId: adminUser.id,
        categoryId,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        tags: tags ? {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName, slug: tagName.toLowerCase() }
              }
            }
          }))
        } : undefined
      },
      include: {
        author: {
          select: { username: true, realName: true }
        },
        category: {
          select: { name: true, slug: true }
        },
        tags: {
          include: {
            tag: true
          }
        }
      }
    })

    return NextResponse.json({ article }, { status: 201 })
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 })
  }
}