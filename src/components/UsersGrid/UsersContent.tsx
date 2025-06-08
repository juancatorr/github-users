import { UserCard } from '@/components/UserCard';
import { useInfiniteUsers } from '@/hooks/users/useUsers';
import type { UsersPage } from '@/hooks/users/useUsers';
import type { GitHubUser } from '@/types/github';
import { useEffect, useRef } from 'react';
import styles from './UsersGrid.module.scss';

const {
  'users-grid__grid': usersGrid__grid,
  'users-grid__loading': usersGrid__loading,
  'users-grid__counter': usersGrid__counter,
} = styles;

export function UsersContent() {
  const { data, hasNextPage, fetchNextPage } =
    useInfiniteUsers();
  const pages = data?.pages ?? [];
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  const totalUsers = pages.reduce(
    (total, page) => total + page.users.length,
    0
  );

  return (
    <>
      <div className={usersGrid__counter}>
        Users shown: {totalUsers}
      </div>
      <div className={usersGrid__grid}>
        {pages.map((page: UsersPage) =>
          page.users.map((user: GitHubUser) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>
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
