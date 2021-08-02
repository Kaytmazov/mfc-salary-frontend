import React from 'react';
import { loginUser, getAccessToken, resetAuthData } from '../services/authService';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setIsAuth(true);
    }
  }, []);

  const login = React.useCallback(async (values) => {
    await loginUser(values);
    setIsAuth(true);
    return true;
  }, []);

  const logout = React.useCallback(() => {
    resetAuthData();
    setIsAuth(false);
  }, []);

  const value = React.useMemo(() => ({ isAuth, login, logout }), [login, logout, isAuth]);

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
