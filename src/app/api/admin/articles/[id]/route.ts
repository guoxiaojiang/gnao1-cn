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

// GET - 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
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

    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 })
  }
}

// PUT - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, excerpt, coverImage, status, isSticky, categoryId, tags } = body

    // 更新文章
    const updateData: any = {
      title,
      content,
      excerpt,
      coverImage,
      status,
      isSticky,
      categoryId
    }

    // 如果状态改为已发布，设置发布时间
    if (status === 'PUBLISHED') {
      const existingArticle = await prisma.article.findUnique({
        where: { id: params.id },
        select: { publishedAt: true }
      })
      
      if (!existingArticle?.publishedAt) {
        updateData.publishedAt = new Date()
      }
    }

    // 如果有标签，先删除旧的关联，再创建新的
    if (tags) {
      await prisma.articleTag.deleteMany({
        where: { articleId: params.id }
      })
      
      updateData.tags = {
        create: tags.map((tagName: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName, slug: tagName.toLowerCase() }
            }
          }
        }))
      }
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json({ article })
  } catch (error) {
    console.error('更新文章失败:', error)
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 })
  }
}

// DELETE - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    await prisma.article.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: '文章删除成功' })
  } catch (error) {
    console.error('删除文章失败:', error)
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 })
  }
}