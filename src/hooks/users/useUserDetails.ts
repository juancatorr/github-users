import { githubService } from '@/services/github/githubService';
import { useApi } from '../common/useApi';

export const useUserDetails = (username: string) => {
  if (!username) {
    return {
      data: undefined,
      isLoading: false,
      error: null,
    };
  }

  return useApi(['user', username], () =>
    githubService.getUserDetails(username)
  );
};
