
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
      <AuthGuard>
        <div className="flex min-h-screen bg-muted/40">
          <AdminSidebar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
