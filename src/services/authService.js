import { request, gql } from 'graphql-request';

const API_URL = process.env.REACT_APP_API_URL;
const LOGIN_MUTATION = gql`
  mutation login($login: String!, $password: String!) {
    login(input: { login: $login, password: $password }) {
      token
      user {
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
  }
`;

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const setAuthData = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

const resetAuthData = () => {
  localStorage.removeItem('accessToken');
};

const loginUser = async (values) => {
  const {
    login: { token, user },
  } = await request(API_URL, LOGIN_MUTATION, values);
  setAuthData(token);
  return user;
};

export { loginUser, getAccessToken, resetAuthData };
