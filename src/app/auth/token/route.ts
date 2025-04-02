import { NextRequest, NextResponse } from "next/server";
import jwt, { decode } from 'jsonwebtoken';
import { prisma } from "@/prisma";
import { JWT } from "next-auth/jwt";

const JWT_SECRET = process.env.JWT_SECRET as string;
  
// usage: http://localhost:3000/auth/token?token=1234567890&email=teste@teste.com
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('token');
    const email = searchParams.get('email');
    const role = searchParams.get('role');

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email as string,
                id: userId as string
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        if (!email || !userId) {
            return NextResponse.json({ error: 'Token e email são obrigatórios' }, { status: 400 });
        }

        const encodedToken = jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '30D' });
        return NextResponse.json({ message: 'Token válido', token: encodedToken });
    } catch (error) {
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
}
