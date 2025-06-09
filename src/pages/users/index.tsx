import { Layout } from '@/components/Layout';
import { Seo } from '@/components/Seo';
import { UsersGrid } from '@/components/UsersGrid';
import dynamic from 'next/dynamic';

function UsersPage() {
  return (
    <Layout>
      <Seo
        title="GitHub Users"
        description="Explore GitHub users and their repositories. Find developers, view their profiles, and check out their work."
      />
      <UsersGrid />
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(UsersPage), {
  ssr: false,
});
