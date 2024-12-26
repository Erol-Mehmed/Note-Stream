import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
});

const request = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
    return await api.request<T>(config);
  } catch (error) {
    // Handle error as needed
    throw error;
  }
};

export default request;
