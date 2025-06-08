import { useState } from 'react';
import styles from './UsersGrid.module.scss';

const {
  'users-grid__search': usersGrid__search,
  'users-grid__input': usersGrid__input,
  'users-grid__button': usersGrid__button,
} = styles;

interface UsersSearchProps {
  onSearch: (query: string) => void;
}

export function UsersSearch({
  onSearch,
}: UsersSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      className={usersGrid__search}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className={usersGrid__input}
      />
      <button type="submit" className={usersGrid__button}>
        Search
      </button>
    </form>
  );
}
