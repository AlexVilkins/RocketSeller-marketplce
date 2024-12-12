import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const getProductsUserTable = async (limit, offset, filter) => {
  const response = await httpClient.authGet(
    `/marketplace/products?${filter}&limit=${limit}&offset=${offset}`
  );
  return response.data.result;
};

export const getCategories = async () => {
  const response = await httpClient.authGet('/marketplace/categories');
  return response.data.result.categories;
};

export const getBuyWindowProducts = async (limit, offset) => {
  const response = await httpClient.authGet(
    `/marketplace/purchasedProducts?limit=${limit}&offset=${offset}`
  );
  return response.data.result;
};

export const getFiltersRange = async () => {
  const response = await httpClient.authGet('/marketplace/filtersRange');
  return response.data.result;
};

export const getPDF = async (id) => {
  const response = await httpClient.authPost(`/accounts/generatePdf`, {
    offerId: id,
  });
  return response.data.result.downloadUrl;
};
