// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthenticatedUser } from '../types/types';

const AuthContext = createContext<{
  currentUser: AuthenticatedUser | null;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
}>({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

  const login = (user: AuthenticatedUser) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
