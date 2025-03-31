'use client';
import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Copyright from '@/src/components/Copyright';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout hideNavigation>
      <PageContainer>
        {props.children}
        <Copyright sx={{ my: 4 }} />
      </PageContainer>
    </DashboardLayout>
  );
}