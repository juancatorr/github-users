import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const defaultConfig = {
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 15, // 15 minutes
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  retry: 3,
} as const;

export function useApi<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey,
    queryFn,
    ...defaultConfig,
    ...options,
  });
}
