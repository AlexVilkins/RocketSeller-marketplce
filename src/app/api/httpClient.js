import { useSession } from '@shared/utils/session';
import ROLES from '@shared/utils/session/userRoles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthApi from '../../widgets/auth/api';

export class HttpClient {
  static instance;
  static #globalAxiosSettings = {};

  #axiosInstance;

  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_HOST,
      withCredentials: false,
      ...HttpClient.#globalAxiosSettings,
    });
    this.setHeader('Accept', 'application/json');
    this.setHeader('Content-Type', 'application/json');
  }

  setAxiosResponseInterceptor(onFulfilled, onRejected) {
    this.#axiosInstance.interceptors.response.use(onFulfilled, onRejected);
    return this;
  }

  static setGlobalAxiosSettings(settings) {
    this.#globalAxiosSettings = settings;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClient();
    }
    return this.instance;
  }

  setHeader(key, value) {
    this.#axiosInstance.defaults.headers.common[key] = value;
    return this;
  }

  removeHeader(key) {
    delete this.#axiosInstance.defaults.headers.common[key];
    return this;
  }

  async post(url, payload) {
    const response = await this.#axiosInstance.post(url, payload);
    return response;
  }

  async authPost(url, payload) {
    this.setHeader('Authorization', `Bearer ${useSession().getToken()}`);
    const response = await this.#axiosInstance.post(url, payload);

    if (response.status === 3001) {
      this.refresh();
    }

    return response;
  }

  async get(url, payload) {
    const response = await this.#axiosInstance.get(url, payload);
    return response;
  }

  async authGet(url, payload) {
    this.setHeader('Authorization', `Bearer ${useSession().getToken()}`);
    const response = await this.#axiosInstance.get(url, payload);

    if (response.status === 3001) {
      this.refresh();
    }

    return response;
  }

  async put(url, payload) {
    const response = await this.#axiosInstance.put(url, payload);
    return response;
  }

  async authPut(url, payload) {
    this.setHeader('Authorization', `Bearer ${useSession().getToken()}`);
    const response = await this.#axiosInstance.put(url, payload);

    if (response.status === 3001) {
      this.refresh();
    }

    return response;
  }

  async patch(url, payload) {
    const response = await this.#axiosInstance.patch(url, payload);
    return response;
  }

  async delete(url, payload) {
    const response = await this.#axiosInstance.delete(url, payload);
    return response;
  }

  async refresh() {
    const { adminRefresh, userRefresh, logout } = useAuthApi();
    const navigate = useNavigate();

    const role = useSession().getUserRole();
    console.log('refresh');
    try {
      if (role === ROLES.ADMIN) {
        await adminRefresh();
      } else {
        await userRefresh();
      }
    } catch {
      logout();
      navigate('/auth');
    }
  }
}
