import { Layout } from '@/components/Layout';
import { UserCard } from '@/components/UserCard';
import styles from '@/components/UsersGrid/UsersGrid.module.scss';
import { useFavoriteStore } from '@/store/favorites';

const {
  'users-grid__grid': usersGrid__grid,
  'users-grid__counter': usersGrid__counter,
  'users-grid__empty': usersGrid__empty,
} = styles;

export default function FavoritesPage() {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  return (
    <Layout>
      <div className={usersGrid__counter}>
        Favorite users: {favorites.length}
      </div>
      {favorites.length === 0 ? (
        <div className={usersGrid__empty}>
          No favorite users yet
        </div>
      ) : (
        <div className={usersGrid__grid}>
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </Layout>
  );
}
