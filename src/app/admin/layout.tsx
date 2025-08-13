
import React from 'react';
import { AuthProvider, AuthGuard } from '@/context/auth-context';
import { AdminSidebar } from '@/components/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-muted/40">
        <AuthGuard>
          <AdminSidebar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </AuthGuard>
      </div>
    </AuthProvider>
  );
}
