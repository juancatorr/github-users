import { env } from '@/config/env';

export const GITHUB_API_BASE_URL = env.github.apiUrl;

export const GITHUB_API_HEADERS = {
  Accept: `application/vnd.github.${env.github.apiVersion}+json`,
} as const;
