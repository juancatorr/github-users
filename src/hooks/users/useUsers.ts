import { githubService } from '@/services/github/githubService';
import { useQuery } from '@tanstack/react-query';

export const useUsers = (since = 0, perPage = 40) => {
  return useQuery({
    queryKey: ['users', since, perPage],
    queryFn: () => githubService.getUsers(since, perPage),
  });
};

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['search-users', query],
    queryFn: () => githubService.searchUsers(query),
    enabled: query.length > 0, // Solo se ejecuta si hay un término de búsqueda
  });
};
