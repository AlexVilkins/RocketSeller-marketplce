import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const getHistorySessions = async (limit, offset) => {
  const response = await httpClient.authGet(
    `/serviceSession?limit=${limit}&offset=${offset}`
  );
  return response.data.result;
};
