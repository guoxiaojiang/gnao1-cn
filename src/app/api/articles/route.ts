import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - 获取已发布的文章列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // 构建查询条件
    const where: any = {
      status: 'PUBLISHED'
    }

    if (category && category !== 'all') {
      where.category = {
        slug: category
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

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
            tag: {
              select: { name: true, slug: true }
            }
          }
        }
      },
      orderBy: [
        { isSticky: 'desc' },
        { publishedAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.article.count({ where })

    // 增加浏览量（简化实现，实际应该有防刷机制）
    const articlesWithTags = articles.map(article => ({
      ...article,
      tags: article.tags.map(at => at.tag)
    }))

    return NextResponse.json({
      articles: articlesWithTags,
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