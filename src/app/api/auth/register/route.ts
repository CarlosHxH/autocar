// app/api/auth/register/route.ts
import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const checkUser = await prisma.user.findUnique({
      where: { email }
    });

    if (checkUser) return NextResponse.json({ message: 'Email já cadastrado!' }, { status: 400 })

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 12),
      },
    });

    return NextResponse.json({
      message: 'User registered successfully',
      user
    }, { status: 201 })
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({
      message: error.message || 'An error occurred during registration',
    }, { status: 500 });
  }
}