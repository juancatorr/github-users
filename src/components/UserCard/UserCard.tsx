import type { GitHubUser } from '@/types/github';
import Link from 'next/link';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles['user-card']}>
      <div className={styles['user-card__header']}>
        <img
          src={user.avatar_url}
          alt={user.login}
          className={styles['user-card__avatar']}
        />
        <Link
          href={`/users/${user.login}`}
          className={styles['user-card__username']}
        >
          {user.login}
        </Link>
      </div>
      <div className={styles['user-card__info']}>
        <p>ID: {user.id}</p>
        <p>Type: {user.type}</p>
      </div>
    </div>
  );
}
