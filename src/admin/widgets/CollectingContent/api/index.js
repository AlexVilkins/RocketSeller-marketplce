import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const sendUpdatedProductPrice = async (productId, updatedPrice) => {
  const response = await httpClient.authPut(
    `/storage/alibaba/product/${productId}/price?price=${updatedPrice}`
  );
  return response.data;
};
