import { Layout } from '@/components/Layout';
import type { NextPageContext } from 'next';
import Link from 'next/link';

interface Props {
  statusCode?: number;
}

function ErrorPage({ statusCode }: Props) {
  return (
    <Layout>
      <div className="center">
        <h1>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p>
          Something went wrong while trying to fetch the
          data.
        </p>
        <Link href="/">← Back to Home</Link>
      </div>
    </Layout>
  );
}

ErrorPage.getInitialProps = ({
  res,
  err,
}: NextPageContext) => {
  const statusCode = res
    ? res.statusCode
    : err
      ? err.statusCode
      : 404;
  return { statusCode };
};

export default ErrorPage;
