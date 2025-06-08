import type { GitHubUser } from '@/types/github';
import Image from 'next/image';
import Link from 'next/link';
import styles from './UserCard.module.scss';

const {
  'user-card': userCard,
  'user-card__header': userCard__header,
  'user-card__avatar': userCard__avatar,
  'user-card__username': userCard__username,
  'user-card__info': userCard__info,
} = styles;

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={`/users/${user.login}`}
      className={userCard}
    >
      <div className={userCard__header}>
        <Image
          src={user.avatar_url}
          alt={user.login}
          className={userCard__avatar}
          width={100}
          height={100}
          priority
        />
        <span className={userCard__username}>
          {user.login}
        </span>
      </div>
      <div className={userCard__info}>
        <p>ID: {user.id}</p>
        <p>Type: {user.type}</p>
      </div>
    </Link>
  );
}
