import { UserCard } from '@/components/UserCard';
import { useSearchUsers } from '@/hooks/users/useSearchUsers';
import { useInfiniteUsers } from '@/hooks/users/useUsers';
import type { UsersPage } from '@/hooks/users/useUsers';
import type { GitHubUser } from '@/types/github';
import { useEffect, useRef, useState } from 'react';
import styles from './UsersGrid.module.scss';
import { UsersSearch } from './UsersSearch';

const {
  'users-grid__grid': usersGrid__grid,
  'users-grid__counter': usersGrid__counter,
  'users-grid__loading': usersGrid__loading,
  'users-grid__empty': usersGrid__empty,
} = styles;

export function UsersContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: searchData,
    hasNextPage: hasNextSearchPage,
    fetchNextPage: fetchNextSearchPage,
  } = useSearchUsers(searchQuery);

  const {
    data: allData,
    hasNextPage: hasNextAllPage,
    fetchNextPage: fetchNextAllPage,
  } = useInfiniteUsers();

  const trimmedQuery = searchQuery.trim();
  const isSearching = trimmedQuery.length > 0;
  const data = isSearching ? searchData : allData;
  const hasNextPage = isSearching
    ? hasNextSearchPage
    : hasNextAllPage;
  const fetchNextPage = isSearching
    ? fetchNextSearchPage
    : fetchNextAllPage;

  const pages = data?.pages ?? [];
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const totalUsers = pages.reduce(
    (total, page) => total + page.users.length,
    0
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const hasNoResults =
    pages.length === 0 || totalUsers === 0;
  const emptyMessage = isSearching
    ? `No users found for "${trimmedQuery}"`
    : 'No users available';

  return (
    <>
      <UsersSearch onSearch={setSearchQuery} />
      <div className={usersGrid__counter}>
        Users shown: {totalUsers}
      </div>
      {hasNoResults ? (
        <div className={usersGrid__empty}>
          {emptyMessage}
        </div>
      ) : (
        <div className={usersGrid__grid}>
          {pages.map((page) =>
            page.users.map((user: GitHubUser) => (
              <UserCard key={user.id} user={user} />
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className={usersGrid__loading}
        >
          Loading more users...
        </div>
      )}
    </>
  );
}
