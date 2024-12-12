import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

//временно тут до создания глобального объекта user
export const getBalance = async () => {
  const response = await httpClient.authGet(`/accounts/balance`);

  return response.data.result.amount;
};
