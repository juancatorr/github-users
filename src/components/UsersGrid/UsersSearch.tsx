import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import styles from './UsersGrid.module.scss';

const {
  'users-grid__search': usersGrid__search,
  'users-grid__input': usersGrid__input,
} = styles;

interface UsersSearchProps {
  onSearch: (query: string) => void;
}

export function UsersSearch({
  onSearch,
}: UsersSearchProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className={usersGrid__search}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className={usersGrid__input}
      />
    </div>
  );
}
