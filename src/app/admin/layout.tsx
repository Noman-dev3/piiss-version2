
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
        <div className="min-h-screen bg-muted/40 flex flex-col sm:flex-row">
          <AdminSidebar />
          <main className="flex-1 sm:ml-64">
            {children}
          </main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
