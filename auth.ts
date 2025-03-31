import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import { credencialSignin } from '@/prisma/data';
import { AuthError } from 'next-auth';

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize(c) {
      const auth = credencialSignin(c.email);
      if(!auth) throw new AuthError('Usuário não encontrado', {type: 'CredentialsSignin', message: 'Usuário não encontrado'});
      const passwd = bcrypt.compareSync(c.password as string, auth?.password || '');
      if(!passwd) throw new AuthError('Senha inválida', {type: 'CredentialsSignin', message: 'Senha inválida'});
      return auth;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET || 'KnTdIVqfwV2XlZJ0vLI5CHlW5iCfobiuk7hcHEyIhYE=',
  pages: { signIn: '/auth/signin' },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/');
      if (isPublicPage || isLoggedIn) return true;
      return false;
    },
    jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = user.role as string;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          role: token.role as string
        } as any;
      }
      return session;
    }
  },
  logger: {
    error(code, ...message) {
      //console.error(code, message)
    },
    warn(code, ...message) {
      //console.warn(code, message)
    },
    debug(code, ...message) {
      //console.debug(code, message)
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  debug: true,
});


