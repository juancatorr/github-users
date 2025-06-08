import { UserCard } from '@/components/UserCard';
import type { GitHubUser } from '@/types/github';
import { useMemo, useState } from 'react';
import styles from './FavoritesList.module.scss';

const {
  'favorites-list': favoritesList,
  'favorites-list__header': favoritesList__header,
  'favorites-list__counter': favoritesList__counter,
  'favorites-list__select': favoritesList__select,
  'favorites-list__grid': favoritesList__grid,
  'favorites-list__empty': favoritesList__empty,
} = styles;

type SortOrder = 'asc' | 'desc';

interface FavoritesListProps {
  favorites: GitHubUser[];
}

export function FavoritesList({
  favorites,
}: FavoritesListProps) {
  const [sortOrder, setSortOrder] =
    useState<SortOrder>('asc');

  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => {
      const nameA = a.login.toLowerCase();
      const nameB = b.login.toLowerCase();
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [favorites, sortOrder]);

  return (
    <div className={favoritesList}>
      <div className={favoritesList__header}>
        <div className={favoritesList__counter}>
          Favorite users: {favorites.length}
        </div>
        {favorites.length > 0 && (
          <select
            className={favoritesList__select}
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as SortOrder)
            }
          >
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
          </select>
        )}
      </div>
      {favorites.length === 0 ? (
        <div className={favoritesList__empty}>
          No favorite users yet
        </div>
      ) : (
        <div className={favoritesList__grid}>
          {sortedFavorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
