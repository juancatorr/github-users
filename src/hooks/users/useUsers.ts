import { githubService } from '@/services/github/githubService';
import { useApi } from '../common/useApi';

export const useUsers = (since = 0, perPage = 40) => {
  return useApi(
    ['users', since, perPage],
    () => githubService.getUsers(since, perPage),
    {
      refetchInterval: 1000 * 60 * 10, // Override: revalidar cada 10 minutos
    }
  );
};

export const useSearchUsers = (query: string) => {
  return useApi(
    ['search-users', query],
    () => githubService.searchUsers(query),
    {
      enabled: query.length > 0,
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );
};
