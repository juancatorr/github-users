import { githubService } from '@/services/github/githubService';
import { useApi } from '../common/useApi';

export const useUserRepos = (username: string) => {
  return useApi(
    ['user-repos', username],
    () => githubService.getUserRepos(username),
    {
      enabled: !!username,
      staleTime: 1000 * 60 * 30, //30 minutes
    }
  );
};
