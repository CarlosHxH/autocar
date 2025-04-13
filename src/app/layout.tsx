import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import theme, { customTheme } from '@/theme';
import { auth } from '@/auth';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { Analytics } from "@vercel/analytics/react"

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <Analytics/>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              branding={{
                logo: <img style={{ marginLeft: '30px' }} src="/logo.png" alt="logo" width={'auto'} height={120} />,
                title: '',
                homeUrl: '/',
              }}
              theme={customTheme || theme}
              session={session}
              authentication={AUTHENTICATION}
            >
              {children}
            </NextAppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
