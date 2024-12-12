import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const getCategories = async () => {
  const response = await httpClient.authGet('/marketplace/categories');
  return response.data.result.categories;
};
