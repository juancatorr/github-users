const clientEnv = {
  NEXT_PUBLIC_GITHUB_API_URL: 'https://api.github.com',
  NEXT_PUBLIC_GITHUB_API_VERSION: 'v3',
};

const getEnvVar = (key: string): string => {
  if (typeof window !== 'undefined') {
    return clientEnv[key as keyof typeof clientEnv];
  }

  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const env = {
  github: {
    apiUrl: getEnvVar('NEXT_PUBLIC_GITHUB_API_URL'),
    apiVersion: getEnvVar('NEXT_PUBLIC_GITHUB_API_VERSION'),
  },
} as const;
