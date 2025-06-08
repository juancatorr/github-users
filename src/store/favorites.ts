import type { GitHubUser } from '@/types/github';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FAVORITE_USERS_KEY = 'github-users:favorites';

interface FavoriteStore {
  favorites: GitHubUser[];
  addFavorite: (user: GitHubUser) => void;
  removeFavorite: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (user) =>
        set((state) => ({
          favorites: [...state.favorites, user],
        })),
      removeFavorite: (userId) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (f) => f.id !== userId
          ),
        })),
      isFavorite: (userId) =>
        get().favorites.some((f) => f.id === userId),
    }),
    {
      name: FAVORITE_USERS_KEY,
    }
  )
);
