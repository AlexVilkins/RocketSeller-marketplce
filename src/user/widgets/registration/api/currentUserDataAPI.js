import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const getUserData = async () => {
  const response = await httpClient.authGet('/accounts/me');
  return response.data;
};
