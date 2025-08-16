
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
     if (!loading && user && pathname === '/admin/login') {
      router.push('/admin');
    }
  }, [user, loading, router, pathname]);

  useEffect(() => {
    if (!user) return;

    const handleBeforeUnload = () => {
        logout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, [user, logout]);


  if (loading) {
     return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="w-full max-w-md p-8 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
     );
  }
  
  if (!user && pathname !== '/admin/login') {
    // This state will be brief before the redirect kicks in.
    return (
       <div className="flex items-center justify-center h-screen w-full">
         <p>Redirecting to login...</p>
       </div>
    );
  }
  
  if (pathname === '/admin/login') {
     if (user) {
        return (
             <div className="flex items-center justify-center h-screen w-full">
                <p>Redirecting to dashboard...</p>
            </div>
        )
     }
     // Render the login page itself, which is the child here.
     return <>{children}</>;
  }

  // If we are logged in and not on the login page, render the protected content.
  return <>{children}</>;
};
