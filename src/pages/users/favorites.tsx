import { FavoritesList } from '@/components/FavoritesList';
import { Layout } from '@/components/Layout';
import { Seo } from '@/components/Seo';
import { useFavoriteStore } from '@/store/favorites';

export default function FavoritesPage() {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  return (
    <Layout>
      <Seo
        title="Favorite GitHub Users"
        description={`Your collection of ${favorites.length} favorite GitHub users. Quick access to profiles you follow and admire.`}
      />
      <FavoritesList favorites={favorites} />
    </Layout>
  );
}
