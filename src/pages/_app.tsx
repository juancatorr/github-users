import '@/styles/globals.scss';
import { HydrationBoundary } from '@tanstack/react-query';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        titleTemplate="%s - GitHub Users"
        defaultTitle="GitHub Users"
        description="Search and explore GitHub user profiles and repositories"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          siteName: 'GitHub Users',
        }}
        twitter={{
          handle: '@juancatorr',
          site: '@juancatorr',
          cardType: 'summary_large_image',
        }}
      />
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
