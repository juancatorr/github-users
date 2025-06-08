import { UserCard } from '@/components/UserCard';
import { useUsers } from '@/hooks/users/useUsers';
import styles from './UsersGrid.module.scss';

const { 'users-grid__grid': usersGrid__grid } = styles;

export function UsersContent() {
  const { data: users } = useUsers();

  return (
    <div className={usersGrid__grid}>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
