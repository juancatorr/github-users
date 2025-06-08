import { Suspense } from 'react';
import { UsersContent } from './UsersContent';
import styles from './UsersGrid.module.scss';

const {
  'users-grid__loading': usersGrid__loading,
  'users-grid': usersGrid,
  'users-grid__title': usersGrid__title,
} = styles;

export function UsersGrid() {
  return (
    <div className={usersGrid}>
      <h1 className={usersGrid__title}>GitHub Users</h1>
      <Suspense
        fallback={
          <div className={usersGrid__loading}>
            Loading users......
          </div>
        }
      >
        <UsersContent />
      </Suspense>
    </div>
  );
}
