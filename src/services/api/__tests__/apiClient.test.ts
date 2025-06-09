import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import {
  ApiClient,
  type ApiClientConfig,
} from '../apiClient';

type CustomError = Error & { statusCode?: number };
type ErrorResponse = { message?: string };
type MockAxiosResponse<T = unknown> = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: InternalAxiosRequestConfig;
  data: T;
};

jest.mock('axios');

describe('ApiClient', () => {
  let apiClient: ApiClient;
  const config: ApiClientConfig = {
    baseURL: 'https://api.example.com',
    headers: {
      'Custom-Header': 'test',
    },
  };

  const mockAxiosInstance = {
    request: jest.fn(),
    defaults: {},
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
        clear: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
        clear: jest.fn(),
      },
    },
    getUri: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    head: jest.fn(),
    options: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    postForm: jest.fn(),
    putForm: jest.fn(),
    patchForm: jest.fn(),
  } as unknown as jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    jest.resetAllMocks();
    (axios.create as jest.Mock).mockReturnValue(
      mockAxiosInstance
    );
    apiClient = new ApiClient(config);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an axios instance with the correct config', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: config.baseURL,
        headers: {
          Accept: 'application/json',
          'Custom-Header': 'test',
        },
      });
    });
  });

  describe('fetch', () => {
    it('should return data on successful request', async () => {
      const mockData = { id: 1, name: 'Test' };
      mockAxiosInstance.request.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await apiClient.fetch('/test');

      expect(result).toEqual(mockData);
      expect(
        mockAxiosInstance.request
      ).toHaveBeenCalledWith({
        url: '/test',
      });
    });

    it('should throw error with status code on API error', async () => {
      const errorMessage = 'Not Found';
      const mockError = new AxiosError();
      mockError.response = {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {
          headers: {},
        } as InternalAxiosRequestConfig,
        data: { message: errorMessage },
      } as MockAxiosResponse<ErrorResponse>;
      mockAxiosInstance.request.mockRejectedValueOnce(
        mockError
      );

      try {
        await apiClient.fetch('/test');
        fail('Expected error to be thrown');
      } catch (error) {
        const customError = error as CustomError;
        expect(customError).toBeInstanceOf(Error);
        expect(customError.message).toBe(errorMessage);
        expect(customError.statusCode).toBe(404);
      }
    });

    it('should throw generic error message when no error message from API', async () => {
      const mockError = new AxiosError();
      mockError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {
          headers: {},
        } as InternalAxiosRequestConfig,
        data: {},
      } as MockAxiosResponse<ErrorResponse>;
      mockAxiosInstance.request.mockRejectedValueOnce(
        mockError
      );

      try {
        await apiClient.fetch('/test');
        fail('Expected error to be thrown');
      } catch (error) {
        const customError = error as CustomError;
        expect(customError).toBeInstanceOf(Error);
        expect(customError.message).toBe(
          'Error accessing API'
        );
        expect(customError.statusCode).toBe(500);
      }
    });

    it('should throw original error for non-Axios errors', async () => {
      const originalError = new Error('Network error');
      mockAxiosInstance.request.mockRejectedValueOnce(
        originalError
      );

      await expect(
        apiClient.fetch('/test')
      ).rejects.toThrow(originalError);
    });
  });
});
