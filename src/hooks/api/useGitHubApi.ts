import axios, {
  AxiosError,
  type AxiosRequestConfig,
} from 'axios';
import { useCallback } from 'react';

const BASE_URL = 'https://api.github.com';

export const useGitHubApi = () => {
  const fetchApi = useCallback(
    async <T>(
      endpoint: string,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      try {
        const { data } = await axios({
          ...config,
          url: `${BASE_URL}${endpoint}`,
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...config?.headers,
          },
        });
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ||
              'Error accessing GitHub API'
          );
        }
        throw error;
      }
    },
    []
  );

  return {
    fetchApi,
  };
};
