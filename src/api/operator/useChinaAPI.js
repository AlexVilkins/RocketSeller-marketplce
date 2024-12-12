import Cookies from 'js-cookie';
import api from '../api';

const token = Cookies.get('token');

export const getProductsByImage = async (productId) => {
  const response = await api.get(`alibaba/products?WBProductId=${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.result.products;
};

export const getInfoProductById = async (productId) => {
  const response = await api.get(`alibaba/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.result;
};

export const hideProductById = async (productId) => {
  const response = await api.post(`/alibaba/product/${productId}/reject`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.result;
};

export const approveProductById = async (productId) => {
  const response = await api.post(`/alibaba/product/${productId}/approve`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.result;
};
