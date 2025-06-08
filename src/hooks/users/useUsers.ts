import { githubService } from '@/services/github/githubService';
import type { GitHubUser } from '@/types/github';
import { useQuery } from '@tanstack/react-query';
import type {
  InfiniteData,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteApi } from '../common/useApi';

export type UsersInfiniteData = InfiniteData<UsersPage>;

export type UsersPage = {
  users: GitHubUser[];
  nextPageParam: number | undefined;
};

export const useInfiniteUsers = (
  perPage = 40
): UseSuspenseInfiniteQueryResult<
  UsersInfiniteData,
  Error
> => {
  return useInfiniteApi<
    UsersPage,
    Error,
    UsersInfiniteData
  >(
    ['infinite-users'],
    async ({ pageParam = 0 }) => {
      const users = await githubService.getUsers(
        pageParam,
        perPage
      );
      const nextPageParam =
        users[users.length - 1]?.id ?? undefined;
      return { users, nextPageParam };
    },
    {
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.nextPageParam,
      refetchInterval: 1000 * 60 * 10, // 10 minutes
    }
  );
};

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['search-users', query],
    queryFn: () => githubService.searchUsers(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
