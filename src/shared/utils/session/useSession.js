import Cookies from 'js-cookie';
import FIELDS from './config';
import decodeUserData from './decodeUserData';

const useSession = () => {
  const { ACCESS, REFRESH, STATUS } = FIELDS;

  const getToken = () => Cookies.get(ACCESS);

  const setToken = (token) => Cookies.set(ACCESS, token);

  const getRefreshToken = () => Cookies.get(REFRESH);

  const setRefreshToken = (refreshToken) => Cookies.set(REFRESH, refreshToken);

  const removeToken = () => Cookies.remove(ACCESS);

  const removeRefreshToken = () => Cookies.remove(REFRESH);

  const getUserRole = () => {
    // console.log(unhashStatus(localStorage.getItem(STATUS).toString()));
    // return unhashStatus(localStorage.getItem(STATUS));
    return localStorage.getItem(STATUS);
  };

  const setUserRole = (status) => {
    // localStorage.setItem(STATUS, hashStatus(status));
    localStorage.setItem(STATUS, status);
  };

  //временно тут для неактивных полтзователей
  const getUserStatus = () => {
    return decodeUserData(getToken());
  };

  const removeUserRole = () => localStorage.removeItem(STATUS);

  return {
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
    removeToken,
    removeRefreshToken,
    getUserRole,
    setUserRole,
    removeUserRole,
    getUserStatus,
  };
};

export default useSession;
