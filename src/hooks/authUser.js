import { useQuery } from 'react-query';

import * as AuthUserApi from '../api/authUser';

// Получение данных пользователя
export const useAuthUserQuery = () => {
  return useQuery('auth-user', () => AuthUserApi.get(), {
    staleTime: Infinity,
  });
};
