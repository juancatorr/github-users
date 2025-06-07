import { githubService } from '@/services/github/githubService';
import { useQuery } from '@tanstack/react-query';

export const useUserDetails = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => githubService.getUserDetails(username),
    enabled: !!username, // Solo se ejecuta si hay un username
  });
};
