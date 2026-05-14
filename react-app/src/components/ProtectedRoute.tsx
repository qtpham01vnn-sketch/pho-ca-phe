import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole: 'STAFF' | 'ADMIN';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated(requiredRole)) {
    // Redirect to the welcome portal if not authorized
    return <Navigate to="/" replace />;
  }

  return children;
}
