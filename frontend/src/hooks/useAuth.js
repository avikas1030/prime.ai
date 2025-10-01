import { useState, useEffect } from 'react';
import { isAuthenticated, getToken } from '../utils/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated(),
    token: getToken(),
    loading: false
  });

  useEffect(() => {
    const updateAuthState = () => {
      const newAuthState = {
        isAuthenticated: isAuthenticated(),
        token: getToken(),
        loading: false
      };
      
      console.log("🔄 Auth state updated:", newAuthState);
      setAuthState(newAuthState);
    };

    // Listen for auth state changes
    window.addEventListener('authStateChanged', updateAuthState);
    
    // Listen for storage changes (for cross-tab sync)
    window.addEventListener('storage', updateAuthState);

    return () => {
      window.removeEventListener('authStateChanged', updateAuthState);
      window.removeEventListener('storage', updateAuthState);
    };
  }, []);

  return authState;
};