import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { debugAuth } from '../utils/authDebug';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  console.log("🛡️ ProtectedRoute check:", { isAuthenticated, loading });
  debugAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    console.log("❌ Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  console.log("✅ Authenticated, rendering protected content");
  return children;
};

export default ProtectedRoute;