import { UserCard } from '@/components/UserCard';
import { useUsers } from '@/hooks/users/useUsers';
import styles from './UsersGrid.module.scss';

export function UsersGrid() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className={styles['users-grid__loading']}>
        Loading users...
      </div>
    );
  }

  return (
    <div className={styles['users-grid']}>
      <h1 className={styles['users-grid__title']}>
        GitHub Users
      </h1>
      <div className={styles['users-grid__grid']}>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
