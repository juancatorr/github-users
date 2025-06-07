import { githubService } from '@/services/github/githubService';
import { useQuery } from '@tanstack/react-query';

export const useUserRepos = (username: string) => {
  return useQuery({
    queryKey: ['user-repos', username],
    queryFn: () => githubService.getUserRepos(username),
    enabled: !!username, // Solo se ejecuta si hay un username
  });
};
