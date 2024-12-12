import { jwtDecode } from 'jwt-decode';

export default function decodeUserData(data) {
  const userJwt = jwtDecode(data);
  return userJwt.user_status;
}
