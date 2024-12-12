import Cookies from 'js-cookie';
import api from '../api';

export const getAlibabaProducts = async (wbProductId, limit, offset) => {
  const response = await api.get(
    `/storage/alibaba/session/products?WBProductId=${wbProductId}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  );
  return response.data.result;
};

export const createExcel = async (sessionId) => {
  const response = await api.post(
    `/serviceSession/${sessionId}/exportExcel`,
    null,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      responseType: 'blob',
    }
  );

  return response;
};

export const rejectAlibabaProduct = async (productId) => {
  const response = await api.post(
    `/storage/alibaba/product/${productId}/reject`,
    null,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  );
  return response.data;
};

export const approveAlibabaProduct = async (productId) => {
  const response = await api.post(
    `/storage/alibaba/product/${productId}/approve`,
    null,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  );
  return response.data;
};

export const setWeightProduct = async (sessionId, productId, weight) => {
  // console.log('startZapros', sessionId, productId, weight);
  const response = await api.post(
    `/serviceSession/${sessionId}/setDefaultWeight`,
    {
      wbId: productId,
      defaultWeight: weight,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  );

  return response.data;
};
