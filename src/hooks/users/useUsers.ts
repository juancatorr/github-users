import { useQuery } from '@tanstack/react-query';
import type {
  GitHubSearchResponse,
  GitHubUser,
} from '../../types/github';
import { useGitHubApi } from '../api/useGitHubApi';

export const useUsers = (since = 0, perPage = 40) => {
  const { fetchApi } = useGitHubApi();

  return useQuery({
    queryKey: ['users', since, perPage],
    queryFn: () =>
      fetchApi<GitHubUser[]>(
        `/users?since=${since}&per_page=${perPage}`
      ),
  });
};

export const useSearchUsers = (query: string) => {
  const { fetchApi } = useGitHubApi();

  return useQuery({
    queryKey: ['search-users', query],
    queryFn: () =>
      fetchApi<GitHubSearchResponse>(
        `/search/users?q=${encodeURIComponent(query)}`
      ),
    enabled: query.length > 0, // Solo se ejecuta si hay un término de búsqueda
  });
};
