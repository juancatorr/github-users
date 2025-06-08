import { FavoritesList } from '@/components/FavoritesList';
import { Layout } from '@/components/Layout';
import { useFavoriteStore } from '@/store/favorites';

export default function FavoritesPage() {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  return (
    <Layout>
      <FavoritesList favorites={favorites} />
    </Layout>
  );
}
