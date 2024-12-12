import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const registration = async ({ login, password, repeatPassword }) => {
  const response = await httpClient.post('/accounts/register', {
    login: login,
    password: password,
    repeatPassword: repeatPassword,
  });
  return response.data.result;
};
