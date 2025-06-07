const getEnvVar = (key: string): string => {
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
