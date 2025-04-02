import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/*
const url = 'http://wks-ti004.5stransportes.com.br/api/auth/token';
const data = {
    email: 'admin@prisma.io',
    password: 'admin'
};

const url = 'http://wks-ti004.5stransportes.com.br/api/auth/token';
const data = {
    email: 'admin@prisma.io',
    password: 'admin'
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
const token = data.token

fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});
})
.catch((error) => {
    console.error('Error:', error);
});
*/
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const isValidPassword = bcrypt.compareSync(password, user.password || '');
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Senha inválida' },
        { status: 401 }
      );
    }

    // Generate API token
    const apiToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.AUTH_SECRET || 'KnTdIVqfwV2XlZJ0vLI5CHlW5iCfobiuk7hcHEyIhYE=',
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      token: apiToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar token' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(
      token,
      process.env.AUTH_SECRET || 'KnTdIVqfwV2XlZJ0vLI5CHlW5iCfobiuk7hcHEyIhYE='
    ) as { userId: string; email: string; role: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido ou expirado' },
      { status: 401 }
    );
  }
} 