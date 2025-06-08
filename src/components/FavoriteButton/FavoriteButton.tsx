import { useFavoriteStore } from '@/store/favorites';
import type { GitHubUser } from '@/types/github';
import { FaStar } from 'react-icons/fa';
import styles from './FavoriteButton.module.scss';

const { 'favorite-button': favoriteButton } = styles;

interface FavoriteButtonProps {
  user: GitHubUser;
  className?: string;
}

export function FavoriteButton({
  user,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } =
    useFavoriteStore();
  const favorite = isFavorite(user.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    favorite ? removeFavorite(user.id) : addFavorite(user);
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`${favoriteButton} ${className ?? ''}`}
      data-favorite={favorite}
      title={
        favorite
          ? 'Remove from favorites'
          : 'Add to favorites'
      }
    >
      <FaStar
        size={20}
        color={favorite ? '#FFD700' : '#ccc'}
      />
    </button>
  );
}
