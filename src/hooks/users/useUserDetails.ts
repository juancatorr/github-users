import { githubService } from '@/services/github/githubService';
import { useApi } from '../common/useApi';

export const useUserDetails = (username: string) => {
  return useApi(
    ['user', username],
    () => githubService.getUserDetails(username),
    {
      enabled: !!username,
    }
  );
};
