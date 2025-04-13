import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { prisma } from './prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import jwt from 'jsonwebtoken';

export const env = {
  get AUTH_SECRET(){
    if (!process.env.AUTH_SECRET) {
      throw new Error('AUTH_SECRET environment variable is not set');
    }
    return process.env.AUTH_SECRET
  }
}

export const decoded = (token: string)=>jwt.verify(
  token,
  env.AUTH_SECRET,
) as { userId: string; email: string; role: string };

export const encoded = (user: any)=>jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role
  },
  env.AUTH_SECRET,
  { expiresIn: '30d' }
);

export async function GenerateAPIToken(user:any){
  // Generate API token
  const apiToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    env.AUTH_SECRET,
    { expiresIn: '30d' }
  );
  await prisma.verificationToken.upsert({
    where: {  identifier: user.email },
    update: { token: apiToken, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    create: { identifier: user.email, token: apiToken, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
  });
  return apiToken;
}

const providers: Provider[] = [
  Credentials({
    id: "credentials",
    name: "credentials",
    credentials: {
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(c) {
      const user = await prisma.user.findFirst({where: { email: c.email as string}});

      if(!user) throw new AuthError('Usuário não encontrado', {type: 'CredentialsSignin', message: 'Usuário não encontrado'});
      const passwd = bcrypt.compareSync(c.password as string, user?.password || '');
      if(!passwd) throw new AuthError('Senha inválida', {type: 'CredentialsSignin', message: 'Senha inválida'});

      // Generate API token
      const apiToken = await GenerateAPIToken(user)
      // Add API token to user object
      return { ...user, apiToken };
    },
  }),

  Credentials({
    id: "register",
    name: "register",
    credentials: {
      name: { label: "Name", type: "text" },
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credencials) {
      const { name, email, password } = credencials;
      if (!name || !email || !password) {
        throw new AuthError('Campos obrigatórios ausentes.', {type: 'CredentialsSignin', message: 'Campos obrigatórios ausentes.'});
      }
      // Check user
      const checkUser = await prisma.user.findFirst({where: { email: email as string}});
      if(checkUser) throw new AuthError('Email, já cadastrado.', {type: 'CredentialsSignin', message: 'Email, já cadastrado'});

      const user = await prisma.user.create({
        data: {
          name: name as string,
          email: email as string,
          password: await bcrypt.hash(password as string, 12),
        },
      });

      // Generate API token
      const apiToken = await GenerateAPIToken(user)
      // Add API token to user object
      return { ...user, apiToken };
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
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
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
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          role: token.role
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
  },/*
  jwt: {
    encode: async ({ token, secret }) => {
      return jwt.sign(token || {}, secret as string, { expiresIn: '1h' });
    },
    decode: async ({ token, secret }) => {
      if (!token) return null;
      return jwt.verify(token, secret as string) as JWT;
    }
  },*/
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  debug: true,
});
