
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUserNewsletterSubscription: (subscribed: boolean) => void;
  updateUserSubscriptionTier: (tierId: string | null, tierName: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const localUser = localStorage.getItem('khulaKushUser');
    return localUser ? JSON.parse(localUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('khulaKushUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('khulaKushUser');
    }
  }, [user]);

  const login = useCallback((userData: User) => {
    // Ensure new logins don't carry over old subscription data unless explicitly passed
    const defaultSubscription = { subscriptionTierId: null, subscriptionTierName: null, subscribedToNewsletter: false };
    setUser({...defaultSubscription, ...userData});
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUserNewsletterSubscription = useCallback((subscribed: boolean) => {
    setUser(currentUser => currentUser ? { ...currentUser, subscribedToNewsletter: subscribed } : null);
  }, []);

  const updateUserSubscriptionTier = useCallback((tierId: string | null, tierName: string | null) => {
    setUser(currentUser => currentUser ? { ...currentUser, subscriptionTierId: tierId, subscriptionTierName: tierName } : null);
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserNewsletterSubscription, updateUserSubscriptionTier }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};