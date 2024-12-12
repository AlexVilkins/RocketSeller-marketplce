import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const getBasketItems = async (limit, offset) => {
  const response = await httpClient.authGet(
    `/cart/?limit=${limit}&offset=${offset}`
  );

  return response.data.result;
};

export const addBasketItem = async (id) => {
  const response = await httpClient.authPost('/cart/', {
    productId: id,
  });

  return response.data.result;
};

export const deleteBasketItem = async (items) => {
  console.log('api', items);
  const ids = items.map((item) => item.id);
  const response = await httpClient.authPost(`/cart/deleteProducts`, {
    productIds: ids,
  });

  return response.data.result;
};

export const puyBasketItems = async (ids) => {
  const response = await httpClient.authPost('/marketplace/buyProduct', {
    offerIds: ids,
  });
  return response.data.result;
};
