'use server';
import { AuthError } from 'next-auth';
import { signIn as signInAction } from '@/auth';

async function signIn(provider: { id: string, name: string }, formData: {name?: string; email: string; password: string}, callbackUrl?: string) {
  try {
    const result = await signInAction(provider.id, {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      redirect: false,
      callbackUrl: callbackUrl ?? '/',
    });
    
    // If the result is a redirection URL (string)
    if (typeof result === 'string') {
      return { success: true, url: result };
    }
    
    // If the result is an object with error property
    if (result && typeof result === 'object' && 'error' in result) {
      // Clean up error message by removing the "Read more" part
      const errorMessage = typeof result.error === 'string' 
        ? result.error.split('Read more')[0].trim() 
        : 'Erro de autenticação';
        
      return { error: errorMessage, type: 'CredentialsSignin' };
    }
    
    // If successful with no redirection
    return { success: true };
    
  } catch (error) {
    // Handle NEXT_REDIRECT error separately
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    
    // Handle Auth.js errors
    if (error instanceof AuthError) {
      // Clean up error message by removing the "Read more" part
      const errorMessage = error.message.split('Read more')[0].trim();
      
      return {
        error: errorMessage || 'Usuário ou senha inválidos',
        type: error.type || 'CredentialsSignin',
      };
    }
    
    console.error('Authentication error:', error);
    
    // Handle any other errors - also clean up any potential "Read more" links
    const errorMessage = error instanceof Error 
      ? error.message.split('Read more')[0].trim()
      : 'Algo deu errado.';
      
    return {
      error: errorMessage,
      type: 'UnknownError',
    };
  }
}

export default signIn;