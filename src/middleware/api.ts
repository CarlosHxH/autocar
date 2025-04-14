import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { decoded } from '@/auth';

export async function apiAuthMiddleware(request: NextRequest) {
  // Skip middleware for non-API routes
  
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Token não fornecido' },{ status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decode = await decoded(token);
    
    // Add user info to request headers for use in API routes
    const headers = new Headers(request.headers);
    headers.set('x-user-id', decode.userId);
    headers.set('x-user-email', decode.email);
    headers.set('x-user-role', decode.role);
    console.log({headers});
    return NextResponse.next({request: { headers }});
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido ou expirado' },
      { status: 401 }
    );
  }
} 