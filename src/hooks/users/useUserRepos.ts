import { githubService } from '@/services/github/githubService';
import { useApi } from '../common/useApi';

export const useUserRepos = (username: string) => {
  if (!username) {
    return {
      data: undefined,
      isLoading: false,
      error: null,
    };
  }

  return useApi(
    ['user-repos', username],
    () => githubService.getUserRepos(username),
    {
      staleTime: 1000 * 60 * 30, //30 minutes
    }
  );
};
