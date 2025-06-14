import clsx from 'clsx';
import styles from './UserCard.module.scss';

const {
  'user-card': userCard,
  'user-card__header': userCard__header,
  'user-card__avatar': userCard__avatar,
  'user-card__username': userCard__username,
  'user-card__info': userCard__info,
  skeleton,
  pulse,
} = styles;

export function UserCardSkeleton() {
  return (
    <div className={userCard}>
      <div className={userCard__header}>
        <div
          className={clsx(
            userCard__avatar,
            skeleton,
            pulse
          )}
          style={{ width: 50, height: 50 }}
        />
        <div
          className={clsx(
            userCard__username,
            skeleton,
            pulse
          )}
          style={{ width: '80%', height: 24 }}
        />
      </div>
      <div className={userCard__info}>
        <div
          className={clsx(skeleton, pulse)}
          style={{
            width: '60%',
            height: 20,
            marginBottom: 2,
          }}
        />
        <div
          className={clsx(skeleton, pulse)}
          style={{ width: '70%', height: 20 }}
        />
      </div>
    </div>
  );
}
