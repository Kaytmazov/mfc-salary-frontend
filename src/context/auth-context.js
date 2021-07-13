import React from 'react'
import jwtDecode from 'jwt-decode';
import { loginUser, getAccessToken, resetAuthData } from '../services/authService';

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const AuthProvider = (props) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const login = React.useCallback(
    async (values) => {
      const token = await loginUser(values);
      setUser(jwtDecode(token));
      return token;
    },
    [setUser],
  );

  const logout = React.useCallback(() => {
    resetAuthData()
    setUser(null)
  }, [setUser])

  const value = React.useMemo(
    () => ({ user, login, logout }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={value} {...props} />
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
