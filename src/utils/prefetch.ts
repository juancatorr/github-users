import { githubServerService } from '@/services/github/githubServerService';
import type { QueryClient } from '@tanstack/react-query';

export async function prefetchUserData(
  queryClient: QueryClient,
  username: string
) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['user', username],
      queryFn: () =>
        githubServerService.getUserDetails(username),
    }),

    queryClient.prefetchQuery({
      queryKey: ['user-repos', username],
      queryFn: () =>
        githubServerService.getUserRepos(username),
    }),
  ]);
}
