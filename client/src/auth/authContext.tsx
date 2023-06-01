// AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthenticatedUser } from '../types';

const AuthContext = createContext<{
  currentUser: AuthenticatedUser | null;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
}>({
  currentUser: null,
  login: () => { },
  logout: () => { },
});

export function useAuth() {
  return useContext(AuthContext);
}

const removeUserLocalStorage = () => {
  window.localStorage.removeItem('authUser')
}

const setUserLocalStorage = (user: AuthenticatedUser) => {
  window.localStorage.setItem('authUser', JSON.stringify(user))
}

const getUserLocalStorage: () => AuthenticatedUser | null = () => {
  const str_data = window.localStorage.getItem('authUser')

  if (str_data == null)
    return null

  const user: AuthenticatedUser = JSON.parse(str_data);
  return user
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const addExpirationTime = (user: AuthenticatedUser) => {
    const added_time = 10 * 1000000
    user.expires = Date.now() + added_time
    return user
  }

  const login = (user: AuthenticatedUser) => {
    var user = addExpirationTime(user);
    setUserLocalStorage(user)
    setCurrentUser(user);
  };

  const logout = () => {
    removeUserLocalStorage()
    setCurrentUser(null);
  };

  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(() => {
    let user = getUserLocalStorage()
    if (!user)
      return null

    if (!user.expires) {
      removeUserLocalStorage()
      return null
    }

    if (Date.now() > user.expires) {
      removeUserLocalStorage()
      return null
    }

    user = addExpirationTime(user);
    setUserLocalStorage(user)
    return user
  });

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
