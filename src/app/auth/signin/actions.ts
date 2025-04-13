'use server';
import { AuthError } from 'next-auth';
import { signIn as signInAction } from '@/auth';

async function signIn(provider: { id: string, name: string }, formData: {name?: string; email: string; password: string}, callbackUrl?: string) {
  try {
    return await signInAction(provider.id, {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      redirect: false,
      callbackUrl: callbackUrl ?? '/',
    });
  } catch (error) {
    
    // Handle NEXT_REDIRECT error separately to allow redirects to work
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    // Handle Auth.js errors
    if (error instanceof AuthError) {
      const errorMessage = error.message.split('Read more')[0].trim();
      return {
        error: error.cause || errorMessage,
        type: error.type,
      };
    }
    
    // Handle any other errors
    return {
      error: 'Algo deu errado.',
      type: 'UnknownError',
    };
  }
}

export default signIn;