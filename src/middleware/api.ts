import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

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
    const decoded = jwt.verify(
      token,
      process.env.AUTH_SECRET || 'KnTdIVqfwV2XlZJ0vLI5CHlW5iCfobiuk7hcHEyIhYE='
    ) as { userId: string; email: string; role: string };

    // Add user info to request headers for use in API routes
    const headers = new Headers(request.headers);
    headers.set('x-user-id', decoded.userId);
    headers.set('x-user-email', decoded.email);
    headers.set('x-user-role', decoded.role);

    return NextResponse.next({request: { headers }});
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido ou expirado' },
      { status: 401 }
    );
  }
} 