import { Layout } from '@/components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout>
      <div className="center">
        <h1>404 - User Not Found</h1>
        <p>
          The user you are looking for does not exist or was
          deleted.
        </p>
        <Link href="/">← Back to Home</Link>
      </div>
    </Layout>
  );
}
