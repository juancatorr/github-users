import { useQuery } from '@tanstack/react-query';
import type { GitHubUserDetails } from '../../types/github';
import { useGitHubApi } from '../api/useGitHubApi';

export const useUserDetails = (username: string) => {
  const { fetchApi } = useGitHubApi();

  return useQuery({
    queryKey: ['user', username],
    queryFn: () =>
      fetchApi<GitHubUserDetails>(`/users/${username}`),
    enabled: !!username, // Solo se ejecuta si hay un username
  });
};
