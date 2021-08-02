import { graphQLClient, gql } from '../services/apiService';

const AUTH_USER_QUERY = gql`
  {
    authUser {
      id
      login
      fio
      office {
        id
        name
      }
      jobPosition
      role
    }
  }
`;

// Получение данных пользователя
export const get = async () => {
  const { authUser } = await graphQLClient.request(AUTH_USER_QUERY);
  return authUser;
};
