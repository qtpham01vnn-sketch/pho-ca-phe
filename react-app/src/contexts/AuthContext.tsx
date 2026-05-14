import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'CUSTOMER' | 'STAFF' | 'ADMIN' | null;

interface AuthContextType {
  role: Role;
  login: (role: Role, password?: string) => boolean;
  logout: () => void;
  isAuthenticated: (requiredRole: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static passwords for demo
const PASSWORDS = {
  STAFF: '1122',
  ADMIN: 'admin2026'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    return localStorage.getItem('pcf_auth_role') as Role || null;
  });

  const login = (targetRole: Role, password?: string): boolean => {
    if (targetRole === 'CUSTOMER') {
      setRole('CUSTOMER');
      localStorage.setItem('pcf_auth_role', 'CUSTOMER');
      return true;
    }

    if (targetRole === 'STAFF' && password === PASSWORDS.STAFF) {
      setRole('STAFF');
      localStorage.setItem('pcf_auth_role', 'STAFF');
      return true;
    }

    if (targetRole === 'ADMIN' && password === PASSWORDS.ADMIN) {
      setRole('ADMIN');
      localStorage.setItem('pcf_auth_role', 'ADMIN');
      return true;
    }

    return false;
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('pcf_auth_role');
  };

  const isAuthenticated = (requiredRole: Role): boolean => {
    if (!requiredRole) return true;
    if (requiredRole === 'CUSTOMER') return true;
    if (requiredRole === 'STAFF') return role === 'STAFF' || role === 'ADMIN';
    if (requiredRole === 'ADMIN') return role === 'ADMIN';
    return false;
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
