import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setAuthData = ({ accessToken, refreshToken }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const resetAuthData = () => {
  console.log('asfd')
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const isAccessTokenExpired = () => {
  const token = getAccessToken();

  if (!token) {
    return true;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  return decodedToken.exp <= currentTime + 10;
};

// временно
const sleep = () => {
  const response = {
    data: {
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjQwMTY2NDIsImV4cCI6MTY1NTU1MjY0MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZpbyI6ItCa0LDQudGC0LzQsNC30L7QsiDQqNCw0LzQuNC70Ywg0JzQsNCz0L7QvNC10LTQvtCy0LjRhyIsIkVtYWlsIjoiYWx0YWlyQGxpc3QucnUiLCJSb2xlIjoiYWRtaW4iLCJqb2JQb3NpdGlvbiI6ItCf0YDQvtCz0YDQsNC80LzQuNGB0YIifQ.WsKV76N4zEkUEU0mbyD7iEOJFpANcCNRipis70AQCqw',
      refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjQwMTY2NDIsImV4cCI6MTY1NTU1MjY0MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZpbyI6ItCa0LDQudGC0LzQsNC30L7QsiDQqNCw0LzQuNC70Ywg0JzQsNCz0L7QvNC10LTQvtCy0LjRhyIsIkVtYWlsIjoiYWx0YWlyQGxpc3QucnUiLCJSb2xlIjoiYWRtaW4iLCJqb2JQb3NpdGlvbiI6ItCf0YDQvtCz0YDQsNC80LzQuNGB0YIifQ.WsKV76N4zEkUEU0mbyD7iEOJFpANcCNRipis70AQCqw'
    }
  }
  return new Promise((res) => {
    setTimeout(() => res(response), 300)
  })
}
const loginUser = async (values) => {
  return sleep(values)
    .then(({ data }) => {
      setAuthData(data);
      return data.accessToken;
    });
};

const refreshTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    return;
  }

  const formData = new FormData();

  formData.append('accessToken', accessToken);
  formData.append('refreshToken', refreshToken);

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}account/refreshtoken`, formData, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      })
      .then((response) => {
        setAuthData(response.data);
        return resolve(response);
      })
      .catch((error) => {
        resetAuthData();
        return reject(error);
      });
  });
};

export {
  loginUser,
  refreshTokens,
  getAccessToken,
  getRefreshToken,
  setAuthData,
  resetAuthData,
  isAccessTokenExpired
}
