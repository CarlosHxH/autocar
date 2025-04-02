import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
  
// usage: http://localhost:3000/auth/token?token=1234567890&email=teste@teste.com
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    try {
        if (!token) {
            return NextResponse.json({ error: 'Token e email são obrigatórios' }, { status: 400 });
        }
        const decodedToken = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({ message: 'Token válido', token });
    } catch (error) {
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
}
