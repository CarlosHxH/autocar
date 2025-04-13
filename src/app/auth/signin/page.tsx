'use client';
import * as React from 'react';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { SignInPage } from '@toolpad/core/SignInPage';
import { providerMap } from '@/auth';
import signIn from './actions';
import { Box } from '@mui/material';

function ForgotPasswordLink() {
  return (
    <span>
      <Link fontSize="0.75rem" href="/auth/forgot-password">Esqueceu sua senha?</Link>
    </span>
  );
}

function SignUpLink() {
  return (
    <span style={{ fontSize: '0.8rem' }}>
      Não tem uma conta? <Link href="/auth/signup">Inscreva-se</Link>
    </span>
  );
}

function Title() {
  return (
    <Box sx={{mb:5}}></Box>
  );
}

function SubTitle() {
  return(
    <Box>Bem-vindo, faça login para continuar</Box>
  )
}

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
      slots={{
        forgotPasswordLink: ForgotPasswordLink,
        signUpLink: SignUpLink,
        title: Title,
        subtitle: SubTitle,
      }}
    />
  );
}
