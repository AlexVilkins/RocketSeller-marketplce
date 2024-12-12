import { useSession } from '@shared/utils/session';
import ROLES from '@shared/utils/session/userRoles';
import { HttpClient } from '../../../app/api/httpClient';

const AUTH_HEADER = 'Authorization';
const BEARER_TOKEN = (token) => `Bearer ${token}`;

const useAuthApi = () => {
  const {
    setToken,
    setRefreshToken,
    getRefreshToken,
    removeToken,
    removeRefreshToken,
    setUserRole,
    removeUserRole,
  } = useSession();

  const httpClient = new HttpClient();

  // const register = async () => {};

  const loginWrapper = async (url, creds) => {
    const response = await httpClient.post(url, {
      login: creds.name,
      password: creds.password,
    });
    setToken(response.data.result.access);
    setRefreshToken(response.data.result.refresh);

    httpClient.setHeader(
      AUTH_HEADER,
      BEARER_TOKEN(response.data.result.access)
    );

    return response.data;
  };

  const adminLogin = async (creds) => {
    const response = await loginWrapper('/auth/admin/verify', creds);
    setUserRole(ROLES.ADMIN);

    return response.data;
  };

  const userLogin = async (creds) => {
    const response = await loginWrapper('/auth/user/verify', creds);
    setUserRole(ROLES.USER);

    return response.data;
  };

  const refresh = async () => {
    try {
      const response = await api.post('/token/refresh', {
        refresh: getRefreshToken(),
      });

      setToken(response.access);
      setRefreshToken(response.refresh);
      httpClient.setHeader(AUTH_HEADER, BEARER_TOKEN(response.access));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Ошибка обновления токена');
    }
  };

  const userRefresh = async () => {
    httpClient.setHeader(AUTH_HEADER, BEARER_TOKEN(getRefreshToken()));
    const response = await httpClient.post('token/user/refresh', null);
    setToken(response.data.result.access);
    setRefreshToken(response.data.result.refresh);
    httpClient.setHeader(
      AUTH_HEADER,
      BEARER_TOKEN(response.data.result.access)
    );
    return;
  };

  const adminRefresh = async () => {
    httpClient.setHeader(AUTH_HEADER, BEARER_TOKEN(getRefreshToken()));
    const response = await httpClient.post('token/admin/refresh', null);
    setToken(response.data.result.access);
    setRefreshToken(response.data.result.refresh);
    httpClient.setHeader(
      AUTH_HEADER,
      BEARER_TOKEN(response.data.result.access)
    );
    return;
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
    removeUserRole();
    httpClient.removeHeader(AUTH_HEADER);
  };

  return {
    adminLogin,
    userLogin,
    userRefresh,
    logout,
  };
};

export default useAuthApi;
