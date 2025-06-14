import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

export class ApiClient {
  private client: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        Accept: 'application/json',
        ...config.headers,
      },
    });
  }

  async fetch<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.client.request({
        ...config,
        url: endpoint,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const customError = new Error(
          error.response?.data?.message ||
            'Error accessing API'
        ) as Error & { statusCode?: number };
        customError.statusCode =
          error.response?.status || 500;
        throw customError;
      }
      throw error;
    }
  }
}
