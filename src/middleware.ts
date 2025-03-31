import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
//export { auth as middleware } from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Exemplo de lógica de redirecionamento
  if (!session && request.nextUrl.pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  // Exemplo de lógica de redirecionamento
  if (session && request.nextUrl.pathname === '/auth/signin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
