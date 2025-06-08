import { UserCardSkeleton } from '../UserCard/UserCardSkeleton';
import styles from './UsersGrid.module.scss';

const {
  'users-grid__grid--skeleton': usersGrid__grid_skeleton,
} = styles;

export function UsersGridSkeleton() {
  const amountOfCards = Array.from(
    { length: 20 },
    (_, i) => i + 1
  );
  return (
    <div className={usersGrid__grid_skeleton}>
      {amountOfCards.map((id) => (
        <UserCardSkeleton key={id} />
      ))}
    </div>
  );
}
