import { useQuery } from '@tanstack/react-query';
import type { GitHubRepo } from '../../types/github';
import { useGitHubApi } from '../api/useGitHubApi';

export const useUserRepos = (username: string) => {
  const { fetchApi } = useGitHubApi();

  return useQuery({
    queryKey: ['user-repos', username],
    queryFn: () =>
      fetchApi<GitHubRepo[]>(`/users/${username}/repos`),
    enabled: !!username, // Solo se ejecuta si hay un username
  });
};
