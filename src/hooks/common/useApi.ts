import type {
  QueryFunction,
  QueryKey,
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

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
    UseSuspenseQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey
    >,
    'queryKey' | 'queryFn'
  >
): UseSuspenseQueryResult<TData, TError> {
  return useSuspenseQuery({
    queryKey,
    queryFn,
    ...defaultConfig,
    ...options,
  });
}

export function useInfiniteApi<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<
    TQueryFnData,
    TQueryKey,
    TPageParam
  >,
  options: Omit<
    UseSuspenseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
    'queryKey' | 'queryFn'
  > & {
    getNextPageParam: UseSuspenseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >['getNextPageParam'];
  }
): UseSuspenseInfiniteQueryResult<TData, TError> {
  return useSuspenseInfiniteQuery<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >({
    queryKey,
    queryFn,
    ...defaultConfig,
    ...options,
  });
}
