import { Layout } from '@/components/Layout';
import { UsersGrid } from '@/components/UsersGrid';
import dynamic from 'next/dynamic';

function UsersPage() {
  return (
    <Layout>
      <UsersGrid />
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(UsersPage), {
  ssr: false,
});
