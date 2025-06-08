import { Suspense } from 'react';
import { UsersContent } from './UsersContent';
import styles from './UsersGrid.module.scss';
import { UsersGridSkeleton } from './UsersGridSkeleton';

const {
  'users-grid': usersGrid,
  'users-grid__title': usersGrid__title,
} = styles;

export function UsersGrid() {
  return (
    <div className={usersGrid}>
      <h1 className={usersGrid__title}>GitHub Users</h1>
      <Suspense fallback={<UsersGridSkeleton />}>
        <UsersContent />
      </Suspense>
    </div>
  );
}
