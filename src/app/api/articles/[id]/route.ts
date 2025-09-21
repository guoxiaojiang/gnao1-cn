import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - 获取单个已发布文章详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findFirst({
      where: {
        id: params.id,
        status: 'PUBLISHED'
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
            tag: {
              select: { name: true, slug: true }
            }
          }
        }
      }
    })

    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    // 增加浏览量
    await prisma.article.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } }
    })

    // 格式化标签
    const articleWithTags = {
      ...article,
      tags: article.tags.map(at => at.tag)
    }

    return NextResponse.json({ article: articleWithTags })
  } catch (error) {
    console.error('获取文章详情失败:', error)
    return NextResponse.json({ error: '获取文章详情失败' }, { status: 500 })
  }
}