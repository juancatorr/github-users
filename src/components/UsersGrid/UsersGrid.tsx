import { UserCard } from '@/components/UserCard';
import { useUsers } from '@/hooks/users/useUsers';
import styles from './UsersGrid.module.scss';

const {
  'users-grid': usersGrid,
  'users-grid__loading': usersGrid__loading,
  'users-grid__title': usersGrid__title,
  'users-grid__grid': usersGrid__grid,
} = styles;

export function UsersGrid() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className={usersGrid__loading}>
        Loading users...
      </div>
    );
  }

  return (
    <div className={usersGrid}>
      <h1 className={usersGrid__title}>GitHub Users</h1>
      <div className={usersGrid__grid}>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
