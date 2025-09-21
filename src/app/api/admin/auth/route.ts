import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const ADMIN_CREDENTIALS = {
  username: 'gnao1_cn',
  password: 'gnao1_admin'
}

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'default-jwt-secret'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // 验证管理员凭据
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // 生成JWT token
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      const response = NextResponse.json({
        success: true,
        message: '登录成功',
        token
      })

      // 设置httpOnly cookie
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 24小时
      })

      return response
    } else {
      return NextResponse.json(
        { success: false, message: '用户名或密码错误' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '登录失败' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: '登出成功' })
  response.cookies.delete('admin-token')
  return response
}