import { githubService } from '@/services/github/githubService';
import type { GitHubUser } from '@/types/github';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteApi } from '../common/useApi';

export type SearchUsersPage = {
  users: GitHubUser[];
  total: number;
  nextPage: number | undefined;
};

export type SearchUsersInfiniteData =
  InfiniteData<SearchUsersPage>;

export const useSearchUsers = (query: string) => {
  const trimmedQuery = query.trim();
  return useInfiniteApi<
    SearchUsersPage,
    Error,
    SearchUsersInfiniteData
  >(
    ['search-users', trimmedQuery],
    async ({ pageParam = 1 }) => {
      if (!trimmedQuery) {
        return {
          users: [],
          total: 0,
          nextPage: undefined,
        };
      }

      const response = await githubService.searchUsers(
        trimmedQuery,
        pageParam,
        40
      );

      const nextPage =
        pageParam * 40 < response.total_count
          ? pageParam + 1
          : undefined;

      return {
        users: response.items,
        total: response.total_count,
        nextPage,
      };
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};
